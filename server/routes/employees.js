// Write basic CRUD operations for employees
// CRUD = Create, Retrieve, Update, Delete, where Create = POST, Retrieve = GET, Update = PATCH | PUT, Delete = DELETE

// @TODO

import express from "express";
import Employee from "../models/employee.js";

const router = express.Router();

router.use(express.json());

// Create
router.post("/api/employees", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const employee = new Employee({ name, email, role });
    await employee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve all employees
router.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve a specific employee by ID
router.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Write basic CRUD operations for employees
// CRUD = Create, Retrieve, Update, Delete, where Create = POST, Retrieve = GET, Update = PATCH | PUT, Delete = DELETE

// @TODO

// // Update
// app.patch("/api/employees", async (req, res) => {
//   // Handle appointment creation logic here
//   res.json({ message: "Employee updated successfully!" });
// });

// // Delete
// app.delete("/api/employees", async (req, res) => {
//   // Handle appointment creation logic here
//   res.json({ message: "Employee deleted successfully!" });
// });
export default router;
