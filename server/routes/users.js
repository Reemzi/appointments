import express from "express";
import User from "../models/user.js";

const router = express.Router(); // Define router instance

router.use(express.json());

// Write basic CRUD operations for users
// CRUD = Create, Retrieve, Update, Delete, where Create = POST, Retrieve = GET, Update = PATCH | PUT, Delete = DELETE

// Create
router.post("/api/client", async (req, res) => {
  try {
    const { name, lastName, email } = req.body;
    let client = await User.findOne({ name, lastName, email });
    if (client)
      return res
        .status(409)
        .json({ errors: [{ msg: "Client already exists" }] });

    // Save the user to the database
    const savedUser = await User.create({
      name,
      lastName,
      email,
    });
    res.json(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Retrieve
router.get("/api/client/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await User.findById(clientId);
    if (!client) {
      return res.status(404).json({ errors: [{ msg: "Client not found" }] });
    }
    res.json(client);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
