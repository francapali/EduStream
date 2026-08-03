# EduStream

EduStream is an educational dashboard that combines a React frontend, an Express API, and a Python engine for forecasting student performance and simulating academic scenarios.

## Project goal

The app provides a dedicated view for students and teachers with:
- academic risk and analytics dashboards;
- simulation of grade and CGPA trajectories;
- interpretable explanations of the factors influencing results;
- a 30-student demo cohort for live presentations.

## Current architecture

- Frontend: React 19 + Vite + TypeScript
- Backend: Express/Node.js
- ML engine: Python with a custom Random Forest implementation
- Database: SQLite

## Dataset and workflow

The project is configured with two distinct datasets:
- Training set: 220 synthetic students used to train the model
- Demo set: 30 synthetic students used for presentations and the live demo flow

The database is initialized automatically by Python and contains:
- a students table for the training set
- a demo_test_students table for the demo cohort
- an interventions table for academic actions
- a shap_features table for feature-importance explanations

## Local startup

Prerequisites:
- Node.js
- Python 3.x

Run the app:
1. Install the Node dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Open the browser at:
   `http://127.0.0.1:3000`

## Quick verification

Backend health check:
- `http://127.0.0.1:3000/api/health`

Student data retrieval:
- `http://127.0.0.1:3000/api/students`

If you want to test the Python engine directly:
- `python random_forest.py get_students`

## Important notes

- The model is trained on the dataset of 220 students.
- The UI uses the 30-student demo cohort for the live demo.
- The main ML engine file is `random_forest.py`, while the database is created and populated by `database.py`.
