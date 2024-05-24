import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineBell, AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import navLogo from "@/app/assets/images/navLogo.png";
import { useRouter } from "next/navigation";
import { replaceLogo } from "../slices/logoSlice";
import { useDispatch, useSelector } from "react-redux";
import logo2 from "@/app/assets/images/samsungLogo.png";
import logo3 from "@/app/assets/icons/logo2.jpg";
import Modal from "react-modal";
import { useAccountGetMutation } from "../service/genericAccountApi";
import { Poppins, Quicksand } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "300", "500", "700"],
  variable: "--font-poppins",
});
function Navbar({ navText, companyLogo }) {
  let accessToken = null;
  typeof window !== "undefined"
    ? (accessToken = localStorage.getItem("accessToken"))
    : null;
  let domain = null;
  typeof window !== "undefined"
    ? (domain = localStorage.getItem("domain_url"))
    : null;
  const [onFlutter, setOnFlutter] = useState(true);
  const [token, setToken] = useState("");
  const [domainFromFlutter, setDomainFromFlutter] = useState("");

  useEffect(() => {
    if (window.Toaster) {
      Toaster.postMessage("requestToken");
      window.receiveDataFromFlutter = (data) => {
        setOnFlutter(true);
        const parsedData = JSON.parse(data);
        const token = parsedData?.token;
        const domain = parsedData?.domain;
        setToken(token);
        setDomainFromFlutter(domain);
        getUserProfile({
          accessToken: onFlutter ? token : accessToken,
          domain: onFlutter ? domainFromFlutter : domain,
          endpoint: "user-profile/update",
        });
      };
    } else {
      setOnFlutter(false);
      getUserProfile({
        accessToken: onFlutter ? token : accessToken,
        domain: onFlutter ? domainFromFlutter : domain,
        endpoint: "user-profile/update",
      });
    }
  }, [token, domainFromFlutter, onFlutter]);
  let logoFromLocal = "";
  typeof window !== "undefined"
    ? (logoFromLocal = localStorage.getItem("companyLogo"))
    : null;
  const dispatch = useDispatch();
  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsClosing(false);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setIsClosing(true);
    // Wait for the animation to finish before actually hiding the modal
    setTimeout(() => {
      setModalIsOpen(false);
    }, 500); // 500ms should match the duration of your slide-out animation
  };
  const [getUserProfile, { data: isUserProfileData }] = useAccountGetMutation({
    accessToken: onFlutter ? token : accessToken,
    domain: onFlutter ? domainFromFlutter : domain,
    endpoint: "user-profile/update",
  });

  return (
    <div
      className={`text-white shadow-lg h-16 flex items-center justify-between primary-color-bg z-[100] ${poppins.variable} font-poppins`}
    >
      {!navText && (
        <>
          <AiOutlineMenu onClick={openModal} className="text-2xl" />
          <div className="relative flex gap-x-4">
            <Image
              src={logo2}
              height={100}
              width={100}
              className="object-contain"
            />

            {/* <Image
              src={isUserProfileData?.data?.logo}
              height={48}
              width={48}
              className="h-12 w-12 object-contain"
            /> */}
          </div>
        </>
      )}
      {navText && (
        <>
          <div className="flex gap-8">
            <IoIosArrowBack
              onClick={() => router.back()}
              className="text-2xl cursor-pointer pointer-events-auto"
            />
            {navText}
          </div>
        </>
      )}

      <AiOutlineBell className="text-2xl" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Modal"
        // className="modal-animation bg-white h-screen w-[35%] absolute right-0 shadow-2xl p-4 transition-all"
        className={`bg-[#000] h-screen md:w-[35%] w-[65%] absolute left-0 shadow-2xl p-4 transition-all outline-none border-none ${
          poppins.variable
        } font-poppins ${isClosing ? "slide-out-nav" : "slide-in-nav"}`}
        // style={customStyles}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY h-full flex flex-col">
            <div className="flex mt-4">
              <Image
                src={logo2}
                height={300}
                width={150}
                className="object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col overflow-auto space-y-4 py-8 text-sm">
              <div className="flex items-center gap-x-4">
                <svg
                  width="19"
                  height="22"
                  viewBox="0 0 19 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.9643 0H2.03571C0.95 0 0 0.9625 0 2.0625V19.9375C0 21.0375 0.95 22 2.03571 22H16.9643C18.05 22 19 21.0375 19 19.9375V2.0625C19 0.9625 18.05 0 16.9643 0ZM5.42857 18.7C5.42857 18.975 5.15714 19.25 4.88571 19.25H3.25714C2.98571 19.25 2.71429 18.975 2.71429 18.7V17.05C2.71429 16.775 2.98571 16.5 3.25714 16.5H4.88571C5.15714 16.5 5.42857 16.775 5.42857 17.05V18.7ZM5.42857 13.2C5.42857 13.475 5.15714 13.75 4.88571 13.75H3.25714C2.98571 13.75 2.71429 13.475 2.71429 13.2V11.55C2.71429 11.275 2.98571 11 3.25714 11H4.88571C5.15714 11 5.42857 11.275 5.42857 11.55V13.2ZM10.8571 18.7C10.8571 18.975 10.5857 19.25 10.3143 19.25H8.68571C8.41429 19.25 8.14286 18.975 8.14286 18.7V17.05C8.14286 16.775 8.41429 16.5 8.68571 16.5H10.3143C10.5857 16.5 10.8571 16.775 10.8571 17.05V18.7ZM10.8571 13.2C10.8571 13.475 10.5857 13.75 10.3143 13.75H8.68571C8.41429 13.75 8.14286 13.475 8.14286 13.2V11.55C8.14286 11.275 8.41429 11 8.68571 11H10.3143C10.5857 11 10.8571 11.275 10.8571 11.55V13.2ZM16.2857 18.7C16.2857 18.975 16.0143 19.25 15.7429 19.25H14.1143C13.8429 19.25 13.5714 18.975 13.5714 18.7V11.55C13.5714 11.275 13.8429 11 14.1143 11H15.7429C16.0143 11 16.2857 11.275 16.2857 11.55V18.7ZM16.2857 7.7C16.2857 7.975 16.0143 8.25 15.7429 8.25H3.25714C2.98571 8.25 2.71429 7.975 2.71429 7.7V3.3C2.71429 3.025 2.98571 2.75 3.25714 2.75H15.7429C16.0143 2.75 16.2857 3.025 16.2857 3.3V7.7Z"
                    fill="#F4CA4A"
                  />
                </svg>

                <p
                  onClick={() => {
                    setModalIsOpen(false);
                    // router.push("/home");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  Point Calculator
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 15.625H16.0596C14.9756 16.123 13.7695 16.4062 12.5 16.4062C11.2305 16.4062 10.0293 16.123 8.94043 15.625H6.25C2.79785 15.625 0 18.4229 0 21.875V22.6562C0 23.9502 1.0498 25 2.34375 25H22.6562C23.9502 25 25 23.9502 25 22.6562V21.875C25 18.4229 22.2021 15.625 18.75 15.625Z"
                    fill="#DEBA5C"
                  />
                  <path
                    d="M19.5312 7.03125C19.5312 10.9131 16.3818 14.0625 12.5 14.0625C8.61816 14.0625 5.46875 10.9131 5.46875 7.03125C5.46875 3.14941 8.61816 0 12.5 0C16.3818 0 19.5312 3.14941 19.5312 7.03125Z"
                    fill="white"
                  />
                </svg>

                <p
                  onClick={() => {
                    // setModalIsOpen(false);
                    router.push("/partner-report");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  Partner Profile
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  width="23"
                  height="29"
                  viewBox="0 0 23 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 28.5C0 28.671 0.0805579 28.831 0.231411 28.922C0.372206 29.014 0.55321 29.025 0.71412 28.952L2.66509 28.035L4.61618 28.952C4.75698 29.015 4.90776 29.016 5.04856 28.955L7.08006 28.033L9.04122 28.952C9.17196 29.015 9.32273 29.016 9.46353 28.955L11.495 28.033L13.4561 28.952C13.5868 29.015 13.7377 29.016 13.8785 28.955L15.91 28.031L17.9516 28.955C18.0924 29.016 18.2431 29.015 18.3739 28.952L20.335 28.035L22.286 28.952C22.4369 29.025 22.6179 29.014 22.7687 28.922C22.9095 28.831 23 28.671 23 28.5V0.5C23 0.224 22.7788 0 22.4972 0H0.502842C0.221251 0 0 0.224 0 0.5V28.5ZM1.00568 27.711V0.999999H21.9943V27.711L20.5462 27.03C20.4054 26.966 20.2545 26.966 20.1137 27.03L18.1627 27.949L16.1212 27.027C15.9904 26.967 15.8395 26.967 15.7088 27.027L13.6673 27.949L11.7163 27.03C11.5755 26.967 11.4247 26.966 11.2939 27.027L9.25237 27.949L7.30128 27.03C7.16048 26.967 7.00971 26.966 6.87897 27.027L4.8374 27.949L2.88631 27.03C2.74551 26.966 2.58467 26.966 2.45393 27.03L1.00568 27.711Z"
                    fill="#DEBA5C"
                  />
                  <path
                    d="M18.2231 21.167C18.2231 21.443 18.0018 21.667 17.7202 21.667H11.5001H5.27991C4.99832 21.667 4.77707 21.443 4.77707 21.167C4.77707 20.891 4.99832 20.667 5.27991 20.667H11.5001H17.7202C18.0018 20.667 18.2231 20.891 18.2231 21.167Z"
                    fill="white"
                  />
                  <path
                    d="M17.7202 18H5.27991C4.99832 18 4.77707 17.776 4.77707 17.5C4.77707 17.224 4.99832 17 5.27991 17H17.7202C18.0018 17 18.2231 17.224 18.2231 17.5C18.2231 17.776 18.0018 18 17.7202 18Z"
                    fill="white"
                  />
                  <path
                    d="M17.7202 14.333H5.27991C4.99832 14.333 4.77707 14.109 4.77707 13.833C4.77707 13.557 4.99832 13.333 5.27991 13.333H17.7202C18.0018 13.333 18.2231 13.557 18.2231 13.833C18.2231 14.109 18.0018 14.333 17.7202 14.333Z"
                    fill="white"
                  />
                  <path
                    d="M17.7202 10.667H5.27991C4.99832 10.667 4.77707 10.443 4.77707 10.167C4.77707 9.89099 4.99832 9.66699 5.27991 9.66699H17.7202C18.0018 9.66699 18.2231 9.89099 18.2231 10.167C18.2231 10.443 18.0018 10.667 17.7202 10.667Z"
                    fill="white"
                  />
                  <path
                    d="M18.2231 6.49999C18.2231 6.77599 18.0018 6.99999 17.7202 6.99999H11.5001H5.27991C4.99832 6.99999 4.77707 6.77599 4.77707 6.49999C4.77707 6.22399 4.99832 5.99999 5.27991 5.99999H11.5001H17.7202C18.0018 5.99999 18.2231 6.22399 18.2231 6.49999Z"
                    fill="white"
                  />
                </svg>

                <p
                  onClick={() => {
                    // setModalIsOpen(false);
                    router.push("/orderhistory");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  What's New
                </p>
              </div>
              {/* <div className="flex items-center gap-x-4">
                <svg
                  width="22"
                  height="25"
                  viewBox="0 0 22 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.875 17.5V1.25C21.875 0.46875 21.4062 0 20.625 0H4.6875C2.03125 0 0 2.03125 0 4.6875V20.3125C0 22.9688 2.03125 25 4.6875 25H20.625C21.25 25 21.875 24.5312 21.875 23.75V22.9688C21.875 22.6562 21.7188 22.3438 21.4062 22.0312C21.25 21.25 21.25 19.0625 21.4062 18.4375C21.7188 18.2812 21.875 17.9688 21.875 17.5ZM10.9375 3.125C14.3892 3.125 17.1875 5.92334 17.1875 9.375C17.1875 12.8267 14.3892 15.625 10.9375 15.625C7.48584 15.625 4.6875 12.8267 4.6875 9.375C4.6875 5.92334 7.48584 3.125 10.9375 3.125ZM18.75 21.875H4.6875C3.75 21.875 3.125 21.25 3.125 20.3125C3.125 19.375 3.90625 18.75 4.6875 18.75H18.75V21.875Z"
                    fill="#4A5AFA"
                  />
                  <path
                    d="M6.3291 8.59375C6.58691 7.06934 7.57861 5.80225 8.93164 5.15576C8.55664 6.08643 8.31055 7.27393 8.23779 8.59375H6.3291Z"
                    fill="white"
                  />
                  <path
                    d="M9.79297 8.59375C9.92285 6.43213 10.5615 5.11523 10.937 4.75146C11.3125 5.11523 11.9512 6.43262 12.0815 8.59375H9.79297Z"
                    fill="white"
                  />
                  <path
                    d="M12.9434 5.15576C14.2964 5.80225 15.2876 7.06934 15.5459 8.59375H13.6372C13.5645 7.27393 13.3184 6.08643 12.9434 5.15576Z"
                    fill="white"
                  />
                  <path
                    d="M13.6372 10.1562H15.5459C15.2881 11.6807 14.2964 12.9478 12.9434 13.5942C13.3179 12.6636 13.5645 11.4761 13.6372 10.1562Z"
                    fill="white"
                  />
                  <path
                    d="M9.79297 10.1562H12.0815C11.9517 12.3174 11.313 13.6348 10.937 13.9985C10.5615 13.6348 9.92285 12.3174 9.79297 10.1562Z"
                    fill="white"
                  />
                  <path
                    d="M8.23779 10.1562C8.31055 11.4761 8.55664 12.6636 8.93164 13.5942C7.57861 12.9478 6.58691 11.6807 6.3291 10.1562H8.23779Z"
                    fill="white"
                  />
                </svg>

                <p
                  onClick={() => {
                    // setModalIsOpen(false);
                    router.push("/faqs");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  FAQ's
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  width="25"
                  height="19"
                  viewBox="0 0 25 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.5 3.5H12L22.5 3L22 14H3L2.5 3.5Z" fill="white" />
                  <path
                    d="M22.9297 0H16.862C14.7743 0 12.9601 1.44531 12.5043 3.48524C12.0443 1.44531 10.2344 0 8.1467 0H2.08333C0.93316 0 0 0.93316 0 2.08333V12.7517C0 13.9019 0.93316 14.8351 2.08333 14.8351H5.97656C10.4123 14.8351 11.7361 15.8941 12.3698 18.0903C12.4002 18.2118 12.5955 18.2118 12.6302 18.0903C13.2682 15.8941 14.592 14.8351 19.0234 14.8351H22.9167C24.0668 14.8351 25 13.9019 25 12.7517V2.08767C25 0.94184 24.0755 0.00868056 22.9297 0ZM10.5035 11.5191C10.5035 11.6016 10.4384 11.671 10.3516 11.671H3.3941C3.31163 11.671 3.24219 11.6059 3.24219 11.5191V10.5252C3.24219 10.4427 3.30729 10.3733 3.3941 10.3733H10.3559C10.4384 10.3733 10.5078 10.4384 10.5078 10.5252V11.5191H10.5035ZM10.5035 8.87587C10.5035 8.95833 10.4384 9.02778 10.3516 9.02778H3.3941C3.31163 9.02778 3.24219 8.96267 3.24219 8.87587V7.88194C3.24219 7.79948 3.30729 7.73003 3.3941 7.73003H10.3559C10.4384 7.73003 10.5078 7.79514 10.5078 7.88194V8.87587H10.5035ZM10.5035 6.23264C10.5035 6.3151 10.4384 6.38455 10.3516 6.38455H3.3941C3.31163 6.38455 3.24219 6.31944 3.24219 6.23264V5.23872C3.24219 5.15625 3.30729 5.08681 3.3941 5.08681H10.3559C10.4384 5.08681 10.5078 5.15191 10.5078 5.23872V6.23264H10.5035ZM21.7578 11.5148C21.7578 11.5972 21.6927 11.6667 21.6059 11.6667H14.6484C14.566 11.6667 14.4965 11.6016 14.4965 11.5148V10.5208C14.4965 10.4384 14.5616 10.3689 14.6484 10.3689H21.6102C21.6927 10.3689 21.7622 10.434 21.7622 10.5208V11.5148H21.7578ZM21.7578 8.87153C21.7578 8.95399 21.6927 9.02344 21.6059 9.02344H14.6484C14.566 9.02344 14.4965 8.95833 14.4965 8.87153V7.8776C14.4965 7.79514 14.5616 7.72569 14.6484 7.72569H21.6102C21.6927 7.72569 21.7622 7.7908 21.7622 7.8776V8.87153H21.7578ZM21.7578 6.2283C21.7578 6.31076 21.6927 6.38021 21.6059 6.38021H14.6484C14.566 6.38021 14.4965 6.3151 14.4965 6.2283V5.23872C14.4965 5.15625 14.5616 5.08681 14.6484 5.08681H21.6102C21.6927 5.08681 21.7622 5.15191 21.7622 5.23872V6.2283H21.7578Z"
                    fill="#4A5AFA"
                  />
                </svg>

                <p
                  onClick={() => {
                    // setModalIsOpen(false);
                    router.push("/tnc");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  Terms & Conditions
                </p>
              </div> */}
              <div className="flex items-center gap-x-4">
                <svg
                  width="22"
                  height="25"
                  viewBox="0 0 22 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.875 17.5V1.25C21.875 0.46875 21.4062 0 20.625 0H4.6875C2.03125 0 0 2.03125 0 4.6875V20.3125C0 22.9688 2.03125 25 4.6875 25H20.625C21.25 25 21.875 24.5312 21.875 23.75V22.9688C21.875 22.6562 21.7188 22.3438 21.4062 22.0312C21.25 21.25 21.25 19.0625 21.4062 18.4375C21.7188 18.2812 21.875 17.9688 21.875 17.5ZM10.9375 3.125C14.3892 3.125 17.1875 5.92334 17.1875 9.375C17.1875 12.8267 14.3892 15.625 10.9375 15.625C7.48584 15.625 4.6875 12.8267 4.6875 9.375C4.6875 5.92334 7.48584 3.125 10.9375 3.125ZM18.75 21.875H4.6875C3.75 21.875 3.125 21.25 3.125 20.3125C3.125 19.375 3.90625 18.75 4.6875 18.75H18.75V21.875Z"
                    fill="#DEBA5C"
                  />
                  <path
                    d="M6.3291 8.59375C6.58691 7.06934 7.57861 5.80225 8.93164 5.15576C8.55664 6.08643 8.31055 7.27393 8.23779 8.59375H6.3291Z"
                    fill="white"
                  />
                  <path
                    d="M9.79297 8.59375C9.92285 6.43213 10.5615 5.11523 10.937 4.75146C11.3125 5.11523 11.9512 6.43262 12.0815 8.59375H9.79297Z"
                    fill="white"
                  />
                  <path
                    d="M12.9434 5.15576C14.2964 5.80225 15.2876 7.06934 15.5459 8.59375H13.6372C13.5645 7.27393 13.3184 6.08643 12.9434 5.15576Z"
                    fill="white"
                  />
                  <path
                    d="M13.6372 10.1562H15.5459C15.2881 11.6807 14.2964 12.9478 12.9434 13.5942C13.3179 12.6636 13.5645 11.4761 13.6372 10.1562Z"
                    fill="white"
                  />
                  <path
                    d="M9.79297 10.1562H12.0815C11.9517 12.3174 11.313 13.6348 10.937 13.9985C10.5615 13.6348 9.92285 12.3174 9.79297 10.1562Z"
                    fill="white"
                  />
                  <path
                    d="M8.23779 10.1562C8.31055 11.4761 8.55664 12.6636 8.93164 13.5942C7.57861 12.9478 6.58691 11.6807 6.3291 10.1562H8.23779Z"
                    fill="white"
                  />
                </svg>

                <p
                  onClick={() => {
                    // setModalIsOpen(false);
                    router.push("/privacyPolicy");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  Privacy Policy
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.80761 20.706H4.07874C2.52182 20.706 1.25858 19.4381 1.25858 17.8858V4.07874C1.25858 2.52182 2.52649 1.25858 4.07874 1.25858H9.90084C10.2504 1.25858 10.5301 0.978896 10.5301 0.629291C10.5301 0.279685 10.2504 0 9.90084 0H4.07874C1.82727 0 0 1.83193 0 4.07874V17.8858C0 20.1373 1.83193 21.9646 4.07874 21.9646H9.80761C10.1572 21.9646 10.4369 21.6849 10.4369 21.3353C10.4369 20.9857 10.1526 20.706 9.80761 20.706Z"
                    fill="#DEBA5C"
                  />
                  <path
                    d="M20.1748 10.5395L16.1753 6.53997C15.9282 6.29291 15.532 6.29291 15.285 6.53997C15.0379 6.78702 15.0379 7.18324 15.285 7.4303L18.2123 10.3577H5.44472C5.09511 10.3577 4.81543 10.6373 4.81543 10.987C4.81543 11.3366 5.09511 11.6162 5.44472 11.6162H18.2123L15.285 14.5436C15.0379 14.7907 15.0379 15.1869 15.285 15.4339C15.4062 15.5551 15.5693 15.6204 15.7278 15.6204C15.8863 15.6204 16.0494 15.5598 16.1706 15.4339L20.1701 11.4344C20.4218 11.1827 20.4218 10.7819 20.1748 10.5395Z"
                    fill="white"
                  />
                </svg>

                <p
                  onClick={() => {
                    // setModalIsOpen(false);
                    router.push("/");
                  }}
                  className=" text-white cursor-pointer py-2 rounded-md"
                >
                  Logout
                </p>
              </div>
            </div>
            <div className="text-white">
              <p className="text-[12px]">© STORY Experiences - 2024</p>
              <p className="text-[10px]">Version 1.0.0</p>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default Navbar;
