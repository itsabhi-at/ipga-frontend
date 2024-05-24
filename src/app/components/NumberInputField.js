import Image from "next/image";
import { useEffect, useState } from "react";
export default function NumberInputField({
  labelText,
  errorMessage,
  labelColor,
  placeholder,
  placeholderImage,
  name,
  value,
  htmlFor,
  handleInputChange,
  isSubmitted,
  validationFunctionName,
  isFieldRequired,
  maxLength,
}) {
  const [ifInvalid, setIfInvalid] = useState(false);
  useEffect(() => {
    if (value?.length > 0) {
      setIfInvalid(false);
    }
  }, [value]);
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
        className="text-[14px] text-white"
      >
        {labelText}
        {isFieldRequired ? <span className="tertiary-color-text">*</span> : ""}
      </label>
      <div className="relative">
        <input
          maxLength={maxLength ? maxLength : 10}
          type="tel"
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
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
          className={`w-full border border-[#FCFCFC29] border-opacity-20 bg-[#FCFCFC29] bg-opacity-20 p-4 pl-12 rounded-lg outline-none text-white text-sm placeholder:text-[#FCFCFC66] placeholder:text-opacity-40 ${
            (isSubmitted &&
              !validationFunctionName(value) &&
              isFieldRequired) ||
            ifInvalid
              ? "border-red-500"
              : ""
          }`}
          required={isFieldRequired}
        />
        <Image
          height={28}
          width={28}
          src={placeholderImage}
          alt=""
          className="absolute left-3 top-3 h-7 w-7"
        />
      </div>

      {isSubmitted && !validationFunctionName(value) && isFieldRequired && (
        <p className="text-red-500  relative text-[13px] left-0 top-[-10px] ">
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
}
