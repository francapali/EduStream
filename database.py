import sqlite3
import json
import os
import random
import sys

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "academic_analytics.db"))


def _recover_database():
    backup_path = f"{DB_PATH}.corrupt"
    if os.path.exists(DB_PATH):
        try:
            if os.path.exists(backup_path):
                os.remove(backup_path)
            os.replace(DB_PATH, backup_path)
        except PermissionError:
            try:
                os.remove(DB_PATH)
            except FileNotFoundError:
                pass
    return backup_path if os.path.exists(backup_path) else None


def get_connection():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.execute("SELECT 1")
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.DatabaseError:
        _recover_database()
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn


def _build_student_seed_rows(start_index=1000, count=220):
    branches = [
        ("Computer Science & Engg", "Dept of CSE"),
        ("Electronics & Comm Engg", "Dept of ECE"),
        ("Mechanical Engineering", "Dept of ME"),
        ("Electrical Engineering", "Dept of EE"),
    ]
    names = [
        "Aarav Sharma", "Priya Nair", "Rohan Verma", "Sneha Patel", "Vikram Das", "Ananya Rao",
        "Kiran Menon", "Diya Iyer", "Mohit Joshi", "Nisha Kumar", "Sanjay Pillai", "Meera Sethi",
        "Aditi Bhatia", "Harish Reddy", "Pooja Shah", "Rahul Gupta", "Shalini Singh", "Tushar Malhotra",
        "Kavya Nair", "Arjun Desai", "Mira Chowdary", "Nitin Agarwal", "Ritika Bhatt", "Yash Khatri"
    ]
    rows = []
    rng = random.Random(42 + start_index)

    for offset in range(count):
        index = start_index + offset
        student_id = f"std-{index}"
        branch, department = branches[(index - 1) % len(branches)]
        name = names[(index - 1) % len(names)]
        attendance = round(min(99.5, max(45.0, 78.0 + rng.uniform(-12.0, 18.0))), 1)
        mid_sem = round(min(100.0, max(0.0, 66.0 + rng.uniform(-18.0, 24.0))), 1)
        quiz1 = round(min(20.0, max(0.0, 12.0 + rng.uniform(-5.5, 7.5))), 1)
        quiz2 = round(min(20.0, max(0.0, 11.0 + rng.uniform(-6.0, 8.0))), 1)
        study_hours = round(min(20.0, max(2.0, 8.5 + rng.uniform(-3.5, 7.0))), 1)
        backlogs = int(min(5, max(0, round(0.6 + rng.gauss(0.8, 1.2)))))
        stress_index = round(min(8.0, max(1.0, 3.0 + rng.uniform(-1.0, 3.8))), 1)
        cgpa = round(min(10.0, max(2.0, 5.2 + (attendance / 100.0) * 3.4 + (mid_sem / 100.0) * 0.9 - backlogs * 0.35 + (quiz2 / 20.0) * 0.18 + (study_hours / 20.0) * 0.12 + rng.uniform(-0.25, 0.28))), 2)
        predicted_cgpa = round(min(10.0, max(0.0, cgpa + rng.uniform(-0.2, 0.25))), 2)

        if cgpa >= 9.0 and attendance >= 90:
            scenario = "perfect"
            risk_level = "Low Risk"
        elif cgpa >= 7.5 and attendance >= 75:
            scenario = "good"
            risk_level = "Low Risk"
        elif cgpa >= 6.5 and attendance >= 70:
            scenario = "intermediate"
            risk_level = "Moderate Risk"
        elif cgpa >= 5.5 or attendance >= 65:
            scenario = "facing_difficulties"
            risk_level = "High Risk"
        else:
            scenario = "in_difficulty"
            risk_level = "Critical Risk"

        rows.append((
            student_id,
            f"21{branch[:2].upper()}{index % 1000:03d}",
            name,
            f"{student_id}@univ.edu.in",
            f"+91-98765-{(index % 90000) + 10000:05d}",
            f"+91-98765-{(index % 90000) + 20000:05d}",
            branch,
            department,
            "2021-25",
            4 + (index % 5),
            cgpa,
            predicted_cgpa,
            attendance,
            round(min(99.0, max(45.0, attendance + rng.uniform(-4.0, 6.0))), 1),
            round(min(99.0, max(45.0, attendance + rng.uniform(-6.0, 5.0))), 1),
            scenario,
            risk_level,
            offset + 1,
            220,
            "Dr. Ramesh Kumar",
            f"https://i.pravatar.cc/150?img={(index % 70) + 1}",
            mid_sem,
            quiz1,
            quiz2,
            study_hours,
            backlogs,
            stress_index,
        ))

    return rows


