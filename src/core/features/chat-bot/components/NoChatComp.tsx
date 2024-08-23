import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Label, Select } from "../../../../components";
import classNames from "classnames";

function NoChatComp({
  selectedFiles,
  setSelectedFiles,
  fileInputRef,
  handleFileChange,
  selectedCount,
  setSelectedCount,
  LanguageOptions,
}: any) {
  return (
    <>
      <div className="flex flex-col gap-6">
        {!selectedFiles.length ? (
          <div className="">
            <div className="grid grid-flow-dense grid-cols-2 gap-12 max-sm:grid-cols-1 max-sm:gap-4">
              <div
                className="cursor-pointer rounded-md border border-slate-200 bg-[#edf1fd] px-4 py-3  "
                onClick={() => fileInputRef.current.click()}
              >
                <div className="flex items-center justify-center gap-4">
                  <img
                    src="/upload.png"
                    className="w-[4rem]"
                    alt="Upload Icon"
                  />
                  <div>
                    <h6 className="mb-1 text-base font-bold text-slate-600 ">
                      Upload a File
                    </h6>
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-md border border-slate-200 bg-[#edf1fd] px-4 py-3 "
                onClick={() => {
                  fileInputRef.current.setAttribute(
                    "accept",
                    "image/*;capture=camera"
                  );
                  fileInputRef.current.click();
                }}
              >
                <div className="flex items-center justify-center gap-4">
                  <img
                    src="/camera.png"
                    className="w-[4rem]"
                    alt="Camera Icon"
                  />
                  <div>
                    <h6 className="mb-1 text-base font-bold text-slate-600 ">
                      Take a picture
                    </h6>
                  </div>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
            </div>
          </div>
        ) : (
          <div>
            {selectedFiles.map((file: any, index: any) => {
              return (
                <div
                  key={index}
                  className="mb-2 flex items-center  gap-4 rounded-md bg-white p-4 border border-slate-200"
                >
                  {/* <img
              src={URL.createObjectURL(file)}
              alt=""
              className="h-24 w-24 rounded-md object-cover"
            /> */}
                  <div className="flex w-full items-center justify-between gap-2 ">
                    <h6 className="text-sm font-bold text-slate-600 ">
                      {file.name}
                    </h6>
                    <div className="flex gap-2">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="cursor-pointer text-red-500"
                        onClick={() => {
                          setSelectedFiles(
                            selectedFiles.filter((item: any) => item !== file)
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="flex w-full items-center justify-end">
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Submit
        </Button>
      </div> */}
          </div>
        )}
      </div>
      <div>
        <div className="w-full ">
          <div className="pt-3">
            <Label htmlFor="Count" className="mb-4">
              Choose your output language
            </Label>
            <Select
              onChange={(e: any) => {
                setSelectedCount(
                  LanguageOptions.find((item: any) => item.value === e)
                );
              }}
              // className={classNames({
              //   "cursor-not-allowed": true,
              // })}
              // disabled={true}
              selected={selectedCount}
              options={LanguageOptions}
              id="Language"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoChatComp;
