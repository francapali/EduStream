# EduStream Analytics — Workflow and datasets

## Overview

EduStream is an educational analytics platform that connects a React frontend, an Express backend, and a Python machine learning engine to help faculty and students understand academic performance, forecast CGPA, and explore support actions.

## Current architecture

```text
React frontend -> Express API -> Python Random Forest -> SQLite
```

Main components:
- Frontend: React 19 + Vite + TypeScript
- Backend: Express server on port 3000
- ML engine: custom Random Forest implementation in Python
- Database: SQLite with the academic_analytics.db file

## Model and training flow

The model is implemented in random_forest.py and does not rely on scikit-learn.

### Input features
The training rows use the following student indicators:
- overall_attendance
- mid_sem_score
- quiz1_score
- quiz2_score
- study_hours_per_week
- backlogs_count
- stress_index
- predicted_cgpa (target)

### Model configuration
- number of trees: 20
- maximum depth: 6
- prediction target: predicted_cgpa

### Evaluation strategy
The model is trained on the students table and evaluated on the test_students table. The training script reports:
- MAE
- MSE
- RMSE

## Dataset structure

The database bootstrap is handled by database.py.

### Training set
- Table: students
- Contents: 12,000 synthetic students
- Purpose: model training

### Test set
- Table: test_students
- Contents: 2,000 synthetic students
- Purpose: evaluation and validation

### Demo cohort
- Table: demo_test_students
- Contents: 30 realistic synthetic students
- Purpose: live presentation and UI exploration

## Runtime flow

1. The SQLite database is created or repaired if needed.
2. The Python engine loads the data and trains the Random Forest model.
3. The Express API exposes endpoints for health checks, student lists, predictions, simulation, and interventions.
4. The frontend consumes those APIs and renders the academic dashboards.

## API endpoints

- GET /api/health
- GET /api/students
- GET /api/predict/:studentId
- POST /api/simulate
- POST /api/interventions

## Local execution

### Install dependencies

```bash
npm install
```

### Start the application

```bash
npm run dev
```

Open the app at:
- http://127.0.0.1:3000

### Quick verification

```bash
.\.venv\Scripts\python.exe random_forest.py get_students
```

Or via browser/API:
- http://127.0.0.1:3000/api/health
- http://127.0.0.1:3000/api/students

## Operational notes

- If the SQLite file is corrupted, the application attempts to recover it automatically.
- The UI uses the demo cohort for presentation mode, while the model uses the larger training and test tables.
