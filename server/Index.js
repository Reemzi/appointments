const express = require("express");
const cors = require("cors");
const Appointment = require("./Models/appointment");
const User = require("./Models/User");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Connect to MongoDB
require("./db/connection");
console.log("Database connected.");
app.get("/create-appointment", async (req, res) => {
  try {
    // Create a new appointment instance
    const newAppointment = new Appointment({
      name: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      date: new Date(),
      time: "10:00 AM",
      note: "Follow-up appointment",
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();
    res.send(savedAppointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/create-user", async (req, res) => {
  try {
    // Create a new user instance
    const newUser = new User({
      name: "Jane",
      lastname: "Smith",
      email: "janesmith@example.com",
      date: new Date(),
      time: "2:00 PM",
      note: "New user registration",
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/appointments", (req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Appointment booked successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
