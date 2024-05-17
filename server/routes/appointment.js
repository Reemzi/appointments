import Appointment from '../Models/Appointment';
const app = express();

// Write basic CRUD operations for appointments
// CRUD = Create, Retrieve, Update, Delete, where Create = POST, Retrieve = GET, Update = PATCH | PUT, Delete = DELETE


// @TODO

// Create
app.post("/api/appointments", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Appointment booked successfully!" });
});

// Retrieve
app.get("/api/appointments", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Appointment retrieved successfully!" });
});

// Update
app.patch("/api/appointments", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Appointment updated successfully!" });
});

// Delete
app.delete("/api/appointments", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Appointment deleted successfully!" });
});
