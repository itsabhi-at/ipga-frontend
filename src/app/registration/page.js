"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcCheckmark, FcGoogle } from "react-icons/fc";
import circle from "@/app/assets/circle.png";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  usePostCallWithAuthMutation,
  usePostCallWithoutAuthMutation,
  usePutCallWithAuthMutation,
} from "@/app/services/universalApi";
import fIcon from "@/app/assets/profile.svg";
import mail from "@/app/assets/mail.svg";
import Modal from "react-modal";
import {
  validateAadhar,
  validateDropDownField,
  validateEmailField,
  validateFileField,
  validateMobileNumber,
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
import AutoCompleteDropdown from "../input-components/AutoCompleteDropdown";
import { ColorRing } from "react-loader-spinner";
function Registration() {
  const router = useRouter();
  let accessToken = null;
  typeof window !== "undefined"
    ? (accessToken = localStorage.getItem("accessToken"))
    : null;

  // useEffect here
  const [formLoading, setFormLoading] = useState(false);
  const [acceptTnc, setAcceptTnc] = useState(false);
  const [isIndian, setIsIndian] = useState(true);
  const [title, setTitle] = useState("");
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
  const [phone, setPhone] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [primaryPincode, setPrimaryPincode] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [primaryCity, setPrimaryCity] = useState("");
  const [primaryState, setPrimaryState] = useState("");
  const [addressCheck, setAddressCheck] = useState(true);
  const [country, setCountry] = useState({ id: 1, name: "India" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formOneSubmitted, setFormOneSubmitted] = useState(false);
  const [formTwoSubmitted, setFormTwoSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tncModalIsOpen, setTncModalIsOpen] = useState(false);
  const [bankTransferModal, setBankTransferModal] = useState(false);
  const [delegateCode, setDelegateCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [postCallMutation] = usePostCallWithAuthMutation();
  const [putCallMutation] = usePutCallWithAuthMutation();

  const handleInputChange = (event, id, country) => {
    const { name, value } = event.target;
    if (name === "acceptTnc") setAcceptTnc(event.target.checked);
    if (name === "addressCheck") setAddressCheck(event.target.checked);
    if (name === "delegateCode") setDelegateCode(value);
    if (name === "title") setTitle(value);
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

    if (name === "phone") setPhone(value);
    if (name === "businessPhone") setBusinessPhone(value);
    if (name === "mobile") setMobile(value);
    if (name === "pincode") setPincode(value);
    if (name === "address") setAddress(value);
    if (name === "city") setCity(value);
    if (name === "state") setState(value);
    if (name === "primaryPincode") setPrimaryPincode(value);
    if (name === "primaryAddress") setPrimaryAddress(value);
    if (name === "primaryCity") setPrimaryCity(value);
    if (name === "primaryState") setPrimaryState(value);
  };
  const handleAutoCompleteChange = (tag, name, id) => {
    if (tag == "country") {
      setCountry({
        name: name,
        id: id,
      });
    }
  };
  useEffect(() => {
    console.log(country, isIndian);
    country.name == "India" ? setIsIndian(true) : setIsIndian(false);
  }, [country, isIndian]);
  const isFieldRequired = (fieldName) => {
    const requiredFields = [
      "title",
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
      "phone",
      "businessPhone",
      "mobile",
      "pincode",
      "city",
      "state",
      "country",
      "primaryAddress",
      "primaryPincode",
      "primaryCity",
      "primaryState",
    ];
    return requiredFields.includes(fieldName);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    // Perform validation for each input

    const isTitleValid =
      !isFieldRequired("title") || validateDropDownField(title);
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
    const isPhoneValid = !isFieldRequired("phone") || validateTextField(phone);
    const isBusinessPhoneValid =
      !isFieldRequired("businessPhone") || validateTextField(businessPhone);
    const isMobileValid =
      !isFieldRequired("mobile") || validateTextField(mobile);
    const isPincodeValid =
      !isFieldRequired("pincode") || validateTextField(pincode);
    const isCityValid = !isFieldRequired("city") || validateTextField(city);
    const isStateValid = !isFieldRequired("state") || validateTextField(state);
    const isPrimaryAddressValid =
      !isFieldRequired("primaryAddress") || validateTextField(primaryAddress);
    const isPrimaryPincodeValid =
      !isFieldRequired("primaryPincode") || validateTextField(primaryPincode);
    const isPrimaryCityValid =
      !isFieldRequired("primaryCity") || validateTextField(primaryCity);
    const isPrimaryStateValid =
      !isFieldRequired("primaryState") || validateTextField(primaryState);
    const isCountryValid =
      !isFieldRequired("country") || validateTextField(country?.name);
    // Set overall form validity
    setIsFormSubmitted(true);

    if (
      isTitleValid &&
      isGenderValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isOrgValid &&
      isDesignationValid &&
      (isIndian
        ? isAadharNumberValid && isAadharUploadValid
        : isPassportNumberValid && isPassportUploadValid) &&
      // isPhoneValid &&
      isBusinessPhoneValid &&
      isMobileValid &&
      isCountryValid &&
      (!addressCheck
        ? isPrimaryAddressValid &&
          isPrimaryPincodeValid &&
          isPrimaryCityValid &&
          isPrimaryStateValid &&
          isAddressValid &&
          isPincodeValid &&
          isCityValid &&
          isStateValid
        : isAddressValid && isPincodeValid && isCityValid && isStateValid)
    ) {
      let body = {
        title: title,
        first_name: firstName,
        last_name: lastName,
        organization: organization,
        designation,
        gender,
        pincode,
        city,
        state,
        country: country?.id,
        address,
        mobile_number: mobile,
        business_number: businessPhone,
      };

      if (isIndian) {
        body = {
          // gst_file: gstUpload,
          addhar_number: aadharCardNumber,
          aadhar_image: aadharUpload,
          ...body,
        };
      } else {
        body = {
          passport_number: passportNumber,
          passport_file: passportUpload,
          ...body,
        };
      }
      if (!addressCheck) {
        body = {
          is_default_address: false,
          primary_city: primaryCity,
          primary_address: primaryAddress,
          primary_pincode: primaryPincode,
          primary_state: primaryState,
          ...body,
        };
      } else {
        body = {
          is_default_address: true,
          ...body,
        };
      }

      await postCallMutation({
        url: "accounts/details",
        body: body,
        accessToken,
      })
        .unwrap()
        .then((res) => {
          if (res.status == "success") {
            setFormLoading(false);
            setModalIsOpen(true);
          } else {
            setFormLoading(false);
            toast.error(res.message);
          }
        })
        .catch((e) => {
          setFormLoading(false);
          toast.error(e.message);
        });
      // }
    } else {
      debugger;
      setFormLoading(false);
      console.log("Form Not Valid");
      toast.error("Please Fill All Fields Required");
      //   if (!tnc) {
      //     toast.info("Please agree to the Terms of Service");
      //   }
    }
  };
  const handleDelegateVerification = async (event) => {
    // api call to check
    event.preventDefault();
    if (delegateCode.length > 0) {
      await postCallMutation({
        url: "accounts/check-membership",
        body: {
          code: delegateCode,
        },
        accessToken,
      })
        .unwrap()
        .then((res) => {
          if (res.status == "success") {
            setIsCodeValid(res?.data.is_membership);
            toast.success(res?.message);
          } else {
            toast.error(res.message);
          }
        })
        .catch((e) => toast.error(e.message));
    } else {
      toast.error("Code Cannot Be Empty");
    }
  };

  const handleOnIntCity = (value) => {};
  return (
    <main className="h-auto md:h-screen md:bg-white bg-[#F3F5F8] min-h-screen relative">
      <div className="md:flex h-full w-full relative z-30">
        <div className="flex-1 w-full h-full bg-transparent p-4 flex flex-col ">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full bg-gray-400"></div>
              <h1 className="text-white font-medium">BDS 2024</h1>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                router.push("/");
              }}
              className="bg-[#373737] hover:bg-[#000000] rounded-md text-white px-4 py-2 hover:text-white"
            >
              Logout
            </button>
          </div>

          <div className="h-full max-h-[70vh] md:max-h-[84vh] w-full md:flex items-center justify-center overflow-auto my-4 md:my-0">
            {!modalIsOpen && (
              <div className="bg-white bg-opacity-70 md:h-[80%] md:w-[50%] rounded-lg p-4 text-black overflow-auto">
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
                      labelText={"Title"}
                      placeholder={"Please Select Title"}
                      htmlFor={"title"}
                      name={"title"}
                      value={title}
                      placeholderImage={fIcon}
                      errorMessage={"Title is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateDropDownField}
                      isFieldRequired={isFieldRequired("title")}
                      options={[
                        { label: "Mr.", value: "Mr." },
                        { label: "Ms.", value: "Ms." },
                        { label: "Mrs.", value: "Mrs." },
                        { label: "Prof.", value: "Prof." },
                        { label: "Dr.", value: "Dr." },
                      ]}
                      isSubmitted={isFormSubmitted}
                    />
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
                    <AutoCompleteDropdown
                      htmlFor={"country"}
                      labelText={"Choose Country"}
                      endPoint={"accounts/country"}
                      inputThree={true}
                      initialSelected={country?.name ? country?.name : "India"}
                      onSelect={(value, id) =>
                        handleAutoCompleteChange("country", value, id)
                      }
                      onInitialization={(value) => handleOnIntCity(value)}
                      placeholderImage={fIcon}
                      isFieldRequired={isFieldRequired("country")}
                      isSubmitted={isFormSubmitted}
                      validationFunctionName={validateTextField}
                      errorMessage={"This field is required"}
                    />
                    {isIndian ? (
                      <>
                        {" "}
                        {/* <FileInputField
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
                        /> */}
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
                      </>
                    ) : (
                      <>
                        <TextInputField
                          labelText={
                            "Passport Number (International Delegates)"
                          }
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
                          labelText={
                            "Passport Upload (International Delegates)"
                          }
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
                      </>
                    )}
                    <p className="font-bold underline text-2xl mb-4">
                      Business Address
                    </p>
                    <TextInputField
                      labelText={"Enter your Complete Address"}
                      placeholder={"Address"}
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
                    <NumberInputField
                      labelText={"Enter your Pincode"}
                      placeholder={"Pincode"}
                      htmlFor={"pincode"}
                      name={"pincode"}
                      value={pincode}
                      placeholderImage={fIcon}
                      errorMessage={"Pincode is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("pincode")}
                      isSubmitted={isFormSubmitted}
                      maxLength={6}
                    />
                    <TextInputField
                      labelText={"Enter your City"}
                      placeholder={"City"}
                      htmlFor={"city"}
                      name={"city"}
                      value={city}
                      placeholderImage={fIcon}
                      errorMessage={"City is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("city")}
                      isSubmitted={isFormSubmitted}
                    />
                    <TextInputField
                      labelText={"Enter your State"}
                      placeholder={"State"}
                      htmlFor={"state"}
                      name={"state"}
                      value={state}
                      placeholderImage={fIcon}
                      errorMessage={"State is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateTextField}
                      isFieldRequired={isFieldRequired("state")}
                      isSubmitted={isFormSubmitted}
                    />

                    {/* <NumberInputField
                      labelText={"Direct"}
                      placeholder={"Enter your Phone Number"}
                      htmlFor={"phone"}
                      name={"phone"}
                      value={phone}
                      placeholderImage={fIcon}
                      errorMessage={"Phone Number is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateMobileNumber}
                      isFieldRequired={isFieldRequired("phone")}
                      isSubmitted={isFormSubmitted}
                    /> */}
                    <div>
                      <input
                        checked={addressCheck}
                        onChange={handleInputChange}
                        type="checkbox"
                        name="addressCheck"
                        id="addressCheck"
                      />
                      <label htmlFor="addressCheck">
                        Primary Address Same as Business Address ?
                      </label>
                    </div>

                    {!addressCheck && (
                      <>
                        <p className="font-bold underline text-2xl mb-4">
                          Primary Address
                        </p>
                        <NumberInputField
                          labelText={"Enter your Pincode"}
                          placeholder={"Pincode"}
                          htmlFor={"primaryPincode"}
                          name={"primaryPincode"}
                          value={primaryPincode}
                          placeholderImage={fIcon}
                          errorMessage={"Pincode is required"}
                          handleInputChange={handleInputChange}
                          validationFunctionName={validateTextField}
                          isFieldRequired={isFieldRequired("primaryPincode")}
                          isSubmitted={isFormSubmitted}
                          maxLength={6}
                        />
                        <TextInputField
                          labelText={"Enter your Complete Address"}
                          placeholder={"Primary Address"}
                          htmlFor={"primaryAddress"}
                          name={"primaryAddress"}
                          value={primaryAddress}
                          placeholderImage={fIcon}
                          errorMessage={"Primary Address is required"}
                          handleInputChange={handleInputChange}
                          validationFunctionName={validateTextField}
                          isFieldRequired={isFieldRequired("primaryAddress")}
                          isSubmitted={isFormSubmitted}
                        />
                        <TextInputField
                          labelText={"Enter your City"}
                          placeholder={"City"}
                          htmlFor={"primaryCity"}
                          name={"primaryCity"}
                          value={primaryCity}
                          placeholderImage={fIcon}
                          errorMessage={"City is required"}
                          handleInputChange={handleInputChange}
                          validationFunctionName={validateTextField}
                          isFieldRequired={isFieldRequired("primaryCity")}
                          isSubmitted={isFormSubmitted}
                        />
                        <TextInputField
                          labelText={"Enter your State"}
                          placeholder={"State"}
                          htmlFor={"primaryState"}
                          name={"primaryState"}
                          value={primaryState}
                          placeholderImage={fIcon}
                          errorMessage={"State is required"}
                          handleInputChange={handleInputChange}
                          validationFunctionName={validateTextField}
                          isFieldRequired={isFieldRequired("primaryState")}
                          isSubmitted={isFormSubmitted}
                        />
                      </>
                    )}

                    <p className="font-bold underline text-2xl my-4">
                      Contact Information
                    </p>
                    <NumberInputField
                      labelText={"Business/Office Number"}
                      placeholder={"Enter your Business/Office Number"}
                      htmlFor={"businessPhone"}
                      name={"businessPhone"}
                      value={businessPhone}
                      placeholderImage={fIcon}
                      errorMessage={"Business Number is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateMobileNumber}
                      isFieldRequired={isFieldRequired("businessPhone")}
                      isSubmitted={isFormSubmitted}
                    />
                    <NumberInputField
                      labelText={"Mobile Number"}
                      placeholder={"Enter your Mobile Number"}
                      htmlFor={"mobile"}
                      name={"mobile"}
                      value={mobile}
                      placeholderImage={fIcon}
                      errorMessage={"Mobile Number is required"}
                      handleInputChange={handleInputChange}
                      validationFunctionName={validateMobileNumber}
                      isFieldRequired={isFieldRequired("mobile")}
                      isSubmitted={isFormSubmitted}
                    />
                    {formLoading ? (
                      <div className="flex items-center justify-center">
                        <ColorRing
                          visible={true}
                          height="60"
                          width="60"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000",
                            "#000000",
                          ]}
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFormSubmit}
                        className="w-full bg-[#404a3d] text-white rounded-md py-2 my-4 font-medium text-sm"
                      >
                        Next
                      </button>
                    )}

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
            <h1 className=" text-gray-400 font-medium text-sm my-2">
              BDS 2024
            </h1>
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
        className="h-[60%] w-[80%] pointer-events-auto md:w-[60%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        // style={customStyles}
        overlayClassName={"delegate-modal"}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY border border-[#fcfcfc] border-opacity-[16%] bg-white bg-opacity-70  h-[100%] overflow-x-auto w-[100%] rounded-lg py-4 px-4 space-y-2 relative">
            {/* <div
              className="h-8 w-8 bg-white rounded-md flex items-center justify-center absolute right-0 top-0"
              onClick={() => setModalIsOpen(false)}
            >
              <AiOutlineClose className="text-xl text-black" />
            </div> */}
            <div className="flex flex-col w-full items-center justify-center">
              <p className="text-[18px] text-black font-medium mb-8">
                Delegate
              </p>
              <div className=" w-full md:w-1/2 space-y-4">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="delegateCode"
                    className="text-[#000] text-[14px] block mb-2"
                  >
                    Please enter your Patron unique code
                  </label>
                  <input
                    name="delegateCode"
                    value={delegateCode}
                    onChange={handleInputChange}
                    placeholder="Patron Unique code if any"
                    className="w-full p-2 outline-none border border-[#000] rounded-md mb-2 text-[15px] text-[#000] bg-transparent placeholder:text-gray-600"
                    type="text"
                  />
                  {isCodeValid ? (
                    <p className="text-green-700 text-sm font-medium">
                      <span className="inline-block font-semibold">
                        <FcCheckmark className="font-semibold" />
                      </span>
                      &nbsp; Code Applied Successfully
                    </p>
                  ) : null}
                </div>

                <div className="flex items-end justify-center items-center">
                  <button
                    type="button"
                    onClick={handleDelegateVerification}
                    className="text-[#373737] border border-[#373737] p-2 rounded-md hover:shadow-lg"
                  >
                    Verify
                  </button>
                </div>
                <div className="text-black text-center">
                  {isIndian ? (
                    <>
                      <p>Total Amount Excl. (INR): 3000</p>
                      <p>GST (INR) 18%: 540</p>
                      <p>
                        Grand Total Incl. (INR):{" "}
                        {isCodeValid ? (
                          <span className="inline-block">
                            <s>3540</s> 2360
                          </span>
                        ) : (
                          "3540"
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Total Amount Excl. (USD): 100</p>
                      <p>GST (USD) 18%: 18</p>
                      <p>Grand Total Incl. (USD): 118</p>
                    </>
                  )}
                </div>

                <div className="text-right flex gap-x-2 justify-center">
                  <input
                    checked={acceptTnc}
                    onChange={handleInputChange}
                    type="checkbox"
                    name="acceptTnc"
                    id="acceptTnc"
                  />
                  <label htmlFor="acceptTnc" className="text-black">
                    I agree to{" "}
                    <span
                      className="inline-block text-blue-700 underline"
                      onClick={() => setTncModalIsOpen(true)}
                    >
                      Terms and Conditions
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-center gap-x-4 text-black font-semibold">
                  <button
                    disabled={!acceptTnc}
                    onClick={() => {}}
                    className="bg-[#373737] hover:bg-[#000000] rounded-md text-white px-4 py-2 hover:text-white"
                  >
                    Pay Now
                  </button>
                  <button
                    disabled={!acceptTnc}
                    onClick={() => {
                      setBankTransferModal(true);
                    }}
                    className="bg-[#373737] hover:bg-[#000000] rounded-md text-white px-4 py-2 hover:text-white"
                  >
                    Bank Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        isOpen={tncModalIsOpen}
        onRequestClose={() => setTncModalIsOpen(false)}
        contentLabel="Custom Modal"
        className="custom-modal h-[60%] w-[80%] md:w-[60%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        // style={customStyles}
        overlayClassName={"product-modal"}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY border border-[#fcfcfc] border-opacity-[16%] bg-[#1a1a1a]  h-[100%] overflow-x-auto w-[100%] rounded-lg py-4 px-4 space-y-2 relative">
            <div
              className="h-8 w-8 bg-white rounded-md flex items-center justify-center absolute right-0 top-0"
              onClick={() => setTncModalIsOpen(false)}
            >
              <AiOutlineClose className="text-xl text-black" />
            </div>
            <main className="md:h-screen h-[90vh] min-h-screen relative z-30">
              <div className="h-full w-full  md:pt-0 pt-6">
                <div className="bg-white bg-opacity-70  rounded-lg p-4 text-black">
                  <p>Dear Delegates,</p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Thank you for your interest in registering for the
                    &lsquo;BHARAT DALHAN SEMINAR 2024&rsquo; to be held on
                    August 9<sup>th</sup>, 2024, at&nbsp;Vigyan Bhawan, Delhi,
                    India.&nbsp;
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Before you proceed with the Registration, we would like to
                    draw you attention to a few key factors and request you to
                    please read them carefully. Please feel free to write to us
                    at{" "}
                    <a
                      className="font-bold text-blue-400"
                      href="mailto:bds2024@ipga.co.in"
                    >
                      bds2024@ipga.co.in
                    </a>{" "}
                    in case you have any queries or need any clarifications.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>
                      REGISTRATION FOR THE &lsquo;BHARAT DALHAN SEMINAR
                      2024&rsquo;
                    </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>The Registration Fees for each Delegate are as follows:</p>
                  <p>
                    <br />
                  </p>
                  <table
                    className="border-collapse border border-black"
                    cellSpacing="0"
                    cellPadding="0"
                  >
                    <tbody>
                      <tr>
                        <td
                          className="border border-black"
                          rowspan="2"
                          valign="middle"
                        >
                          <p>
                            <br />
                          </p>
                        </td>
                        <td
                          className="border border-black"
                          colspan="2"
                          valign="middle"
                        >
                          <p>
                            <strong>INDIAN DELEGATES (INR)</strong>
                          </p>
                        </td>
                        <td className="border border-black" valign="middle">
                          <p>
                            <strong>INTERNATIONAL DELEGATES (USD)</strong>
                          </p>
                        </td>
                      </tr>

                      <tr className="">
                        <td className="border border-black" valign="middle">
                          <p>
                            <strong>Patron</strong>
                          </p>
                        </td>
                        <td className="border border-black" valign="middle">
                          <p>
                            <strong>Non Patron</strong>
                          </p>
                        </td>
                        <td className="border border-black" valign="middle">
                          <p>
                            <strong>Per Delegate</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black" valign="middle">
                          <p>
                            <br />
                          </p>
                        </td>
                        <td className="border border-black" valign="bottom">
                          <p>2,000 + Tax</p>
                        </td>
                        <td className="border border-black" valign="bottom">
                          <p>3,000 + Tax</p>
                        </td>
                        <td className="border border-black" valign="bottom">
                          <p>100 + Tax</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>GENERAL TERMS AND CONDITIONS</strong>
                  </p>
                  <ol>
                    <li>
                      Above cost exclude taxes. In the event of any change in
                      Taxes by the Government of India, these rates will change
                      accordingly from the date such changes are enforced by the
                      Government of India.
                    </li>
                    <li>
                      All IPGA Patrons{" "}
                      <strong>
                        <em>
                          (whose patronship fees are fully paid till date)
                        </em>
                      </strong>{" "}
                      shall receive UNIQUE Code on their registered email id to
                      register for the Seminar.
                    </li>
                    <li>
                      Indian Delegates who are not IPGA Patrons should use the
                      link given below to register for the Seminar.
                    </li>
                    <li>
                      All Group Bookings{" "}
                      <strong>
                        <em>
                          (more than five delegates from the same organization)
                        </em>
                      </strong>{" "}
                      will be handled offline. Please connect with IPGA Team at{" "}
                      <a
                        className="font-bold text-blue-400"
                        href="mailto:bds2024@ipga.co.in"
                      >
                        bds2024@ipga.co.in
                      </a>{" "}
                      to complete the process.
                    </li>
                    <li>
                      All International Delegates shall pay in US Dollars.
                      International Delegates will automatically get the
                      applicable rates once they choose the
                      &ldquo;Country&rdquo; field in the Registration Process.
                    </li>
                    <li>
                      All International Delegates MUST read the VISA APPLICATION
                      PROCESS before proceeding to Register.
                    </li>
                  </ol>
                  <ul>
                    <li>
                      <strong>GUIDELINES FOR REGISTRATION:</strong>
                      <ul>
                        <li>All fields are mandatory.</li>
                        <li>Please tick on the relevant option.</li>
                        <li>
                          All IPGA Patrons (whose patronship fees are fully paid
                          till date) shall receive UNIQUE Code on their
                          registered email id to register for the event.
                        </li>
                        <li>
                          All Group Bookings (more than five delegates from the
                          same organization) will be handled offline. Please
                          connect with IPGA Team at BHARAT DALHAN SEMINAR 2024{" "}
                          <a
                            className="font-bold text-blue-400"
                            href="mailto:bds2024@ipga.co.in"
                          >
                            bds2024@ipga.co.in
                          </a>{" "}
                          to complete the process.
                        </li>
                        <li>
                          All International Delegates MUST read the VISA
                          APPLICATION PROCESS before proceeding to Register.
                        </li>
                        <li>
                          Invoice cum Receipt bearing the Registration ID will
                          be sent to all registered delegates by email. This
                          must be presented at the registration counter.
                        </li>
                        <li>
                          The delegates must mention their registration ID in
                          all future correspondence.
                        </li>
                        <li>
                          After receiving the confirmation e-mail, contact us
                          immediately for any spelling errors or changes.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <strong>CANCELLATION POLICY:</strong>
                      <ul>
                        <li>
                          As mentioned on website in the Registration Tab.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>PRIVACY POLICY</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    This privacy policy sets out how INDIA PULSES AND GRAINS
                    ASSOCIATION (IPGA) uses and protects any information that
                    you give IPGA when you use this website. IPGA is committed
                    to ensuring that your privacy is protected. Should we ask
                    you to provide certain information by which you can be
                    identified when using this website, then you can be assured
                    that it will only be used in accordance with this privacy
                    statement.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    IPGA may change this policy from time to time by updating
                    this page. You should check this page from time to time to
                    ensure that you are happy with any changes. This policy is
                    effective from May 20th
                    <sup>,</sup> 2024.&nbsp;
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may collect information like name and job title, contact
                    information including email address, demographic information
                    such as postcode, preferences and interests as well as other
                    relevant information. This information is required to
                    understand your needs and provide you with a better
                    service.&nbsp;
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may use this data to periodically send promotional email
                    about new products, special offers or other information
                    which we think you may find interesting using the email
                    address which you have provided. From time to time, we may
                    also use your information to contact you for market research
                    purposes and may contact you by email, phone or mail. We may
                    provide your information to our registered patrons for
                    networking purposes. We will never sell your information.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>SECURITY&nbsp;</strong>
                  </p>
                  <p>
                    We are committed to ensuring that your information is
                    secure. In order to prevent unauthorized access or
                    disclosure we have put in place suitable physical,
                    electronic and managerial procedures to safeguard and secure
                    the information we collect online.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Our website may contain links to enable you to visit other
                    websites of interest easily. However, once you have used
                    these links to leave our site, you should note that we do
                    not have any control over that other website. Therefore, we
                    cannot be responsible for the protection and privacy of any
                    information which you provide whilst visiting such sites and
                    such sites are not governed by this privacy statement. You
                    should exercise caution and look at the privacy statement
                    applicable to the website in question.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We will not sell, distribute or lease your personal
                    information to third parties unless we have your permission
                    or are required by law. We may use your personal information
                    to send you promotional information about third parties
                    which we think you may find interesting.&nbsp;
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you believe that any information we are holding on you is
                    incorrect or incomplete, please write to or email us as soon
                    as possible. We will promptly correct any information found
                    to be incorrect.&nbsp;
                  </p>
                </div>
              </div>
            </main>
          </div>
        </>
      </Modal>
      <Modal
        isOpen={bankTransferModal}
        onRequestClose={() => setBankTransferModal(false)}
        contentLabel="Custom Modal"
        className="custom-modal h-[60%] w-[80%] md:w-[60%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        // style={customStyles}
        overlayClassName={"product-modal"}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY border border-[#fcfcfc] border-opacity-[16%] bg-[#1a1a1a]  h-[100%] overflow-x-auto w-[100%] rounded-lg py-4 px-4 space-y-2 relative">
            <div
              className="h-8 w-8 bg-white rounded-md flex items-center justify-center absolute right-0 top-0"
              onClick={() => setBankTransferModal(false)}
            >
              <AiOutlineClose className="text-xl text-black" />
            </div>
            <main className="h-fit relative z-30">
              <div className="w-full  md:pt-0 pt-6">
                <div className="bg-white bg-opacity-70 h-[30vh]  rounded-lg p-4 text-black">
                  <p className="font-medium text-center w-full">
                    THANK YOU FOR REGISTERING FOR BHARAT DALHAN SEMINAR 2024
                  </p>
                  <p className="text-center w-full mt-12">
                    To be held on August 9th, 2024, at Vigyan Bhawan, Delhi,
                    India Best regards, Registration Support Desk | BHARAT
                    DALHAN SEMINAR 2024 Email ID: bds2024@ipga.co.in
                  </p>
                  <p className="text-sm mt-8">
                    Please Note: You will receive all the future communications
                    on your registered email id.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </>
      </Modal>
    </main>
  );
}

export default Registration;
