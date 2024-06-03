import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Reference to Employee
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
