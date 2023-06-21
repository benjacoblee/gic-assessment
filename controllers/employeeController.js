const Employee = require("../models/employee");
const Cafe = require("../models/cafe");
const { createUID, getEmployeesByDaysWorked } = require("../utils/employee");

const getEmployees = async (req, res) => {
  const { cafe: cafeId } = req.query;

  try {
    if (cafeId) {
      const employees = await Employee.find({ cafe: cafeId }).lean();
      return res.status(200).json(getEmployeesByDaysWorked(employees));
    }

    const employees = await Employee.find({}).lean();
    return res.status(200).json(getEmployeesByDaysWorked(employees));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const createEmployee = async (req, res) => {
  const { name, email_address, phone_number, gender, cafe_id } = req.body;
  const employeeData = {
    _id: createUID(),
    name,
    email_address,
    phone_number,
    gender
  };
  try {
    const cafe = await Cafe.findById(cafe_id);
    const employee = await Employee.create(employeeData);
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

const updateEmployee = (req, res) => {
  // TODO: logic to update an employee
};

const deleteEmployee = (req, res) => {
  // TODO: logic to delete an employee
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
