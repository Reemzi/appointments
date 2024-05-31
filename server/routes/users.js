import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.post("/api/user", async (req, res) => {
  try {
    const { name, lastName, email } = req.body;
    let user = await User.findOne({ email });
    if (user)
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
export default router;
