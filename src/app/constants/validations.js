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
export function validatePassport(passportNumber) {
  // Regular expression to check if the input is a valid Indian passport number
  const passportRegex = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;

  // Test the input against the regex
  if (passportRegex.test(passportNumber)) {
    return true;
  } else {
    return false;
  }
}
export const validateMobileNumber = (value) => {
  const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
  return phoneRegex.test(value);
};
