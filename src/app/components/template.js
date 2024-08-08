import React from "react";

// eslint-disable-next-line react/display-name
const Template = React.forwardRef(({ name, organization, regId }, ref) => (
  <div className="hidden">
    <div
      ref={ref}
      className="print-container flex flex-col items-center justify-center"
    >
      {/* <h1>Profile Information</h1> */}
      <p>{name}</p>
      <p>{organization}</p>
      <p>{regId}</p>
    </div>
  </div>
));

export default Template;
