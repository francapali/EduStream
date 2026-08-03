import sqlite3
import json
import sys
import math
import random
from database import DB_PATH, get_connection, init_db

init_db()

class DecisionNode:
    def __init__(self, feature_idx=None, threshold=None, left=None, right=None, value=None):
        self.feature_idx = feature_idx
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value

    def is_leaf_node(self):
        return self.value is not None

class SingleDecisionTree:
    def __init__(self, max_depth=5, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None

    def fit(self, X, y):
        self.root = self._build_tree(X, y, depth=0)

    def _build_tree(self, X, y, depth):
        num_samples = len(X)
        if num_samples == 0:
            return DecisionNode(value=0.0)

        num_features = len(X[0])

        if depth >= self.max_depth or num_samples < self.min_samples_split:
            leaf_val = sum(y) / float(num_samples) if num_samples > 0 else 0.0
            return DecisionNode(value=leaf_val)

        best_feat, best_thresh = None, None
        best_variance_reduction = -1.0

        current_var = self._variance(y)

        # Sample subset of features for random forest node split
        feat_indices = random.sample(range(num_features), max(1, int(math.sqrt(num_features))))

        for feat_idx in feat_indices:
            thresholds = set([row[feat_idx] for row in X])
            for thresh in thresholds:
                left_y = [y[i] for i in range(num_samples) if X[i][feat_idx] <= thresh]
                right_y = [y[i] for i in range(num_samples) if X[i][feat_idx] > thresh]

                if len(left_y) == 0 or len(right_y) == 0:
                    continue

                var_left = self._variance(left_y)
                var_right = self._variance(right_y)
                weight_left = len(left_y) / float(num_samples)
                weight_right = len(right_y) / float(num_samples)

                var_reduction = current_var - (weight_left * var_left + weight_right * var_right)

                if var_reduction > best_variance_reduction:
                    best_variance_reduction = var_reduction
                    best_feat = feat_idx
                    best_thresh = thresh

        if best_variance_reduction <= 0 or best_feat is None:
            leaf_val = sum(y) / float(num_samples)
            return DecisionNode(value=leaf_val)

        left_X = [X[i] for i in range(num_samples) if X[i][best_feat] <= best_thresh]
        left_y = [y[i] for i in range(num_samples) if X[i][best_feat] <= best_thresh]
        right_X = [X[i] for i in range(num_samples) if X[i][best_feat] > best_thresh]
        right_y = [y[i] for i in range(num_samples) if X[i][best_feat] > best_thresh]

        left_child = self._build_tree(left_X, left_y, depth + 1)
        right_child = self._build_tree(right_X, right_y, depth + 1)

        return DecisionNode(feature_idx=best_feat, threshold=best_thresh, left=left_child, right=right_child)

    def _variance(self, y):
        if len(y) == 0:
            return 0.0
        mean = sum(y) / len(y)
        return sum((val - mean) ** 2 for val in y) / len(y)

    def predict(self, x):
        return self._traverse_tree(x, self.root)

    def _traverse_tree(self, x, node):
        if node.is_leaf_node():
            return node.value
        if x[node.feature_idx] <= node.threshold:
            return self._traverse_tree(x, node.left)
        return self._traverse_tree(x, node.right)


class RandomForestRegressorClassifier:
    """
    Random Forest Ensemble model for student trajectory prediction & SHAP attribution
    """
    def __init__(self, n_estimators=30, max_depth=6):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.trees = []
        self.feature_names = [
            "Attendance %", "Mid-Sem %", "Quiz 1 %", "Quiz 2 %", 
            "Study Hours/Wk", "Active Backlogs", "Stress Index"
        ]

    def fit(self, X, y):
        random.seed(42)
        self.trees = []
        num_samples = len(X)
        for _ in range(self.n_estimators):
            # Bootstrap sampling
            bootstrap_indices = [random.randint(0, num_samples - 1) for _ in range(num_samples)]
            X_boot = [X[i] for i in bootstrap_indices]
            y_boot = [y[i] for i in bootstrap_indices]

            tree = SingleDecisionTree(max_depth=self.max_depth)
            tree.fit(X_boot, y_boot)
            self.trees.append(tree)

    def predict(self, x):
        predictions = [tree.predict(x) for tree in self.trees]
        return sum(predictions) / float(len(predictions))

    def calculate_shap_contributions(self, x, baseline_x):
        """
        Calculates SHAP feature impact values comparing sample x against population baseline
        """
        base_pred = self.predict(baseline_x)
        sample_pred = self.predict(x)

        shap_values = []
        # Feature-wise marginal contribution
        for i in range(len(x)):
            # Substitute feature i with baseline value
            x_modified = list(x)
            x_modified[i] = baseline_x[i]
            pred_without_feature = self.predict(x_modified)

            # SHAP impact = difference when feature is present vs replaced by baseline
            shap_val = sample_pred - pred_without_feature
            
            is_neg = shap_val < 0
            feature_label = self.feature_names[i]

            shap_values.append({
                "feature": feature_label,
                "shap_value": round(shap_val, 3),
                "actual_value": str(x[i]),
                "is_negative": is_neg
            })

        return shap_values


def train_model_from_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT overall_attendance, mid_sem_score, quiz1_score, quiz2_score,
           study_hours_per_week, backlogs_count, stress_index, predicted_cgpa
    FROM students;
    """)

    rows = cursor.fetchall()
    conn.close()

    X = []
    y = []
    for r in rows:
        X.append([r[0], r[1], r[2], r[3], r[4], r[5], r[6]])
        y.append(r[7])

    rf = RandomForestRegressorClassifier(n_estimators=30, max_depth=6)
    rf.fit(X, y)
    return rf, X


def predict_for_student(student_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, name, overall_attendance, mid_sem_score, quiz1_score, quiz2_score,
           study_hours_per_week, backlogs_count, stress_index, cgpa, predicted_cgpa, scenario, risk_level
    FROM students WHERE id = ?;
    """, (student_id,))

    row = cursor.fetchone()
    if not row:
        conn.close()
        return {"error": "Student not found"}

    x_student = [row[2], row[3], row[4], row[5], row[6], row[7], row[8]]
    baseline = [80.0, 75.0, 75.0, 70.0, 12.0, 0, 3.0]

    rf, _ = train_model_from_db()
    model_predicted_cgpa = rf.predict(x_student)
    shap_impacts = rf.calculate_shap_contributions(x_student, baseline)

    # Fetch stored SHAP features & interventions
    cursor.execute("SELECT feature_name, shap_value, actual_value, scenario_description, is_negative FROM shap_features WHERE student_id = ?;", (student_id,))
    stored_shaps = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT id, date, faculty_name, action_taken, notes, status FROM interventions WHERE student_id = ? ORDER BY date DESC;", (student_id,))
    interventions = [dict(r) for r in cursor.fetchall()]

    conn.close()

    return {
        "student_id": row[0],
        "name": row[1],
        "current_cgpa": row[9],
        "db_predicted_cgpa": row[10],
        "rf_model_predicted_cgpa": round(model_predicted_cgpa, 2),
        "scenario": row[11],
        "risk_level": row[12],
        "shap_contributions": shap_impacts,
        "detailed_shap": stored_shaps,
        "interventions": interventions
    }

