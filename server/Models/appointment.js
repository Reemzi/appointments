const mongoose = require("mongoose");

// Define the Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Validate email format using regex
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  note: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
