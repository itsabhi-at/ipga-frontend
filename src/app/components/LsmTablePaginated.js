"use client";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function LsmTablePaginated({
  headers,
  data,
  width,
  firstChildWidth,
  heightDesktop,
  heightMobile,
  redTable,
  handleOnClick,
  grandTotal,
  isError,
  isValidator,
  currentPage,
  setCurrentPage,
  totalPages,
  background,
}) {
  let grandTotalRow = null;
  if (grandTotal) {
    grandTotalRow = {
      [headers[0].headerId]: "Grand Total",
    };
    headers.forEach((header, index) => {
      if (index !== 0) {
        switch (header.headerId) {
          case "Central":
            grandTotalRow[header.headerId] = data?.reduce(
              (total, row) => total + row?.opted[0][header.headerId],
              0
            );
            break;
          case "North":
            grandTotalRow[header.headerId] = data?.reduce(
              (total, row) => total + row?.opted[0][header.headerId],
              0
            );
            break;
          case "South":
            grandTotalRow[header.headerId] = data?.reduce(
              (total, row) => total + row?.opted[0][header.headerId],
              0
            );
            break;
          case "East":
            grandTotalRow[header.headerId] = data?.reduce(
              (total, row) => total + row?.opted[0][header.headerId],
              0
            );
            break;
          case "West":
            grandTotalRow[header.headerId] = data?.reduce(
              (total, row) => total + row?.opted[0][header.headerId],
              0
            );
            break;
          default:
            grandTotalRow[header.headerId] = data?.reduce(
              (total, row) => total + row[header.headerId],
              0
            );
            break;
        }
      }
    });
  }

  const [selectedPage, setSelectedPage] = useState(1);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const itemsPerPage = 10;
  const totalItems = totalPages * itemsPerPage;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  let endIndex = startIndex + data?.length - 1; // Using data.length to handle last page
  const accurateTotalItems =
    currentPage === totalPages ? startIndex + data?.length - 1 : totalItems;
  return (
    <div className="">
      <div className="TABLE flex flex-col my-4 overflow-auto relative">
        {/* Header */}
        <div
          className={` ${background} HEADER flex items-center  gap-x-4 text-sm font-extrabold border-b justify-between w-fit min-w-full sticky top-0 rounded  ${
            redTable
              ? "text-white tertiary-color-bg py-4 rounded-md px-4"
              : " text-black p-4"
          } `}
        >
          {headers.map((header, index) => {
            return (
              <div
                className={`${width} ${firstChildWidth}`}
                key={header.headerId}
              >
                {header.headerName}
              </div>
            );
          })}
        </div>
        {/* Rows */}
        <div
          className={`ROWS  ${heightDesktop ? heightDesktop : "md:h-[42vh]"} ${
            heightMobile ? heightMobile : "h-[30vh]"
          } `}
        >
          {/* new refined code  */}

          {data ? (
            <>
              {data?.map((row, index) => {
                return (
                  <div
                    key={index}
                    className={`ROW flex items-center gap-x-4 dark:text-[#F0EDFF] text-[#202224] text-[14px] font-semibold border-b border-[#d5d5d5] py-4 justify-between w-fit min-w-full break-words px-4 ${
                      redTable ? "px-4" : ""
                    } `}
                  >
                    {headers.map((header, index) => {
                      switch (header.headerId) {
                        case "action":
                          return (
                            <div
                              className={`text-[#E12228] cursor-pointer ${width}`}
                              key={header.headerId}
                              onClick={() => handleOnClick(row)}
                            >
                              {isValidator
                                ? row?.status === "Approved" ||
                                  row?.status === "Rejected"
                                  ? "View"
                                  : "Validate"
                                : "Validate"}
                            </div>
                          );
                        case "product":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.product?.name === null
                                ? "N/A"
                                : row?.product?.name}
                            </div>
                          );
                        case "subcategory":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.product?.subcategory[0]?.slug === null
                                ? "N/A"
                                : row?.product?.subcategory[0]?.slug}
                            </div>
                          );
                        case "view":
                          return (
                            <div
                              className={`tertiary-color-text cursor-pointer ${width}`}
                              key={header.headerId}
                              onClick={() => handleOnClick(row)}
                            >
                              <svg
                                width="49"
                                height="32"
                                viewBox="0 0 49 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.3"
                                  y="0.3"
                                  width="48.4"
                                  height="31.4"
                                  rx="7.7"
                                  fill="#FAFBFD"
                                  stroke="#D5D5D5"
                                  stroke-width="0.6"
                                />
                                <g opacity="0.6">
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M24.6966 17.424L22.2219 17.778L22.5753 15.3027L28.9393 8.93867C29.525 8.35288 30.4748 8.35288 31.0606 8.93867C31.6464 9.52446 31.6464 10.4742 31.0606 11.06L24.6966 17.424Z"
                                    stroke="black"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M28.2319 9.646L30.3533 11.7673"
                                    stroke="black"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M28.5 17.5V22.5C28.5 23.0523 28.0523 23.5 27.5 23.5H17.5C16.9477 23.5 16.5 23.0523 16.5 22.5V12.5C16.5 11.9477 16.9477 11.5 17.5 11.5H22.5"
                                    stroke="black"
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                              </svg>
                            </div>
                          );
                        case "submitted_kyc_count":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row[header.headerId]} ({row?.total_planned})
                            </div>
                          );
                        case "pending_kyc_count":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row[header.headerId]} ({row?.total_planned})
                            </div>
                          );
                        case "Central":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.opted[0][header.headerId]} (
                              {row?.selected[0][header.headerId]})
                            </div>
                          );
                        case "North":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.opted[0][header.headerId]} (
                              {row?.selected[0][header.headerId]})
                            </div>
                          );
                        case "South":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.opted[0][header.headerId]} (
                              {row?.selected[0][header.headerId]})
                            </div>
                          );
                        case "East":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.opted[0][header.headerId]} (
                              {row?.selected[0][header.headerId]})
                            </div>
                          );
                        case "West":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row?.opted[0][header.headerId]} (
                              {row?.selected[0][header.headerId]})
                            </div>
                          );
                        case "dateUploaded":
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {new Date(row.file.uploaded_at).toLocaleString()}
                            </div>
                          );

                        default:
                          return (
                            <div
                              className={`${width} whitespace-break-spaces ${firstChildWidth} `}
                              key={header.headerId}
                            >
                              {row[header.headerId] === null
                                ? "N/A"
                                : row[header.headerId]}
                            </div>
                          );
                      }
                    })}
                  </div>
                );
              })}

              {/* Display "Grand Total" row after rendering data rows */}
              {grandTotalRow && (
                <div
                  className={`ROW gap-x-4 flex items-center text-[#000] text-[12px] font-bold border-b py-4 justify-between w-fit min-w-full ${
                    redTable ? "px-4" : ""
                  } `}
                >
                  {headers.map((header, index) => {
                    switch (header.headerId) {
                      default:
                        return (
                          <div
                            className={`${width} ${firstChildWidth}`}
                            key={header.headerId}
                          >
                            {grandTotalRow[header.headerId]}
                          </div>
                        );
                    }
                  })}
                </div>
              )}

              {/* Display pagination controls */}
              <div className="pagination w-full flex flex-wrap justify-between items-center gap-2 my-4 px-4">
                {/* <div>
                  Total Pages :{" "}
                  <span className="text-[#e12228]">{totalPages}</span>{" "}
                </div> */}
                <div className="text-sm font-semibold">
                  Showing {startIndex}-{endIndex} of {accurateTotalItems}
                </div>

                <div className="md:block hidden border border-[#D5D5D5] rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    className={`${
                      currentPage === 1 ? "text-gray-400" : ""
                    } bg-[#FAFBFD] p-2 `}
                    disabled={currentPage === 1}
                  >
                    <FaAngleLeft />
                  </button>
                  {/* <span className="">{currentPage}</span> */}
                  <button
                    className={`${
                      currentPage === totalPages ? "text-gray-400" : ""
                    } bg-[#FAFBFD] p-2`}
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    disabled={currentPage === totalPages}
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
              <div className="md:hidden w-full flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  className={`${
                    currentPage === 1 ? "text-gray-400" : ""
                  } bg-red-300 p-2 rounded-lg `}
                  disabled={currentPage === 1}
                >
                  <FaAngleLeft />
                </button>
                <span className="]">{currentPage}</span>
                <button
                  className={`${
                    currentPage === totalPages ? "text-gray-400" : ""
                  } bg-red-300 p-2 rounded-lg`}
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  <FaAngleRight />
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              <p className="font-bold text-sm">
                {isError ? "Error Fetching Data" : "Loading..."}
              </p>
            </div>
          )}

          {data?.length === 0 && (
            <div className="flex justify-center items-center h-full w-full">
              <p className="font-bold text-sm">No Data Found</p>
            </div>
          )}
          {/* ends here  */}
        </div>
      </div>
    </div>
  );
}

export default LsmTablePaginated;
