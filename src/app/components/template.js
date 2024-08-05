import React from "react";

// eslint-disable-next-line react/display-name
const Template = React.forwardRef(({ name, organization }, ref) => (
  <div className="hidden">
    <div
      ref={ref}
      className="print-container flex flex-col items-center justify-center"
    >
      {/* <h1>Profile Information</h1> */}
      <p>Name: {name}</p>
      <p>Organization: {organization}</p>
    </div>
  </div>
));

export default Template;