def simulate_grade_trajectory(attendance, mid_sem, quiz2, backlogs):
    # Default feature vector for simulation
    # [overall_attendance, mid_sem_score, quiz1_score, quiz2_score, study_hours_per_week, backlogs_count, stress_index]
    study_hours = max(4.0, (attendance / 100.0) * 16.0)
    stress_idx = 1.0 + (backlogs * 1.5) + (0.5 if attendance < 70 else 0)

    x_sim = [float(attendance), float(mid_sem), 75.0, float(quiz2), study_hours, int(backlogs), stress_idx]
    baseline = [80.0, 75.0, 75.0, 70.0, 12.0, 0, 3.0]

    rf, _ = train_model_from_db()
    pred_cgpa = rf.predict(x_sim)

    # Determine scenario category based on predicted CGPA and attendance
    if pred_cgpa >= 9.0 and attendance >= 90:
        cat = "perfect"
        risk = "Low Risk"
    elif pred_cgpa >= 8.0 and attendance >= 80:
        cat = "good_performer"
        risk = "Low Risk"
    elif pred_cgpa >= 7.0 and attendance >= 70:
        cat = "intermediate"
        risk = "Moderate Risk"
    elif pred_cgpa >= 5.5 and attendance >= 60:
        cat = "facing_difficulties"
        risk = "High Risk"
    else:
        cat = "in_difficulty"
        risk = "Critical Risk"

    shap_impacts = rf.calculate_shap_contributions(x_sim, baseline)

    return {
        "simulated_features": {
            "attendance": attendance,
            "mid_sem": mid_sem,
            "quiz2": quiz2,
            "backlogs": backlogs
        },
        "rf_predicted_cgpa": round(pred_cgpa, 2),
        "predicted_scenario": cat,
        "predicted_risk_level": risk,
        "shap_analysis": shap_impacts
    }

