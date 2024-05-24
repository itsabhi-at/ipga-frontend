// // components/FormAccordion.js
// "use client";
// import React, { useState } from "react";
// import JsonForm from "./JsonForm";

// const FormAccordion = ({ options, schemas }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     console.log(schemas[option]);
//   };
//   const schemaArray = Object.values(schemas);
//   const formData = {
//     "Option A": {
//       fieldA: "abhishek",
//     },
//     "Option B": {
//       fieldB: "tomar",
//       fieldC: 0,
//     },
//   };

//   console.log(schemaArray);
//   return (
//     <div>
//       <select onChange={(e) => handleOptionChange(e.target.value)}>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       {selectedOption && schemas[selectedOption] && (
//         <div>
//           {/* {schemaArray.map((schema, index) => (
//             <div key={index}>
//               <JsonForm
//                 schema={schema}
//                 formData={formData[selectedOption]}
//                 onSubmit={console.log("submit")}
//               />
//             </div>
//           ))} */}
//           <JsonForm
//             schema={schemas[selectedOption]}
//             formData={formData[selectedOption]}
//             onSubmit={console.log("submit")}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormAccordion;

// DynamicForm.js
"use client";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import fIcon from "@/app/assets/icons/firstNameIcon.svg";
import Image from "next/image";
export default function DynamicForm({ apiData, onSubmitCallback }) {
  const [formSchema, setFormSchema] = useState({});

  // Initialize form fields and validation schema
  useEffect(() => {
    const initialValues = {};
    const validationSchema = {};

    apiData.forEach(({ form_field }) => {
      initialValues[form_field.id] = "";
      if (form_field.is_mandatory) {
        validationSchema[form_field.id] = Yup.string().required(
          `${form_field.label} is required`
        );
      }
    });

    setFormSchema({
      initialValues,
      validationSchema: Yup.object().shape(validationSchema),
    });
  }, [apiData]);

  const onSubmit = (values) => {
    // Format the values for submission
    const responses = Object.keys(values).map((key) => ({
      id: key,
      response: values[key],
    }));
    // console.log(responses);
    onSubmitCallback(responses);
    // Send responses to the server
  };

  return (
    <Formik
      initialValues={formSchema.initialValues}
      validationSchema={formSchema.validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched }) => (
        <Form className="space-y-2 last:space-y-4">
          {apiData.map(({ form_field }) => {
            const isError = touched[form_field.id] && errors[form_field.id];
            return (
              <div key={form_field.id} className="relative space-y-2">
                <label
                  htmlFor={form_field.id}
                  className="text-[14px] text-white"
                >
                  {form_field.label}
                  <span className="tertiary-color-text">
                    {" "}
                    {form_field.is_mandatory ? " *" : ""}
                  </span>
                </label>
                <div className="relative">
                  <Field
                    className={` ${
                      isError ? "border-red-400" : ""
                    } w-full border border-[#FCFCFC29] border-opacity-20 bg-[#FCFCFC29] bg-opacity-20 p-4 pl-12 rounded-lg outline-none text-white text-sm placeholder:text-[#FCFCFC66] placeholder:text-opacity-40`}
                    name={form_field.id}
                    type={
                      form_field.field_type === "textarea"
                        ? "text"
                        : form_field.field_type
                    }
                    as={
                      form_field.field_type === "textarea"
                        ? "textarea"
                        : "input"
                    }
                  />
                  <Image
                    className="absolute left-3 top-3 h-7 w-7"
                    src={fIcon}
                    alt={""}
                  />
                </div>

                <ErrorMessage
                  name={form_field.id}
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            );
          })}
          <button
            className=" bg-gradient-to-tr from-[#F8F181] via-[#EDC740] to-[#F1D343] text-black  h-12 w-full rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
