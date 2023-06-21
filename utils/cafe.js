const mapCafeEmployeesToNum = (cafes) =>
  cafes
    .map((cafe) => {
      return { ...cafe, employees: cafe.employees.length };
    })
    .sort((a, b) => b.employees - a.employees);

module.exports = { mapCafeEmployeesToNum };
