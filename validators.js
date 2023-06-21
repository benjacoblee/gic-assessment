const {
  VALID_STARTING_PHONE_NUMBERS,
  PHONE_NUMBER_LENGTH,
  VALID_EMPLOYEE_GENDERS
} = require("./constants");

const isValidPhoneNumber = (phoneNumber) => {
  const firstChar = phoneNumber[0];
  return (
    VALID_STARTING_PHONE_NUMBERS.includes(firstChar) &&
    phoneNumber.length === PHONE_NUMBER_LENGTH
  );
};

const isValidGender = (gender) => VALID_EMPLOYEE_GENDERS.includes(gender);

module.exports = { isValidPhoneNumber, isValidGender };
