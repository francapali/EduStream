# EduStream Analytics — Current workflow and datasets

## Overview
EduStream is an educational platform that combines a React frontend, an Express/Node.js backend, and a Python engine for academic performance prediction and risk-scenario simulation.

The project is configured to work with two separate datasets:
- Training set: 220 synthetic students used to train the model
- Demo set: 30 synthetic students used for live presentations and the app’s demo flow

---

## Current architecture

```text
React frontend -> Express API -> Python Random Forest -> SQLite
```

Main components:
- Frontend: React 19 + Vite + TypeScript
- Backend: Express server on port 3000
- ML engine: custom Random Forest implementation in Python
- Database: SQLite with the academic_analytics.db file

---

## ML engine

The current model is implemented in [random_forest.py](random_forest.py) and does not depend on scikit-learn.

### Training data
The model is trained by reading records from the students table, which contains 220 synthetic students with fields such as:
- overall_attendance
- mid_sem_score
- quiz1_score
- quiz2_score
- study_hours_per_week
- backlogs_count
- stress_index
- predicted_cgpa

### Model configuration
- number of trees: 30
- maximum depth: 6
- target: predicted_cgpa

The model also produces a feature-impact estimate through a SHAP-like mechanism based on the difference between a sample prediction and a baseline.

---

## Datasets and demo cohort

The database is initialized by [database.py](database.py).

### Training set
- Table: students
- Contents: 220 synthetic students
- Purpose: model training

### Demo set
- Table: demo_test_students
- Contents: 30 synthetic students
- Purpose: live presentation and UI-flow verification without using the full training set

This separation provides:
- a more realistic dataset for model training;
- a lighter and more readable cohort for the demo.

---

## Operational flow

1. The database is created or rebuilt if the SQLite file is corrupted.
2. The Python engine loads data from the database and trains the model.
3. The Express API exposes endpoints such as:
   - GET /api/health
   - GET /api/students
   - GET /api/predict/:studentId
   - POST /api/simulate
   - POST /api/interventions
4. The frontend uses these endpoints to display dashboards, predictions, and simulators.

---

## Local execution

### Start backend/frontend
```bash
npm install
npm run dev
```

The server will be available at:
```text
http://127.0.0.1:3000
```

### Quick verification
```bash
python random_forest.py get_students
```

Or through the browser/API:
- http://127.0.0.1:3000/api/health
- http://127.0.0.1:3000/api/students

---

## Operational notes

- If the SQLite file is damaged, the system attempts to recreate it automatically.
- The UI uses the 30-student demo set for live visualization.
- The training set remains separate and is not used as the presentation cohort.
