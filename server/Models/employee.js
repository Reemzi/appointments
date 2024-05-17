const mongoose = require("mongoose");
// @TODO: Fill in with more attributes, add a reference to the appointment

const employeeSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("empolyee", employeeSchema);
