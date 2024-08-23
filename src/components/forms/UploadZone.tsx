"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function UploadZone({ text, ...props }: any) {
  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div
      className="inline-flex border border-slate-200 dark:border-slate-800 p-1 w-28 rounded"
      key={file.name}
    >
      <img
        src={file.preview}
        className="block h-full w-auto"
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md px-4 py-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300 text-center mb-3">
            {text ? text : "Drag & Drop your files or"}
          </p>
          <div className="inline-flex px-2 py-1 rounded text-sm font-medium cursor-pointer bg-blue-600 text-white">
            Browse
          </div>
        </div>
      </div>
      {thumbs.length > 0 && (
        <div className="flex flex-wrap gap-2">{thumbs}</div>
      )}
    </div>
  );
}
export default UploadZone;
