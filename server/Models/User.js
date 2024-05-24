import mongoose from "mongoose"; // Using ES module syntax

// Define the user schema
const userSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
});

// Create the user model
const User = mongoose.model("User", userSchema);

// Export the model using ES module syntax
export default User;
