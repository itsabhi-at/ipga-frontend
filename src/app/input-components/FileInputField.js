import Image from "next/image";
import React, { useEffect, useState } from "react";

function FileInputField({
  htmlFor,
  labelText,
  isFieldRequired,
  placeholder,
  name,
  value,
  handleInputChange,
  placeholderImage,
  errorMessage,
  isSubmitted,
  validationFunctionName,
  photoUploaded,
  darkField,
}) {
  const [ifInvalid, setIfInvalid] = useState(false);

  useEffect(() => {
    if (value != "" && validationFunctionName(value) === true) {
      setIfInvalid(false);
    }
  }, [validationFunctionName, value]);
  return (
    <div className="relative space-y-2">
      <label className="text-white text-sm" htmlFor={htmlFor}>
        {labelText}
        {isFieldRequired ? <span className="tertiary-color-text">*</span> : ""}
      </label>
      <div className="relative">
        <div
          className={` absolute left-0 top-0 rounded-lg  pointer-events-none  w-full p-4 pl-12  border-[#FCFCFC29] border-opacity-20 text-sm ${
            darkField
              ? "bg-[#d9d9d9] bg-opacity-10"
              : "bg-[#FCFCFC29] bg-opacity-20 border"
          }`}
        >
          {photoUploaded || value != "" ? (
            <span className="text-white">File Uploaded Successfully</span>
          ) : (
            <span className="text-white">Upload File</span>
          )}
        </div>
        <input
          type="file"
          name={name}
          id={name}
          onChange={handleInputChange}
          placeholder={placeholder}
          // value={value}
          className={`w-full border border-[#FCFCFC29] border-opacity-20 p-4 pl-12 rounded-lg outline-none text-sm placeholder:text-[#FCFCFC66] placeholder:text-opacity-40 opacity-0 ${
            (isSubmitted &&
              !validationFunctionName(value) &&
              isFieldRequired) ||
            ifInvalid
              ? "border-red-500"
              : ""
          }`}
          required={isFieldRequired}
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
        />

        <Image
          height={28}
          width={28}
          className="absolute left-3 top-3 h-7 w-7"
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
        <p className="text-red-500  relative text-[13px] left-0 top-[-10px] ">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default FileInputField;
