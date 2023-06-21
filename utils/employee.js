const { nanoid } = require("nanoid");
const {
  EMPLOYEE_PREFIX,
  EMPLOYEE_UID_LENGTH,
  ALPHA_NUMERIC
} = require("../constants/index");

const createUID = () => {
  const UID = nanoid(EMPLOYEE_UID_LENGTH, ALPHA_NUMERIC);
  return EMPLOYEE_PREFIX + UID;
};

const getEmployeesByDaysWorked = (employees) =>
  employees
    .map((employee) => {
      const { start_date } = employee;

      if (start_date) {
        const oneDay = 24 * 60 * 60 * 1000;
        const differenceInTime = new Date().getTime() - start_date.getTime();
        const differenceInDays = Math.round(
          Math.abs(differenceInTime / oneDay)
        );
        employee.daysWorked = differenceInDays;
      } else {
        employee.daysWorked = 0;
      }

      return employee;
    })
    .sort((a, b) => b.daysWorked - a.daysWorked);

module.exports = { createUID, getEmployeesByDaysWorked };
