# EduStream

EduStream is an educational analytics platform for universities and academic support teams. It combines a React frontend, an Express backend, and a Python-based machine learning engine to predict student performance, explain risk factors, and support staff in making more informed interventions.

## What the project does

- shows faculty and students a clear academic dashboard;
- predicts CGPA and academic risk using a custom Random Forest model;
- simulates grade trajectories and what-if scenarios;
- provides explainable insights through SHAP-like feature contributions;
- includes a realistic demo cohort for live presentations.

## Current architecture

- Frontend: React 19 + Vite + TypeScript
- Backend: Express/Node.js
- ML engine: Python with a custom Random Forest implementation
- Database: SQLite via academic_analytics.db

## Datasets and workflow

The project now uses a much larger synthetic dataset:
- Training set: 12,000 student records
- Test set: 2,000 student records
- Demo set: 30 student profiles from the test set

The database is initialized automatically by Python and includes:
- students: training data
- test_students: evaluation data
- interventions: faculty actions and follow-ups
- shap_features: feature-impact explanations

## Quick start

### Prerequisites

- Node.js 18+
- Python 3.x

### Windows

```bat
cd C:\Users\franc\Documents\GitHub\EduStream
python -m venv .venv
.\.venv\Scripts\activate
python -m pip install --upgrade pip
npm install
npm run dev
```

Then open:
- http://127.0.0.1:3000

### Verify the backend

- Health check: http://127.0.0.1:3000/api/health
- Students API: http://127.0.0.1:3000/api/students

### Run the Python engine directly

```bat
.\.venv\Scripts\python.exe random_forest.py get_students
```

## Notes

- The model is trained from the students table and evaluated on test_students.
- The UI uses the first 30 rows from test_students for the live demo experience.
- The main ML logic is in random_forest.py and the database bootstrap is handled by database.py.
