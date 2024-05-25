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
        className="text-black text-[14px] block"
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
          className={`p-2 pl-10 outline-none border border-gray-300 rounded-md mb-2 w-full text-[15px] text-black  ${
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
          className="absolute left-[12px] top-[10px]"
          height={12}
          width={16}
          src={placeholderImage}
          alt={""}
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
