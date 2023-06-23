const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const { VALID_EMPLOYEE_GENDERS } = require("../constants/index");
const { isValidPhoneNumber } = require("../validators");

const employeeSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true,
    validate: {
      validator: (val) => validator.isEmail(val)
    }
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: (val) => isValidPhoneNumber(val)
    }
  },
  gender: {
    type: String,
    required: true,
    enum: VALID_EMPLOYEE_GENDERS
  },
  cafe: {
    type: String,
    ref: "Cafe"
  },
  start_date: {
    type: Date
  }
});
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
