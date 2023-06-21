const mongoose = require("mongoose");
const { Schema } = mongoose;

const cafeSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  employees: [
    {
      type: String,
      ref: "Employee"
    }
  ]
});
const Cafe = mongoose.model("Cafe", cafeSchema, "cafes");

module.exports = Cafe;
