import Image from "next/image";
import React, { useEffect, useState } from "react";

const DropdownField = ({
  labelText,
  labelColor,
  errorMessage,
  placeholder,
  isFieldRequired,
  placeholderImage,
  htmlFor,
  name,
  value,
  handleInputChange,
  isSubmitted,
  validationFunctionName,
  options,
}) => {
  const [ifInvalid, setIfInvalid] = useState(false);
  useEffect(() => {
    if (value?.length > 0 && validationFunctionName(value) === true) {
      setIfInvalid(false);
    }
  }, [validationFunctionName, value]);
  return (
    <div className="relative space-y-2">
      <label
        htmlFor={htmlFor}
        style={{
          color: `${
            isSubmitted && !validationFunctionName(value) && isFieldRequired
              ? "border-red-500"
              : labelColor
          }`,
        }}
        className="text-black text-[14px] block"
      >
        {labelText}
        {isFieldRequired ? <span className="tertiary-color-text">*</span> : ""}
      </label>
      <div className="relative">
        <select
          required={isFieldRequired}
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onInvalid={(e) => {
            e.preventDefault();
            setIfInvalid(true);
            e.target.setCustomValidity("");
          }}
          onInput={(e) => {
            if (
              isSubmitted &&
              !validationFunctionName(value) &&
              isFieldRequired
            ) {
              setIfInvalid(false);
            }
          }}
          className={` first:text-[#000000] p-2 pl-9 outline-none border border-gray-300 rounded-md mb-2 w-full text-[15px] text-black ${
            (isSubmitted &&
              !validationFunctionName(value) &&
              isFieldRequired) ||
            ifInvalid
              ? "border-red-500"
              : ""
          }`}
        >
          <option value="" className="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          className="absolute left-[12px] top-[10px]"
          height={12}
          width={16}
          src={placeholderImage}
          alt={""}
        />
      </div>

      {isSubmitted && !validationFunctionName(value) && isFieldRequired && (
        <p className="text-red-500  relative text-[13px] left-0 top-[-10px]">
          {errorMessage}
        </p>
      )}
      {ifInvalid && (
        <p className="text-red-500  relative text-[13px] left-0 top-[-10px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DropdownField;
