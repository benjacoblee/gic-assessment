const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const {
  VALID_STARTING_PHONE_NUMBERS,
  PHONE_NUMBER_LENGTH
} = require("../constants/index");

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
      validator: (val) => {
        return validator.isEmail(val);
      }
    }
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        const firstChar = val[0];
        return (
          VALID_STARTING_PHONE_NUMBERS.includes(firstChar) &&
          val.length === PHONE_NUMBER_LENGTH
        );
      }
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
  cafe: {
    type: String,
    ref: "cafe"
  },
  start_date: {
    type: Date
  }
});
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
