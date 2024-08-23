import React, { useState } from "react";

function ImageComponent({ url }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* The small image */}
      <img
        src={url}
        alt="File Preview"
        className="w-24 cursor-pointer rounded-md"
        onClick={openModal}
      />

      {/* Modal for the enlarged image */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <img
              src={url}
              alt="Enlarged File Preview"
              className="max-h-full max-w-full rounded-md"
            />
            <button
              onClick={closeModal}
              className="absolute right-0 top-0 rounded-full  bg-opacity-75 p-2 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageComponent;
