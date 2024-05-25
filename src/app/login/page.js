"use client";
import React, { useState } from "react";
import login from "@/app/assets/login.svg";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  return (
    <div className="min-h-screen relative z-30">
      <div
        className={`min-h-screen w-full items-center justify-center ${
          modalIsOpen || signUpIsOpen ? "hidden" : "flex"
        }`}
      >
        <div className="bg-white bg-opacity-70 h-[90%] w-[90%] md:h-[60%] md:w-[60%] overflow-auto rounded-lg p-4 text-black">
          <p className="w-full text-center font-medium">
            Welcome, BHARAT DALHAN SEMINAR 2024
          </p>
          <p className="w-full text-center my-8">Please Login or Sign Up</p>
          {/* <div className="flex items-center justify-center w-full">
            {" "}
            <Image alt="login" src={login} height={200} width={300} />
          </div> */}
          <div className="flex items-center justify-center gap-x-12 w-full my-8">
            <button
              onClick={() => setModalIsOpen(true)}
              className=" bg-white rounded-md px-4 py-2 secondary-color-text hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => setSignUpIsOpen(true)}
              className=" secondary-color-bg rounded-md px-4 py-2 text-white hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
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
          <div className="MODAL-BODY border border-[#fcfcfc] border-opacity-[16%] bg-[#7c7c7c] bg-opacity-70  h-[100%] overflow-x-auto w-[100%] rounded-lg py-4 px-4 space-y-2 relative">
            <div
              className="h-8 w-8 bg-white rounded-md flex items-center justify-center absolute right-0 top-0"
              onClick={() => setModalIsOpen(false)}
            >
              <AiOutlineClose className="text-xl text-black" />
            </div>
            <div className="flex flex-col w-full items-center justify-center">
              <p className="text-[18px] text-productTextColor font-medium mb-8">
                Login
              </p>
              <div className="w-1/2 space-y-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-white text-[14px] block">
                    Email
                  </label>
                  <input
                    placeholder="Enter email address"
                    className="w-full p-2 outline-none border border-gray-300 rounded-md mb-2 text-[15px] text-white bg-transparent"
                    type="email"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-white text-[14px] block">
                    Password
                  </label>
                  <input
                    placeholder="Enter password"
                    className="w-full p-2 outline-none border border-gray-300 rounded-md mb-2 text-[15px] text-white bg-transparent"
                    type="password"
                  />
                </div>
                <button
                  onClick={() => {
                    router.push("/registration");
                  }}
                  className="bg-[#c1c1c1] hover:bg-[#929292] rounded-md text-black px-4 py-2"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        isOpen={signUpIsOpen}
        onRequestClose={() => setSignUpIsOpen(false)}
        contentLabel="Custom Modal"
        className="custom-modal h-[60%] w-[60%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        // style={customStyles}
        overlayClassName={"product-modal"}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY border border-[#fcfcfc] border-opacity-[16%] bg-[#7c7c7c] bg-opacity-70 h-[100%] overflow-x-auto w-[100%] rounded-lg py-4 px-4 space-y-2 relative">
            <div
              className="h-8 w-8 bg-white rounded-md flex items-center justify-center absolute right-0 top-0"
              onClick={() => setSignUpIsOpen(false)}
            >
              <AiOutlineClose className="text-xl text-black" />
            </div>
            <div className="flex flex-col w-full items-center justify-center">
              <p className="text-[18px] text-productTextColor font-medium mb-8">
                Sign Up
              </p>
              <div className="w-1/2 space-y-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-white text-[14px] block">
                    Email
                  </label>
                  <input
                    placeholder="Enter email address"
                    className="w-full p-2 outline-none border border-gray-300 rounded-md mb-2 text-[15px] text-white bg-transparent"
                    type="email"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-white text-[14px] block">
                    Password
                  </label>
                  <input
                    placeholder="Enter password"
                    className="w-full p-2 outline-none border border-gray-300 rounded-md mb-2 text-[15px] text-white bg-transparent"
                    type="password"
                  />
                </div>
                <button className="bg-[#c1c1c1] hover:bg-[#929292] rounded-md text-black px-4 py-2">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default Login;