def get_all_students_from_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM demo_test_students;")
    demo_count = cursor.fetchone()[0]
    if demo_count > 0:
        cursor.execute("SELECT * FROM demo_test_students ORDER BY batch_rank;")
    else:
        cursor.execute("SELECT * FROM students;")
    rows = cursor.fetchall()
    students_list = []

    for r in rows:
        s_id = r["id"]

        # Fetch SHAP features
        cursor.execute("SELECT feature_name as featureName, shap_value as shapValue, actual_value as actualValue, scenario_description as description, is_negative as isNegative FROM shap_features WHERE student_id = ?;", (s_id,))
        shaps = [dict(sf) for sf in cursor.fetchall()]

        # Fetch interventions
        cursor.execute("SELECT id, date, faculty_name as facultyName, action_taken as actionTaken, notes, status FROM interventions WHERE student_id = ? ORDER BY date DESC;", (s_id,))
        interventions = [dict(inv) for inv in cursor.fetchall()]

        cgpa_val = float(r["cgpa"] or 7.5)
        overall_att = float(r["overall_attendance"] or 75.0)
        mid_score = float(r["mid_sem_score"] or 70.0)
        q1_score = float(r["quiz1_score"] or 15.0)
        q2_score = float(r["quiz2_score"] or 15.0)

        semester_grades = [
            {"semester": 1, "semName": "Sem 1", "sgpa": round(max(4.0, cgpa_val - 0.3), 2), "cgpa": round(max(4.0, cgpa_val - 0.3), 2), "credits": 22, "status": "Completed"},
            {"semester": 2, "semName": "Sem 2", "sgpa": round(max(4.0, cgpa_val - 0.1), 2), "cgpa": round(max(4.0, cgpa_val - 0.2), 2), "credits": 24, "status": "Completed"},
            {"semester": 3, "semName": "Sem 3", "sgpa": round(cgpa_val, 2), "cgpa": round(cgpa_val - 0.1, 2), "credits": 24, "status": "Completed"},
            {"semester": 4, "semName": "Sem 4", "sgpa": round(min(10.0, cgpa_val + 0.1), 2), "cgpa": round(cgpa_val, 2), "credits": 22, "status": "Completed"},
            {"semester": 5, "semName": "Sem 5 (Current)", "sgpa": round(min(10.0, cgpa_val + 0.2), 2), "cgpa": round(cgpa_val, 2), "credits": 24, "status": "Current"},
            {"semester": 6, "semName": "Sem 6", "sgpa": 0, "cgpa": 0, "credits": 22, "status": "Upcoming"},
            {"semester": 7, "semName": "Sem 7", "sgpa": 0, "cgpa": 0, "credits": 20, "status": "Upcoming"},
            {"semester": 8, "semName": "Sem 8", "sgpa": 0, "cgpa": 0, "credits": 18, "status": "Upcoming"},
        ]

        subject_attendances = [
            {"subjectCode": "CS301", "subjectName": "Data Structures & Algorithms", "attendedLectures": max(0, min(40, int(overall_att * 0.4))), "totalLectures": 40, "attendedLabs": max(0, min(20, int(overall_att * 0.2))), "totalLabs": 20},
            {"subjectCode": "CS302", "subjectName": "Database Management Systems", "attendedLectures": max(0, min(40, int(overall_att * 0.38))), "totalLectures": 40, "attendedLabs": max(0, min(20, int(overall_att * 0.19))), "totalLabs": 20},
            {"subjectCode": "CS303", "subjectName": "Computer Networks & Security", "attendedLectures": max(0, min(40, int(overall_att * 0.36))), "totalLectures": 40, "attendedLabs": max(0, min(20, int(overall_att * 0.18))), "totalLabs": 20},
            {"subjectCode": "CS304", "subjectName": "Theory of Computation", "attendedLectures": max(0, min(40, int(overall_att * 0.35))), "totalLectures": 40, "attendedLabs": max(0, min(20, int(overall_att * 0.17))), "totalLabs": 20},
        ]

        assessments = [
            {"id": f"ass-1-{s_id}", "subject": "Data Structures & Algo", "type": "Quiz 1", "maxMarks": 20, "scoredMarks": int(q1_score), "weightage": 10, "date": "2026-06-10"},
            {"id": f"ass-2-{s_id}", "subject": "Data Structures & Algo", "type": "Quiz 2", "maxMarks": 20, "scoredMarks": int(q2_score), "weightage": 10, "date": "2026-06-25"},
            {"id": f"ass-3-{s_id}", "subject": "Database Management Systems", "type": "Mid-Sem Exam", "maxMarks": 50, "scoredMarks": int(mid_score * 0.5), "weightage": 30, "date": "2026-07-15"},
            {"id": f"ass-4-{s_id}", "subject": "Computer Networks", "type": "Lab Assignment", "maxMarks": 20, "scoredMarks": int(max(5, q2_score * 0.9)), "weightage": 15, "date": "2026-07-20"},
        ]

        student_dict = {
            "id": r["id"],
            "rollNo": r["roll_no"],
            "name": r["name"],
            "email": r["email"],
            "phone": r["phone"],
            "parentPhone": r["parent_phone"],
            "branch": r["branch"],
            "department": r["department"],
            "batch": r["batch"],
            "currentSemester": r["current_semester"],
            "cgpa": r["cgpa"],
            "predictedCgpa": r["predicted_cgpa"],
            "overallAttendance": r["overall_attendance"],
            "lectureAttendance": r["lecture_attendance"],
            "labAttendance": r["lab_attendance"],
            "scenario": r["scenario"],
            "riskLevel": r["risk_level"],
            "batchRank": r["batch_rank"],
            "totalBatchStudents": r["total_batch_students"],
            "mentorName": r["mentor_name"],
            "avatar": r["avatar"],
            "midSemScore": r["mid_sem_score"],
            "quiz1Score": r["quiz1_score"],
            "quiz2Score": r["quiz2_score"],
            "studyHoursPerWeek": r["study_hours_per_week"],
            "backlogsCount": r["backlogs_count"],
            "stressIndex": r["stress_index"],
            "shapFeatures": shaps,
            "interventions": interventions,
            "semesterGrades": semester_grades,
            "subjectAttendances": subject_attendances,
            "assessments": assessments
        }
        students_list.append(student_dict)

    conn.close()
    return students_list

