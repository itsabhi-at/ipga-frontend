"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import circle from "@/app/assets/circle.png";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePostCallWithoutAuthMutation } from "@/app/services/universalApi";
import fIcon from "@/app/assets/profile.svg";
import mail from "@/app/assets/mail.svg";
import Modal from "react-modal";
import {
  validateAadhar,
  validateDropDownField,
  validateEmailField,
  validateFileField,
  validatePassport,
  validateTextField,
} from "../constants/validations";

import bgImage from "@/app/assets/bgImage.jpeg";
import { AiOutlineClose } from "react-icons/ai";
import DropdownField from "../input-components/DropdownField";
import TextInputField from "../input-components/TextInputField";
import EmailInputField from "../input-components/EmailInputField";
import FileInputField from "../input-components/FileInputField";
import NumberInputField from "../input-components/NumberInputField";
function Registration() {
  const router = useRouter();
  // mutations here
  const [postLoginDetails] = usePostCallWithoutAuthMutation();
  //states here

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  // handlers here

  const handleMobileInputChange = (e) => {
    setMobileError(false);
    setMobileNumber(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    if (mobileNumber.length === 10 && password.length > 0) {
      setMobileError(false);
      setPasswordError(false);
      postLoginDetails({
        url: "/api/accounts/login",
        body: {
          mobile: mobileNumber,
          password,
        },
      })
        .then((res) => {
          if (res.data.status == 200) {
            router.push("/events");
            localStorage.setItem("accessToken", res.data.data.access);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((e) => toast.error("Error" + e?.statusCode));
    } else {
      mobileNumber.length != 10 ? setMobileError(true) : null;
      password.length < 1 ? setPasswordError(true) : null;
    }
  };
  // useEffect here
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [gstUpload, setGstUpload] = useState("");
  const [isGstPhotoUploaded, setIsGstPhotoUploaded] = useState(false);
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [aadharUpload, setAadharUpload] = useState("");
  const [isAadharUploaded, setIsAadharUploaded] = useState(false);
  const [passportNumber, setPassportNumber] = useState("");
  const [passportUpload, setPassportUpload] = useState("");
  const [isPassportUploaded, setIsPassportUploaded] = useState(false);
  const [address, setAddress] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formOneSubmitted, setFormOneSubmitted] = useState(false);
  const [formTwoSubmitted, setFormTwoSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "gender") setGender(value);
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "email") setEmail(value);
    if (name === "organization") setOrganization(value);
    if (name === "designation") setDesignation(value);
    if (name === "gstUpload") {
      setIsGstPhotoUploaded(true);
      // setAadharFront(event.target.files[0]);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64WithoutPrefix = e.target.result;
          setGstUpload(base64WithoutPrefix);
        };
        reader.readAsDataURL(file);
      }
    }
    if (name === "aadharCardNumber") setAadharCardNumber(value);
    if (name === "aadharUpload") {
      setIsAadharUploaded(true);
      // setAadharFront(event.target.files[0]);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64WithoutPrefix = e.target.result;
          setAadharUpload(base64WithoutPrefix);
        };
        reader.readAsDataURL(file);
      }
    }
    if (name === "passportNumber") setPassportNumber(value);
    if (name === "passportUpload") {
      setIsPassportUploaded(true);
      // setAadharFront(event.target.files[0]);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64WithoutPrefix = e.target.result;
          setPassportUpload(base64WithoutPrefix);
        };
        reader.readAsDataURL(file);
      }
    }
    if (name === "address") setAddress(value);
  };
  const isFieldRequired = (fieldName) => {
    const requiredFields = [
      "gender",
      "firstName",
      "lastName",
      "email",
      "organization",
      "designation",
      "gstUpload",
      "aadharCardNumber",
      "aadharUpload",
      "passportNumber",
      "passportUpload",
      "address",
    ];
    return requiredFields.includes(fieldName);
  };
  const submitForm1 = () => {
    setFormOneSubmitted(true);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setModalIsOpen(true);
    // Perform validation for each input
    const isGenderValid =
      !isFieldRequired("gender") || validateDropDownField(gender);
    const isFirstNameValid =
      !isFieldRequired("firstName") || validateTextField(firstName);
    const isLastNameValid =
      !isFieldRequired("lastName") || validateTextField(lastName);
    const isOrgValid =
      !isFieldRequired("organization") || validateTextField(organization);
    const isDesignationValid =
      !isFieldRequired("designation") || validateTextField(designation);
    const isGstUploadValid =
      !isFieldRequired("gstUpload") || validateFileField(gstUpload);
    const isAadharNumberValid =
      !isFieldRequired("aadharCardNumber") || validateAadhar(aadharCardNumber);
    const isAadharUploadValid =
      !isFieldRequired("aadharUpload") || validateFileField(aadharUpload);
    const isPassportNumberValid =
      !isFieldRequired("passportNumber") || validatePassport(passportNumber);
    const isPassportUploadValid =
      !isFieldRequired("passportUpload") || validateFileField(passportUpload);
    const isAddressValid =
      !isFieldRequired("address") || validateTextField(address);
    // Set overall form validity
    setIsFormSubmitted(true);

    if (
      isGenderValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isOrgValid &&
      isDesignationValid &&
      isGstUploadValid &&
      isAadharNumberValid &&
      isAadharUploadValid &&
      isPassportNumberValid &&
      isPassportUploadValid
    ) {
      console.log(firstName);

      let body = {};

      //   if (isDataFound) {
      //     // make put call
      //     await putCallMutation({
      //       domain: domain,
      //       accessToken,
      //       endPoint: "user-profile/update",
      //       body,
      //     })
      //       .unwrap()
      //       .then((res) => {
      //         if (res.status == "success") {
      //           router.push("/onboarding/bankdetails/");
      //         } else {
      //           toast.error(res.message);
      //         }
      //       })
      //       .catch((e) => toast.error(e.message));
      //   } else {
      //     // make post call
      //     await postCallMutation({
      //       domain: domain,
      //       accessToken,
      //       endPoint: "user-profile",
      //       body,
      //     })
      //       .unwrap()
      //       .then((res) => {
      //         if (res.status == "success") {
      //           router.push("/onboarding/bankdetails/");
      //         } else {
      //           toast.error(res.message);
      //         }
      //       })
      //       .catch((e) => toast.error(e.message));
      //   }
    } else {
      console.log("Form Not Valid");
      //   if (!tnc) {
      //     toast.info("Please agree to the Terms of Service");
      //   }
    }
  };
  return (
    <main className="h-auto md:h-screen md:bg-white bg-[#F3F5F8] min-h-screen relative">
      <div className="md:flex h-full w-full relative z-30">
        <div className="flex-1 w-full h-full bg-transparent p-4 flex flex-col ">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full bg-black"></div>
              <h1 className="text-white font-medium">IPGA UI</h1>
            </div>
            <button
              onClick={() => {
                // router.push("/");
              }}
              className="bg-[#373737] hover:bg-[#000000] rounded-md text-white px-4 py-2 hover:text-white"
            >
              Logout
            </button>
          </div>

          <div className="h-full max-h-[70vh] md:max-h-[84vh] w-full md:flex items-center justify-center overflow-auto my-4 md:my-0">
            {!modalIsOpen && (
              <div className="bg-white bg-opacity-70 md:h-[80%] md:w-[50%] rounded-lg p-4 text-black">
                <div className="w-full flex flex-col justify-center items-center">
                  <h1 className="text-2xl text-black font-medium">Welcome</h1>
                  <p className=" text-black py-4">
                    Please Enter Registration Details
                  </p>
                  <form
                    action=""
                    className={`my-4 transition-all duration-500 ease-in-out transform w-full ${
                      formOneSubmitted
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <DropdownField
                      labelText={"Gender"}
                      placeholder={"Please Select Gender"}
                      htmlFor={"gender"}
                      name={"gender"}
                      value={gender}
                      placeholderImage={fIcon}
                      errorMessage={"Gender is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateDropDownField}
                      isFieldRequired={isFieldRequired("gender")}
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                      isSubmitted={isFormSubmitted}
                    />
                    <TextInputField
                      labelText={"Enter your First Name"}
                      placeholder={"First Name"}
                      htmlFor={"firstName"}
                      name={"firstName"}
                      value={firstName}
                      placeholderImage={fIcon}
                      errorMessage={"First Name is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("firstName")}
                      isSubmitted={isFormSubmitted}
                    />
                    <TextInputField
                      labelText={"Enter your Last Name"}
                      placeholder={"Last Name"}
                      htmlFor={"lastName"}
                      name={"lastName"}
                      value={lastName}
                      placeholderImage={fIcon}
                      errorMessage={"Last Name is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("lastName")}
                      isSubmitted={isFormSubmitted}
                    />
                    <EmailInputField
                      labelText={"Enter your Email"}
                      placeholder={"Email Address"}
                      htmlFor={"email"}
                      name={"email"}
                      value={email}
                      placeholderImage={mail}
                      errorMessage={"Email is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateEmailField}
                      isFieldRequired={isFieldRequired("email")}
                      isSubmitted={isFormSubmitted}
                    />

                    <TextInputField
                      labelText={"Enter your Organization"}
                      placeholder={"Organization"}
                      htmlFor={"organization"}
                      name={"organization"}
                      value={organization}
                      placeholderImage={fIcon}
                      errorMessage={"Organization Name is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("organization")}
                      isSubmitted={isFormSubmitted}
                    />
                    <TextInputField
                      labelText={"Enter your Designation"}
                      placeholder={"Designation"}
                      htmlFor={"designation"}
                      name={"designation"}
                      value={designation}
                      placeholderImage={fIcon}
                      errorMessage={"Designation Name is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("designation")}
                      isSubmitted={isFormSubmitted}
                    />
                    <FileInputField
                      labelText={"GST No. Upload (Indian Delegates)"}
                      placeholder={"Upload GST No."}
                      placeholderImage={fIcon}
                      htmlFor={"gstUpload"}
                      name={"gstUpload"}
                      value={gstUpload}
                      validationFunctionName={validateFileField}
                      handleInputChange={handleInputChange}
                      isFieldRequired={isFieldRequired("gstUpload")}
                      photoUploaded={isGstPhotoUploaded}
                      isSubmitted={isFormSubmitted}
                      errorMessage={"Field is required"}
                    />
                    <NumberInputField
                      labelText={"Aadhar Card Number (Indian Delegates)"}
                      placeholder={"Enter your Aadhar Card Number"}
                      htmlFor={"aadharCardNumber"}
                      name={"aadharCardNumber"}
                      value={aadharCardNumber}
                      placeholderImage={fIcon}
                      errorMessage={"Aadhar Card is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateAadhar}
                      isFieldRequired={isFieldRequired("aadharCardNumber")}
                      isSubmitted={isFormSubmitted}
                      maxLength={12}
                    />
                    <FileInputField
                      labelText={"Aadhar Card Upload (Indian Delegates)"}
                      placeholder={"Upload Aadhar Card"}
                      placeholderImage={fIcon}
                      htmlFor={"aadharUpload"}
                      name={"aadharUpload"}
                      value={aadharUpload}
                      validationFunctionName={validateFileField}
                      handleInputChange={handleInputChange}
                      isFieldRequired={isFieldRequired("aadharUpload")}
                      photoUploaded={isAadharUploaded}
                      isSubmitted={isFormSubmitted}
                      errorMessage={"Field is required"}
                    />
                    <NumberInputField
                      labelText={"Passport Number (International Delegates)"}
                      placeholder={"Enter your Passport Number"}
                      htmlFor={"passportNumber"}
                      name={"passportNumber"}
                      value={passportNumber}
                      placeholderImage={fIcon}
                      errorMessage={"Passport Number is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validatePassport}
                      isFieldRequired={isFieldRequired("passportNumber")}
                      isSubmitted={isFormSubmitted}
                    />
                    <FileInputField
                      labelText={"Passport Upload (International Delegates)"}
                      placeholder={"Upload Passport"}
                      placeholderImage={fIcon}
                      htmlFor={"passportUpload"}
                      name={"passportUpload"}
                      value={passportUpload}
                      validationFunctionName={validateFileField}
                      handleInputChange={handleInputChange}
                      isFieldRequired={isFieldRequired("passportUpload")}
                      photoUploaded={isPassportUploaded}
                      isSubmitted={isFormSubmitted}
                      errorMessage={"Field is required"}
                    />
                    <TextInputField
                      labelText={"Enter your Complete Address"}
                      placeholder={"address"}
                      htmlFor={"address"}
                      name={"address"}
                      value={address}
                      placeholderImage={fIcon}
                      errorMessage={"Address is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("address")}
                      isSubmitted={isFormSubmitted}
                    />
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-full bg-[#404a3d] text-white rounded-md py-2 my-4 font-medium text-sm"
                    >
                      Next
                    </button>

                    {/* <button className="w-full bg-white rounded-md py-2 mb-4 border border-gray-500 text-gray-500 font-medium flex items-center justify-center gap-4 text-sm">
                  <FcGoogle />
                  Sign in With Google
                </button> */}
                  </form>

                  {/* <p className="text-white text-center text-[15px]">
              Don&apos;t have an account?{" "}
              <Link href={"/dashboard"}>
                <span className="text-purple-700">Sign Up</span>
              </Link>
            </p> */}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <h1 className=" text-gray-400 font-medium text-sm my-2">IPGA</h1>
          </div>
        </div>
        {/* <div className="flex-1 w-full h-full md:flex hidden bg-[#F3F5F8]  items-center justify-center relative">
          <Image
            src={circle}
            height={400}
            width={400}
            alt="circle"
            loading="eager"
            priority={true}
          />
        </div> */}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Custom Modal"
        className="custom-modal h-[60%] w-[60%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        // style={customStyles}
        overlayClassName={"product-modal"}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY border border-[#fcfcfc] border-opacity-[16%] bg-white bg-opacity-70  h-[100%] overflow-x-auto w-[100%] rounded-lg py-4 px-4 space-y-2 relative">
            <div
              className="h-8 w-8 bg-white rounded-md flex items-center justify-center absolute right-0 top-0"
              onClick={() => setModalIsOpen(false)}
            >
              <AiOutlineClose className="text-xl text-black" />
            </div>
            <div className="flex flex-col w-full items-center justify-center">
              <p className="text-[18px] text-black font-medium mb-8">
                Delegate
              </p>
              <div className="w-1/2 space-y-4">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor=""
                    className="text-[#000] text-[14px] block mb-2"
                  >
                    Enter Delegate Code
                  </label>
                  <input
                    placeholder="Delegate Code If Any?"
                    className="w-full p-2 outline-none border border-[#000] rounded-md mb-2 text-[15px] text-[#000] bg-transparent placeholder:text-gray-600"
                    type="email"
                  />
                </div>

                <div className="flex items-center justify-end text-black font-semibold">
                  Total Price : 3540
                </div>
                <div className="flex items-center justify-end text-black font-semibold">
                  <button
                    onClick={() => {
                      // router.push("/");
                    }}
                    className="bg-[#373737] hover:bg-[#000000] rounded-md text-white px-4 py-2 hover:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </main>
  );
}

export default Registration;
