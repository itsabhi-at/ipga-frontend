import React from "react";

function CheckboxInputField({ name, htmlFor, labelText, handleInputChange }) {
  return (
    <div className="flex">
      <input
        onChange={handleInputChange}
        type="checkbox"
        name={name}
        id={name}
        className="mr-2"
      />
      <label className="font-medium text-[10px] text-white" htmlFor={htmlFor}>
        {labelText}
      </label>
    </div>
  );
}

export default CheckboxInputField;
