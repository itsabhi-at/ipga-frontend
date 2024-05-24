import React, { useState } from "react";
import classNames from "classnames";

const ToggleButton = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleButtonClasses = classNames(
    "relative inline-block w-[30px] h-[18px] rounded-full transition duration-300 ease-in-out",
    {
      "bg-gray-300": !isActive,
      "bg-green-400": isActive,
    }
  );

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <button className={toggleButtonClasses} onClick={handleToggle}>
      <span
        className={classNames(
          "inline-block relative -left-[10px] w-4 h-4 rounded-full bg-white shadow transform transition duration-300 ease-in-out",
          {
            "translate-x-4": isActive,
            "translate-x-0": !isActive,
          }
        )}
      ></span>
    </button>
  );
};

export default ToggleButton;
