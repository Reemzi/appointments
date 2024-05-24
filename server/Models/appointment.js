import mongoose from "mongoose";

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

export default Appointment;
