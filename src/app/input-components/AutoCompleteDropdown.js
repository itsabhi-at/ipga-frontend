"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { toast } from "react-toastify";
import Image from "next/image";
import { useGetCallWithAuthMutation } from "../services/universalApi";

const AutoCompleteDropdown = ({
  labelText,
  htmlFor,
  placeholderImage,
  isFieldRequired,
  validationFunctionName,
  isSubmitted,
  initialSelected,
  onSelect,
  inputThree,
  onInitialization,
  endPoint,
  errorMessage,
}) => {
  let accessToken = null;
  typeof window !== "undefined"
    ? (accessToken = localStorage.getItem("accessToken"))
    : null;
  let domain = null;
  typeof window !== "undefined"
    ? (domain = localStorage.getItem("domain_url"))
    : null;
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState(initialSelected);
  const [suggestions, setSuggestions] = useState([]);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  // mutation for data
  const [getCallMutation] = useGetCallWithAuthMutation();

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (inputThree) {
      if (value.length >= 3) {
        // Filter the data based on the user input
        const filteredSuggestions = data.filter((option) =>
          option.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setOpenSuggestion(true);
      } else {
        setOpenSuggestion(false);
        setSuggestions([]);
      }
    } else {
      if (value.length >= 1) {
        // Filter the data based on the user input
        const filteredSuggestions = data.filter((option) =>
          option.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setOpenSuggestion(true);
      } else {
        setOpenSuggestion(false);
        setSuggestions([]);
      }
    }
  };
  const handleSelect = (value, id) => {
    setInputValue(value);
    setSuggestions([]);
    setOpenSuggestion(false);
    onSelect(value, id);
  };
  const handleBlur = () => {
    let value = inputRef.current.value;
    if (!value.trim()) {
      //   toast.error("Field cannot be empty");
      setInputValue(initialSelected);
    }
  };
  const getDataOnChange = async (value) => {
    await getCallMutation({
      endPoint,
      accessToken,
    })
      .unwrap()
      .then((res) => {
        if (res.status == "success") {
          setData(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) => toast.error(e.message));
  };
  useEffect(() => {
    onInitialization(inputValue);
  }, [inputValue]);
  useEffect(() => {
    getDataOnChange();
  }, []);
  useEffect(() => {
    setInputValue(initialSelected);
  }, [initialSelected]);
  return (
    <div className={`relative w-full space-y-2`}>
      <label
        htmlFor={htmlFor}
        style={{
          color: `${
            isSubmitted &&
            !validationFunctionName(inputValue) &&
            isFieldRequired
              ? "border-red-500"
              : ""
          }`,
        }}
        className="text-[14px] text-white"
      >
        {labelText}
        {isFieldRequired ? <span className="tertiary-color-text">*</span> : ""}
      </label>
      <div className="relative">
        <input
          className={`w-full border border-[#FCFCFC29] border-opacity-20 bg-[#FCFCFC29] bg-opacity-20 p-4 pl-12 rounded-lg outline-none text-white text-sm placeholder:text-[#FCFCFC66] placeholder:text-opacity-40 ${
            isSubmitted &&
            !validationFunctionName(inputValue) &&
            isFieldRequired
              ? "border-red-500"
              : ""
          }`}
          name={htmlFor}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
          placeholder="Search..."
        />
        <Image
          height={28}
          width={28}
          className="absolute left-3 top-3 h-7 w-7"
          src={placeholderImage}
          alt={""}
        />
      </div>
      {isSubmitted &&
        !validationFunctionName(inputValue) &&
        isFieldRequired && (
          <p className="text-red-500  relative text-[13px] left-0 top-[-10px]">
            {errorMessage}
          </p>
        )}
      {/* {ifInvalid && (
        <p className="text-red-500  relative text-[13px] left-0 top-[-10px] ">
          {errorMessage}
        </p>
      )} */}

      <AiOutlineCaretDown className="absolute top-3 right-2" />
      {openSuggestion &&
        (suggestions.length > 0 ? (
          <ul className="overflow-auto absolute z-20 top-20 left-0 max-h-40 rounded-b-md bg-[#fff]  text-sm border-2 border-opacity-30 border-[#EE3524] w-full">
            {suggestions.map((option) => (
              <li
                key={option.id}
                className="text-[14px] font-light  text-[#0B1525] p-2 hover:bg-red-300 focus:bg-red-300 cursor-pointer "
                onClick={() => handleSelect(option.name, option.id)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="absolute z-20 top-20 left-0 max-h-40 overflow-auto rounded-b-md bg-[#fff]  text-sm border-2 border-opacity-30 border-[#EE3524] w-full">
            <li
              className="text-[14px] font-light  text-[#0B1525] p-2 hover:bg-red-300 focus:bg-red-300 cursor-pointer "
              onClick={() => {
                // setInputValue("");
                setOpenSuggestion(false);
              }}
            >
              No Data Found
            </li>
          </ul>
        ))}
    </div>
  );
};

export default AutoCompleteDropdown;
