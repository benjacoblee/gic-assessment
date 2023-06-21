const Cafe = require("../models/cafe");
const Employee = require("../models/employee");
const cafeData = require("./cafeData");
const employeeData = require("./employeeData");

const deleteDocuments = async () => {
  await Cafe.deleteMany({});
  console.log("Purging db...");
  await Employee.deleteMany({});
  console.log("Documents deleted");
};

const createCafes = async () => {
  try {
    for (const cafe of cafeData) {
      await Cafe.create(cafe);
    }
  } catch (err) {
    console.log(err);
  }

  console.log("Created cafes");
};

const createEmployees = async () => {
  const cafes = await Cafe.find({});
  const shouldAssignCafe = () => Math.random() < 0.5;

  try {
    for (const _employee of employeeData) {
      const employee = await Employee.create(_employee);
      if (shouldAssignCafe()) {
        const randomStartDate = (start, end) => {
          return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
          );
        };

        const cafe = cafes[Math.floor(Math.random() * cafes.length)];
        cafe.employees.push(employee);
        employee.cafe = cafe._id;
        employee.start_date = randomStartDate(
          new Date("2012-01-01"),
          new Date()
        );
        await cafe.save();
        await employee.save();
      }
    }
  } catch (err) {
    console.log(err);
  }

  console.log("Created employees");
};

const seed = async () => {
  await deleteDocuments();
  await createCafes();
  await createEmployees();
};

module.exports = { seed };
