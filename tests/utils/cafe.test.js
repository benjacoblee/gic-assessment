const { mapCafeEmployeesToNum } = require("../../utils/cafe");

describe("# cafe utils", () => {
  describe("# mapCafeEmployeesToNum", () => {
    it("should return an array of cafe with employees sorted by number", () => {
      const cafes = [
        {
          employees: new Array(3)
        },
        {
          employees: new Array(1)
        },
        {
          employees: new Array(10)
        }
      ];

      const cafesByEmployees = mapCafeEmployeesToNum(cafes);
      expect(cafesByEmployees[0].employees).toBe(10);
      expect(
        cafesByEmployees[0].employees > cafesByEmployees[1].employees
      ).toBe(true);
    });
  });
});
