import express from "express";
// import User from "../models/user.js"; // Ensure the User model is imported
import Appointment from "../models/appointment.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment booked successfully!", appointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Retrieve a specific appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//
router.get("/", async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a specific appointment by email
router.get("/email/:email", async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ email: req.params.email });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment by email not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
