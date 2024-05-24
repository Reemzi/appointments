import express from "express";
import Appointment from "../models/appointment.js";

const router = express.Router();

router.use(express.json());

// Create
router.post("/api/appointments", async (req, res) => {
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

// Retrieve all appointments
router.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a specific appointment by ID
router.get("/api/appointments/:id", async (req, res) => {
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

export default router;
