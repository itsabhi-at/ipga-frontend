"use client";
import React from "react";

function SielTable({
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
      <div className="TABLE flex flex-col mt-4 relative w-full overflow-auto">
        {/* Header */}
        <div
          className={` HEADER flex items-center  gap-x-4 text-sm font-bold border-b justify-between w-fit min-w-full sticky top-0 bg-[#FDB35F] rounded  ${
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
                    className={`ROW flex items-center gap-x-4 bg-[#747474] text-[#ffffff] text-[12px] font-bold border-b py-4 justify-between w-fit min-w-full break-words px-4 ${
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

export default SielTable;
