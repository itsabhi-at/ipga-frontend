"use client";
import { useState } from "react";
import Image from "next/image";
// import filterIcon from "@/app/assets/filterIcon.svg";
import { AiFillFilter } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
export const BrandDropdownButton = ({ options, handleCallBack }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    handleCallBack(option);
    setIsOpen(false); // Close the dropdown after selection (optional)
  };

  return (
    <div className="relative">
      <button
        className="pl-6 py-0 rounded-2xl dark:text-[#F0EDFF] text-[#3a3a3a] w-fit font-medium text-xs flex items-center gap-2 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center capitalize">{selectedOption}</div>

        <div className="h-3 w-4 relative">
          {/* <Image fill className="object-contain" src={filterIcon} alt="" /> */}
          <FaFilter />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute mt-2 py-1 bg-white border rounded-md shadow w-full font-medium text-xs z-40 max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionChange(option)}
              className="block px-2 py-2 cursor-pointer hover:bg-gray-200 capitalize"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export const CalenderDropdownButton = ({
  options,
  currentMonthAbbreviation,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    currentMonthAbbreviation
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection (optional)
  };

  return (
    <div className="relative hidden">
      <button
        className="pl-6 py-0 rounded-2xl text-[#F0EDFF] w-fit font-medium text-xs flex items-center gap-2 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">{selectedOption}</div>

        <div className="h-4 w-4 relative">
          <Image fill className="object-contain" src={filterIcon} alt="" />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute mt-2 py-1 bg-white border rounded-md shadow w-full font-medium text-xs z-40 max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionChange(option)}
              className="block px-2 py-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
