const mongoose = require("mongoose");

//@TODO: Add a reference to the user and the employee and also a reference appointment itself.
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