def add_intervention(student_id, action_taken, notes, faculty_name="Dr. Ramesh Kumar"):
    import time
    conn = get_connection()
    cursor = conn.cursor()

    int_id = f"int-{int(time.time()*1000)}"
    date_str = time.strftime("%Y-%m-%d")
    status = "In Progress"

    cursor.execute(
        "INSERT INTO interventions (id, student_id, date, faculty_name, action_taken, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?);",
        (int_id, student_id, date_str, faculty_name, action_taken, notes, status)
    )
    conn.commit()
    conn.close()

    return {
        "success": True,
        "intervention": {
            "id": int_id,
            "studentId": student_id,
            "date": date_str,
            "facultyName": faculty_name,
            "actionTaken": action_taken,
            "notes": notes,
            "status": status
        }
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == "get_students":
            print(json.dumps(get_all_students_from_db()))
        elif cmd == "predict" and len(sys.argv) > 2:
            print(json.dumps(predict_for_student(sys.argv[2])))
        elif cmd == "simulate" and len(sys.argv) > 5:
            att = float(sys.argv[2])
            mid = float(sys.argv[3])
            q2 = float(sys.argv[4])
            bg = int(sys.argv[5])
            print(json.dumps(simulate_grade_trajectory(att, mid, q2, bg)))
        elif cmd == "add_intervention" and len(sys.argv) > 4:
            s_id = sys.argv[2]
            action = sys.argv[3]
            notes = sys.argv[4]
            fac = sys.argv[5] if len(sys.argv) > 5 else "Dr. Ramesh Kumar"
            print(json.dumps(add_intervention(s_id, action, notes, fac)))
        else:
            print(json.dumps({"error": "Unknown command"}))
    else:
        # Default: output all students
        print(json.dumps(get_all_students_from_db()))
