export const validateTextField = (value) => {
  return value.trim().length > 0;
};
export const validateEmailField = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
export const validateDropDownField = (value) => {
  if (value === "") {
    return false;
  }
  return true;
};
export const validateFileField = (value) => {
  if (value != "") {
    return true;
  } else {
    return false;
  }
};
export function validateAadhar(aadharNumber) {
  // Regular expression to check if the input is a 12-digit number
  const aadharRegex = /^\d{12}$/;

  // Test the input against the regex
  if (aadharRegex.test(aadharNumber)) {
    return true;
  } else {
    return false;
  }
}
