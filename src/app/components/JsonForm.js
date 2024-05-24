import React from "react";
// import Form from "react-jsonschema-form";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
const JsonForm = ({ schema, uiSchema, formData, onSubmit }) => {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      validator={validator}
      onChange={console.log("changed")}
      onSubmit={console.log("submitted")}
      onError={console.log("errors")}
    />
  );
};

export default JsonForm;
