import User from '../Models/User'
const app = express();

// Write basic CRUD operations for users
// CRUD = Create, Retrieve, Update, Delete, where Create = POST, Retrieve = GET, Update = PATCH | PUT, Delete = DELETE


// @TODO

// Create
app.post("/api/client", async(req, res) => {
  try {
    const { name, lastName, email} = req.body;
    // Check if user exists and throw an error - the frontend would eventually handle it
    let client = await User.findOne({  name, lastName , email});
    if (client) return res.status(409).json({ errors: [{ msg: 'Client already exists' }] });

    // Save the user to the database
    const savedUser =  await User.create({
      name, lastName , email
    });
    res.json(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Retrieve
app.get("/api/client", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Client retrieved successfully!" });
});

// Update
app.patch("/api/client", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Client updated successfully!" });
});

// Delete
app.delete("/api/client", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Client deleted successfully!" });
});




