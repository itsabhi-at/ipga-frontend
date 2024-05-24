"use client";
import React from "react";

function CustomTableLsm({
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
  background,
  customPaddingHeader,
  customPaddingRow,
  customRadius,
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

  return (
    <div className="">
      <div className="TABLE flex flex-col relative w-full overflow-auto rounded-[14px]">
        {/* Header */}
        <div
          className={` ${customPaddingHeader} ${background} HEADER flex items-center  gap-x-4 text-base font-semibold border-b justify-between w-fit min-w-full sticky top-0 rounded ${customRadius}  py-4 ${
            redTable
              ? "text-white tertiary-color-bg py-4 rounded-md px-4"
              : " text-[#0A0A0A]"
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
          className={`ROWS   ${heightDesktop ? heightDesktop : "md:h-[42vh]"} ${
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
                    className={`ROW ${customPaddingRow} flex items-center gap-x-4 dark:text-[#F0EDFF] text-[#202224] text-[12px] font-bold border-b justify-between w-fit min-w-full break-words py-4 ${
                      redTable ? "px-4" : ""
                    } `}
                  >
                    {headers.map((header, index) => {
                      switch (header.headerId) {
                        case "action":
                          return (
                            <div
                              className={`tertiary-color-text cursor-pointer ${width}`}
                              key={header.headerId}
                              onClick={() => handleOnClick(row)}
                            >
                              {isValidator
                                ? row?.status === "Approved"
                                  ? ""
                                  : "Validate"
                                : "Validate"}
                            </div>
                          );
                        case "status":
                          return (
                            <div
                              className={`tertiary-color-text cursor-pointer ${width}`}
                              key={header.headerId}
                              onClick={() => handleOnClick(row)}
                            >
                              <svg
                                width="93"
                                height="27"
                                viewBox="0 0 93 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  opacity="0.2"
                                  width="93"
                                  height="27"
                                  rx="4.5"
                                  fill="#BA29FF"
                                />
                                <path
                                  d="M20.9787 18V9.54H22.5147V18H20.9787ZM24.2097 18V12.132H25.6737V13.044C25.8737 12.708 26.1417 12.452 26.4777 12.276C26.8217 12.1 27.2057 12.012 27.6297 12.012C29.0137 12.012 29.7057 12.816 29.7057 14.424V18H28.2057V14.496C28.2057 14.04 28.1177 13.708 27.9417 13.5C27.7737 13.292 27.5097 13.188 27.1497 13.188C26.7097 13.188 26.3577 13.328 26.0937 13.608C25.8377 13.88 25.7097 14.244 25.7097 14.7V18H24.2097ZM36.6476 18V10.824H33.7436V9.54H41.0876V10.824H38.1836V18H36.6476ZM40.9792 18V12.132H42.4432V13.164C42.7312 12.468 43.3472 12.084 44.2912 12.012L44.7472 11.976L44.8432 13.248L43.9792 13.332C42.9952 13.428 42.5032 13.932 42.5032 14.844V18H40.9792ZM47.5518 18.12C47.1278 18.12 46.7478 18.04 46.4118 17.88C46.0838 17.712 45.8238 17.488 45.6318 17.208C45.4478 16.928 45.3558 16.612 45.3558 16.26C45.3558 15.828 45.4678 15.488 45.6918 15.24C45.9158 14.984 46.2798 14.8 46.7838 14.688C47.2878 14.576 47.9638 14.52 48.8118 14.52H49.2318V14.268C49.2318 13.868 49.1438 13.58 48.9678 13.404C48.7918 13.228 48.4958 13.14 48.0798 13.14C47.7518 13.14 47.4158 13.192 47.0718 13.296C46.7278 13.392 46.3798 13.544 46.0278 13.752L45.5958 12.732C45.8038 12.588 46.0478 12.464 46.3278 12.36C46.6158 12.248 46.9158 12.164 47.2278 12.108C47.5478 12.044 47.8478 12.012 48.1278 12.012C48.9838 12.012 49.6198 12.212 50.0358 12.612C50.4518 13.004 50.6598 13.616 50.6598 14.448V18H49.2558V17.064C49.1198 17.392 48.9038 17.652 48.6078 17.844C48.3118 18.028 47.9598 18.12 47.5518 18.12ZM47.8638 17.088C48.2558 17.088 48.5798 16.952 48.8358 16.68C49.0998 16.408 49.2318 16.064 49.2318 15.648V15.384H48.8238C48.0718 15.384 47.5478 15.444 47.2518 15.564C46.9638 15.676 46.8198 15.884 46.8198 16.188C46.8198 16.452 46.9118 16.668 47.0958 16.836C47.2798 17.004 47.5358 17.088 47.8638 17.088ZM52.1823 18V12.132H53.6463V13.044C53.8463 12.708 54.1143 12.452 54.4503 12.276C54.7943 12.1 55.1783 12.012 55.6023 12.012C56.9863 12.012 57.6783 12.816 57.6783 14.424V18H56.1783V14.496C56.1783 14.04 56.0903 13.708 55.9143 13.5C55.7463 13.292 55.4823 13.188 55.1223 13.188C54.6823 13.188 54.3303 13.328 54.0663 13.608C53.8103 13.88 53.6823 14.244 53.6823 14.7V18H52.1823ZM61.3499 18.12C60.8539 18.12 60.3899 18.06 59.9579 17.94C59.5259 17.82 59.1659 17.648 58.8779 17.424L59.2619 16.44C59.5579 16.64 59.8899 16.796 60.2579 16.908C60.6259 17.012 60.9939 17.064 61.3619 17.064C61.7459 17.064 62.0299 17 62.2139 16.872C62.4059 16.736 62.5019 16.56 62.5019 16.344C62.5019 16.008 62.2539 15.792 61.7579 15.696L60.5579 15.468C59.5419 15.276 59.0339 14.748 59.0339 13.884C59.0339 13.5 59.1379 13.168 59.3459 12.888C59.5619 12.608 59.8579 12.392 60.2339 12.24C60.6099 12.088 61.0419 12.012 61.5299 12.012C61.9459 12.012 62.3459 12.072 62.7299 12.192C63.1139 12.304 63.4419 12.476 63.7139 12.708L63.3059 13.692C63.0739 13.5 62.7939 13.348 62.4659 13.236C62.1459 13.124 61.8379 13.068 61.5419 13.068C61.1499 13.068 60.8579 13.136 60.6659 13.272C60.4819 13.408 60.3899 13.588 60.3899 13.812C60.3899 14.164 60.6179 14.38 61.0739 14.46L62.2739 14.688C62.7939 14.784 63.1859 14.96 63.4499 15.216C63.7219 15.472 63.8579 15.816 63.8579 16.248C63.8579 16.832 63.6299 17.292 63.1739 17.628C62.7179 17.956 62.1099 18.12 61.3499 18.12ZM64.9653 10.872V9.408H66.6453V10.872H64.9653ZM65.0613 18V12.132H66.5613V18H65.0613ZM70.8078 18.12C69.2558 18.12 68.4798 17.352 68.4798 15.816V13.26H67.3518V12.132H68.4798V10.38H69.9798V12.132H71.7558V13.26H69.9798V15.732C69.9798 16.116 70.0638 16.404 70.2318 16.596C70.3998 16.788 70.6718 16.884 71.0478 16.884C71.1598 16.884 71.2758 16.872 71.3958 16.848C71.5158 16.816 71.6398 16.784 71.7678 16.752L71.9958 17.856C71.8518 17.936 71.6678 18 71.4438 18.048C71.2278 18.096 71.0158 18.12 70.8078 18.12Z"
                                  fill="#BA29FF"
                                />
                              </svg>
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
                        case "total_quantity_sold":
                          return (
                            <div
                              className={`text-white cursor-pointer ${width}`}
                              key={header.headerId}
                            >
                              &#8377; {row[header.headerId]}
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

export default CustomTableLsm;
