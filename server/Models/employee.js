import mongoose from "mongoose";
// @TODO: Fill in with more attributes, add a reference to the appointment

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
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
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
