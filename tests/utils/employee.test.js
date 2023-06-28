const { EMPLOYEE_PREFIX, EMPLOYEE_UID_LENGTH } = require("../../constants");
const { createUID, getEmployeesByDaysWorked } = require("../../utils/employee");

describe("# employee utils", () => {
  describe("# createUID", () => {
    it("should start with 'UI'", () => {
      const UID = createUID();

      expect(UID.startsWith(EMPLOYEE_PREFIX)).toBe(true);
    });

    it("should be 9 chars in length", () => {
      const UID = createUID();

      expect(UID.length).toBe(EMPLOYEE_PREFIX.length + EMPLOYEE_UID_LENGTH);
    });
  });

  describe("# getEmployeesByDaysWorked", () => {
    it("should return an array of employees with the days_worked field", () => {
      const employees = [
        {
          start_date: new Date("2022-03-03")
        },
        {
          start_date: new Date("1970-01-01")
        }
      ];
      const employeesByDaysWorked = getEmployeesByDaysWorked(employees);

      for (const employee of employeesByDaysWorked) {
        expect(employee.days_worked).toBeTruthy();
      }
    });
  });
});
