import express from "express";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { createServer as createViteServer } from "vite";

const execFileAsync = promisify(execFile);
const app = express();
const PORT = 3000;
const pythonCommand = process.env.PYTHON_CMD || (process.platform === "win32" ? "python.exe" : "python3");

async function runPythonScript(args: string[]) {
  const { stdout } = await execFileAsync(pythonCommand, ["random_forest.py", ...args], { cwd: process.cwd() });
  return stdout;
}

app.use(express.json());

// 1. Healthcheck API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", engine: "Python RandomForest + SQLite + Node/Express Bridge", timestamp: new Date().toISOString() });
});

// 2. Fetch all students from Python ML database
app.get("/api/students", async (req, res) => {
  try {
    const stdout = await runPythonScript(["get_students"]);
    const students = JSON.parse(stdout);
    res.json(students);
  } catch (err: any) {
    console.error("Error executing Python script:", err);
    res.status(500).json({ error: "Failed to fetch student data from Python backend", details: err.message });
  }
});

// 3. Predict & SHAP analysis for single student
app.get("/api/predict/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const stdout = await runPythonScript(["predict", studentId]);
    const prediction = JSON.parse(stdout);
    res.json(prediction);
  } catch (err: any) {
    console.error("Error running Python ML prediction:", err);
    res.status(500).json({ error: "Failed to run Random Forest prediction", details: err.message });
  }
});

// 4. Run what-if grade & CGPA trajectory simulation via Random Forest ML model
app.post("/api/simulate", async (req, res) => {
  try {
    const { attendance, midSem, quiz2, backlogs } = req.body;
    const att = attendance ?? 75;
    const mid = midSem ?? 70;
    const q2 = quiz2 ?? 70;
    const bg = backlogs ?? 0;

    const stdout = await runPythonScript(["simulate", String(att), String(mid), String(q2), String(bg)]);
    const simulationResult = JSON.parse(stdout);
    res.json(simulationResult);
  } catch (err: any) {
    console.error("Error executing Random Forest simulation:", err);
    res.status(500).json({ error: "Simulation failed", details: err.message });
  }
});

// 5. Add new Faculty Intervention to Python SQLite Database
app.post("/api/interventions", async (req, res) => {
  const { studentId, actionTaken, notes, facultyName } = req.body;
  if (!studentId || !actionTaken || !notes) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const faculty = facultyName || "Dr. Ramesh Kumar";
    // Sanitize string quotes for safety in CLI argument
    const safeStudentId = JSON.stringify(studentId);
    const safeActionTaken = JSON.stringify(actionTaken);
    const safeNotes = JSON.stringify(notes);
    const safeFaculty = JSON.stringify(faculty);

    const stdout = await runPythonScript(["add_intervention", safeStudentId, safeActionTaken, safeNotes, safeFaculty]);
    const result = JSON.parse(stdout);
    return res.json(result);
  } catch (err: any) {
    console.error("Failed to insert intervention:", err);
    return res.status(500).json({ error: "Database error inserting intervention", details: err.message });
  }
});

async function startServer() {
  // Integrate Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduStream Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
