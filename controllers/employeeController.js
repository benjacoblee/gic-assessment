const validator = require("validator");
const Employee = require("../models/employee");
const Cafe = require("../models/cafe");
const { createUID, getEmployeesByDaysWorked } = require("../utils/employee");
const { isValidPhoneNumber, isValidGender } = require("../validators");

const getEmployees = async (req, res) => {
  const { cafe: cafeId } = req.query;

  try {
    if (cafeId) {
      const employees = await Employee.find({ cafe: cafeId })
        .populate("cafe", "name")
        .lean();
      return res.status(200).json(getEmployeesByDaysWorked(employees));
    }

    const employees = await Employee.find({}).populate("cafe", "name").lean();
    return res.status(200).json(getEmployeesByDaysWorked(employees));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const createEmployee = async (req, res) => {
  const { name, email_address, phone_number, gender, cafe_id } = req.body;

  try {
    const cafe = await Cafe.findById(cafe_id);
    const employee = await Employee.create({
      _id: createUID(),
      name,
      email_address,
      phone_number,
      gender
    });
    if (cafe) {
      cafe.employees.push(employee);
      employee.cafe = cafe._id;
      employee.start_date = new Date();
      await cafe.save();
      await employee.save();
    }
    return res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const updateEmployee = async (req, res) => {
  const {
    _id: employeeId,
    name,
    email_address,
    phone_number,
    gender,
    cafe: cafeId
  } = req.body;
  const employee = await Employee.findOne({ _id: employeeId });
  const errors = [];

  if (email_address && !validator.isEmail(email_address)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address"
    });
  }
  if (phone_number && !isValidPhoneNumber(phone_number)) {
    errors.push({
      field: "phone_number",
      message: "Please provide a valid phone number"
    });
  }
  if (gender && !isValidGender(gender)) {
    errors.push({
      field: "gender",
      message: "Please provide a valid gender"
    });
  }

  try {
    if (errors.length) {
      throw new Error("An error occurred");
    }

    const oldCafe = await Cafe.findOne({ _id: employee.cafe });
    const newCafe = await Cafe.findOne({ _id: cafeId });
    const isAssignedCafe = !!oldCafe;
    const newCafeExists = !!newCafe;

    if (cafeId) {
      if (isAssignedCafe && newCafeExists) {
        oldCafe.employees = oldCafe.employees.filter(
          (employee) => employee !== employeeId
        );
        newCafe.employees.push(employeeId);

        await oldCafe.save();
        await newCafe.save();
        await Employee.findOneAndUpdate(
          { _id: employeeId },
          { cafe: newCafe._id, start_date: new Date() }
        );
      } else if (newCafeExists) {
        newCafe.employees.push(employeeId);
        await newCafe.save();
        await Employee.findOneAndUpdate(
          { _id: employeeId },
          { cafe: newCafe._id, start_date: new Date() }
        );
      }
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: employeeId },
      {
        name,
        email_address,
        phone_number,
        gender
      },
      { new: true }
    );

    return res.status(200).json(updatedEmployee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message, errors });
  }
};

const deleteEmployee = async (req, res) => {
  const { _id: employeeId } = req.body;

  try {
    const employee = await Employee.findByIdAndDelete({ _id: employeeId });
    const cafe = await Cafe.findOne({ _id: employee.cafe });

    if (cafe) {
      cafe.employees = cafe.employees.filter(
        (employee) => employee !== employeeId
      );
      await cafe.save();
    }

    return res.json(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
