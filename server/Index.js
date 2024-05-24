import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import appointmentRoutes from "./routes/appointments.js";
import employeeRoutes from "./routes/employees.js";
import path from "path";
import { fileURLToPath } from "url";
import "./db/connection.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/employees", employeeRoutes);

console.log("Database connected.");

// Routes
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/employees", employeeRoutes);

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the appointment booking API!");
});

// Static files
if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
