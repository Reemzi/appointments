import Employee from '../Models/Employee';
const app = express();

// Write basic CRUD operations for employees
// CRUD = Create, Retrieve, Update, Delete, where Create = POST, Retrieve = GET, Update = PATCH | PUT, Delete = DELETE


// @TODO

// Create
app.post("/api/employees", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Employee created successfully!" });
});

// Retrieve
app.get("/api/employees", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Employee retrieved successfully!" });
});

// Update
app.patch("/api/employees", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Employee updated successfully!" });
});

// Delete
app.delete("/api/employees", async(req, res) => {
  // Handle appointment creation logic here
  res.json({ message: "Employee deleted successfully!" });
});
