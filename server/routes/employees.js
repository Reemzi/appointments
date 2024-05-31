import express from "express";
import Employee from "../models/employee.js";

const router = express.Router();

// Create
router.post("/api/employee", async (req, res) => {
  try {
    const { name, lastName, email } = req.body;
    let employee = await Employee.findOne({ email });
    if (employee)
      return res
        .status(409)
        .json({ errors: [{ msg: "Employee already exists" }] });

    // Save the employee to the database
    const savedEmployee = await Employee.create({
      name,
      lastName,
      email,
    });
    res.json(savedEmployee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Retrieve
router.get("/api/employee/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ errors: [{ msg: "Employee not found" }] });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
