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
