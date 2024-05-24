import React, { useState } from "react";
import Modal from "react-modal";
function DiyModal({
  heading,
  subHeading,
  info,
  openModal,
  modalIsOpen,
  closeModal,
  isClosing,
}) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Modal"
        // className="modal-animation bg-white h-screen w-[35%] absolute right-0 shadow-2xl p-4 transition-all"
        className={`bg-white h-screen md:w-[35%] w-full absolute right-0 shadow-2xl p-4 transition-all outline-none border-none ${
          isClosing ? "slide-out" : "slide-in"
        }`}
        // style={customStyles}
        ariaHideApp={false}
      >
        <>
          <div className="MODAL-BODY h-full">
            <div className="h-full flex flex-col overflow-auto">
              <div className="h-fit flex">
                <p className="text-[20px] text-black my-4 flex-1">{heading}</p>
                <button className="text-right" onClick={closeModal}>
                  <svg
                    width="39"
                    height="34"
                    viewBox="0 0 39 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M35.3438 0H3.65625C1.6377 0 0 1.6317 0 3.64286V30.3571C0 32.3683 1.6377 34 3.65625 34H35.3438C37.3623 34 39 32.3683 39 30.3571V3.64286C39 1.6317 37.3623 0 35.3438 0ZM28.9758 22.0469C29.3414 22.4112 29.3414 23.0031 28.9758 23.3674L25.8908 26.4411C25.5252 26.8054 24.9311 26.8054 24.5654 26.4411L19.5 21.3487L14.4346 26.4411C14.0689 26.8054 13.4748 26.8054 13.1092 26.4411L10.0242 23.3674C9.65859 23.0031 9.65859 22.4112 10.0242 22.0469L15.1354 17L10.0242 11.9531C9.65859 11.5888 9.65859 10.9969 10.0242 10.6326L13.1092 7.55893C13.4748 7.19464 14.0689 7.19464 14.4346 7.55893L19.5 12.6513L24.5654 7.55893C24.9311 7.19464 25.5252 7.19464 25.8908 7.55893L28.9758 10.6326C29.3414 10.9969 29.3414 11.5888 28.9758 11.9531L23.8646 17L28.9758 22.0469Z"
                      fill="#000233"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-[#423FFF] md:text-2xl font-bold pt-4">
                {subHeading}
              </p>
              <p className="text-[#5a5a5a] py-6">{info}</p>
              <p className="text-black">
                Need Help : Call us on{" "}
                <span className="text-[#423fff]">1800 4526 29</span>
              </p>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default DiyModal;