def _build_demo_test_rows(count=30):
    branches = [
        ("Computer Science & Engg", "Dept of CSE"),
        ("Electronics & Comm Engg", "Dept of ECE"),
        ("Mechanical Engineering", "Dept of ME"),
        ("Electrical Engineering", "Dept of EE"),
    ]
    names = [
        "Maya Ahuja", "Dev Rao", "Ishita Sen", "Arnav Singh", "Rhea Mehta", "Kunal Sharma",
        "Sanya Kapoor", "Nikhil Vyas", "Anvi Subramanian", "Rohan Kulkarni", "Tanvi Thomas",
        "Pranav Nair", "Bhavya Deshmukh", "Aman Roy", "Neha Bhandari", "Vivek Srivastava",
        "Sakshi Jain", "Aditya Chawla", "Jiya Menon", "Parth Bhatia", "Kavita Das", "Manav Dutta",
        "Asha Iyer", "Rudra Goel", "Naina Verma", "Harsh Mittal", "Pallavi Reddy", "Eshaan Thakur"
    ]
    rows = []
    rng = random.Random(2026)
    for idx in range(1, count + 1):
        student_id = f"demo-{idx:03d}"
        branch, department = branches[(idx - 1) % len(branches)]
        name = names[(idx - 1) % len(names)]
        attendance = round(min(99.5, max(48.0, 60.0 + (idx % 10) * 3.5 + rng.uniform(-2.0, 2.0))), 1)
        mid_sem = round(min(100.0, max(0.0, 58.0 + (idx % 8) * 4.0 + rng.uniform(-4.0, 4.0))), 1)
        quiz1 = round(min(20.0, max(0.0, 10.0 + (idx % 6) * 1.4 + rng.uniform(-0.8, 1.2))), 1)
        quiz2 = round(min(20.0, max(0.0, 9.0 + (idx % 7) * 1.6 + rng.uniform(-1.0, 1.4))), 1)
        study_hours = round(min(20.0, max(3.0, 7.0 + (idx % 8) * 0.7 + rng.uniform(-0.6, 1.0))), 1)
        backlogs = int(min(4, max(0, (idx % 5) - 1 + (1 if idx % 7 == 0 else 0))))
        stress = round(min(7.8, max(1.0, 2.6 + (idx % 4) * 0.8 + rng.uniform(-0.3, 0.5))), 1)
        cgpa = round(min(10.0, max(2.0, 4.8 + (attendance / 100.0) * 3.4 + (mid_sem / 100.0) * 1.2 - backlogs * 0.33 + (quiz2 / 20.0) * 0.25 + rng.uniform(-0.2, 0.2))), 2)
        predicted_cgpa = round(min(10.0, max(0.0, cgpa + rng.uniform(-0.15, 0.2))), 2)

        if cgpa >= 9.0 and attendance >= 90:
            scenario = "perfect"
            risk_level = "Low Risk"
        elif cgpa >= 7.5 and attendance >= 75:
            scenario = "good"
            risk_level = "Low Risk"
        elif cgpa >= 6.5 and attendance >= 70:
            scenario = "intermediate"
            risk_level = "Moderate Risk"
        elif cgpa >= 5.5 or attendance >= 65:
            scenario = "facing_difficulties"
            risk_level = "High Risk"
        else:
            scenario = "in_difficulty"
            risk_level = "Critical Risk"

        rows.append((
            student_id,
            f"DEMO{idx:03d}",
            name,
            f"{student_id}@univ.edu.in",
            f"+91-98765-{(idx % 90000) + 10000:05d}",
            f"+91-98765-{(idx % 90000) + 20000:05d}",
            branch,
            department,
            "2024-28",
            2 + (idx % 6),
            cgpa,
            predicted_cgpa,
            attendance,
            round(min(99.0, max(45.0, attendance + rng.uniform(-4.0, 5.0))), 1),
            round(min(99.0, max(45.0, attendance + rng.uniform(-5.0, 4.0))), 1),
            scenario,
            risk_level,
            idx,
            30,
            "Dr. Ramesh Kumar",
            f"https://i.pravatar.cc/150?img={(idx % 70) + 1}",
            mid_sem,
            quiz1,
            quiz2,
            study_hours,
            backlogs,
            stress,
        ))
    return rows


def init_db():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Create students table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id TEXT PRIMARY KEY,
            roll_no TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            parent_phone TEXT NOT NULL,
            branch TEXT NOT NULL,
            department TEXT NOT NULL,
            batch TEXT NOT NULL,
            current_semester INTEGER NOT NULL,
            cgpa REAL NOT NULL,
            predicted_cgpa REAL NOT NULL,
            overall_attendance REAL NOT NULL,
            lecture_attendance REAL NOT NULL,
            lab_attendance REAL NOT NULL,
            scenario TEXT NOT NULL,
            risk_level TEXT NOT NULL,
            batch_rank INTEGER NOT NULL,
            total_batch_students INTEGER NOT NULL,
            mentor_name TEXT NOT NULL,
            avatar TEXT NOT NULL,
            mid_sem_score REAL NOT NULL,
            quiz1_score REAL NOT NULL,
            quiz2_score REAL NOT NULL,
            study_hours_per_week REAL NOT NULL,
            backlogs_count INTEGER NOT NULL,
            stress_index REAL NOT NULL
        );
        """)

        # Create interventions table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS interventions (
            id TEXT PRIMARY KEY,
            student_id TEXT NOT NULL,
            date TEXT NOT NULL,
            faculty_name TEXT NOT NULL,
            action_taken TEXT NOT NULL,
            notes TEXT NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students (id)
        );
        """)

        # Create shap_features table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS shap_features (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            feature_name TEXT NOT NULL,
            shap_value REAL NOT NULL,
            actual_value TEXT NOT NULL,
            scenario_description TEXT NOT NULL,
            is_negative BOOLEAN NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students (id)
        );
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS demo_test_students (
            id TEXT PRIMARY KEY,
            roll_no TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            parent_phone TEXT NOT NULL,
            branch TEXT NOT NULL,
            department TEXT NOT NULL,
            batch TEXT NOT NULL,
            current_semester INTEGER NOT NULL,
            cgpa REAL NOT NULL,
            predicted_cgpa REAL NOT NULL,
            overall_attendance REAL NOT NULL,
            lecture_attendance REAL NOT NULL,
            lab_attendance REAL NOT NULL,
            scenario TEXT NOT NULL,
            risk_level TEXT NOT NULL,
            batch_rank INTEGER NOT NULL,
            total_batch_students INTEGER NOT NULL,
            mentor_name TEXT NOT NULL,
            avatar TEXT NOT NULL,
            mid_sem_score REAL NOT NULL,
            quiz1_score REAL NOT NULL,
            quiz2_score REAL NOT NULL,
            study_hours_per_week REAL NOT NULL,
            backlogs_count INTEGER NOT NULL,
            stress_index REAL NOT NULL
        );
        """)

        cursor.execute("UPDATE students SET scenario = 'good' WHERE scenario = 'good_performer';")

        cursor.execute("SELECT COUNT(*) FROM students;")
        student_count = cursor.fetchone()[0]
        if student_count == 0:
            seed_students = _build_student_seed_rows(1000, 220)
            cursor.executemany("""
            INSERT INTO students VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
            """, seed_students)
        elif student_count < 220:
            extra_students = _build_student_seed_rows(1000 + student_count, 220 - student_count)
            cursor.executemany("""
            INSERT INTO students VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
            """, extra_students)

        cursor.execute("SELECT COUNT(*) FROM demo_test_students;")
        demo_student_count = cursor.fetchone()[0]
        if demo_student_count == 0:
            demo_students = _build_demo_test_rows(30)
            cursor.executemany("""
            INSERT INTO demo_test_students VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
            """, demo_students)

        if student_count == 0:
            shap_seeds = [
                ("std-1000", "Lecture Attendance", 0.45, "96.0%", "Consistently above 90% threshold, boosts retention.", False),
                ("std-1000", "Mid-Sem Evaluation", 0.38, "92.0%", "High concept mastery in core algorithms.", False),
                ("std-1001", "Quiz 2 Absence", -0.42, "0%", "Missed continuous evaluation checkpoint.", True),
                ("std-1002", "Backlog Pressure", -0.34, "2 active backlogs", "Multiple unresolved subjects are reducing momentum.", True),
            ]
            cursor.executemany("""
            INSERT INTO shap_features (student_id, feature_name, shap_value, actual_value, scenario_description, is_negative)
            VALUES (?,?,?,?,?,?);
            """, shap_seeds)

            intervention_seeds = [
                ("int-1001", "std-1000", "2026-03-10", "Dr. Ramesh Kumar", "Attendance Warning Issued", "Attendance is above target and the student is progressing well.", "Completed"),
                ("int-1002", "std-1002", "2026-03-12", "Dr. Ramesh Kumar", "Parent Phone Consultation", "Discussed backlog pressure and scheduled peer tutoring.", "In Progress"),
            ]
            cursor.executemany("""
            INSERT INTO interventions VALUES (?,?,?,?,?,?,?);
            """, intervention_seeds)

        conn.commit()
        conn.close()
        print("Database initialized successfully.", file=sys.stderr)
    except sqlite3.DatabaseError:
        _recover_database()
        init_db()

if __name__ == "__main__":
    init_db()
