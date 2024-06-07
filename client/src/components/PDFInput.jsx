import React, { FormEvent, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";
import pdfToText from "react-pdftotext";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContextProvider";

const PDFInput = ({
  text,
  setText,
  converted,
  setConverted,
  fileDisplay,
  setFileDisplay,
  pdfFileUrl,
  setInput,
  setPdfFileUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { chatText, setChatText } = useContext(ChatContext);
  const handleFileChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setPdfFileUrl(URL.createObjectURL(file));
      setFile(event.target.files[0]);
    }
  };
  const handlePDFSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    pdfToText(file)
      .then((text) => {
        setText(text);
        setChatText(text);
        setInput(text);
      })
      .catch((error) => console.error("Failed to extract text from pdf"));
    setFileDisplay(file);
    setConverted(true);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handlePDFSubmit}
      className="w-full flex flex-col justify-center items-center"
    >
      <label
        className="bg-white text-gray-500 w-full mt-10 mb-3 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
        htmlFor="uploadFile1"
      >
        <svg
          className="w-11 mb-2 fill-gray-500"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        Upload file
        <input
          className="hidden"
          type="file"
          name="pdf"
          accept=".pdf"
          onChange={handleFileChange}
          id="uploadFile1"
        />
        <p className="text-xs font-medium text-gray-400 mt-2">
          {file ? (
            <>File selected please press enter to continue</>
          ) : (
            <>Only PDF files are allowed.</>
          )}
        </p>
      </label>
      <button
        type="submit"
        className="bg-black flex justify-center items-center gap-2 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg"
      >
        {loading && <LuLoader2 className="animate-spin text-2xl text-white" />}
        <span>Upload</span>
      </button>
    </form>
  );
};

export default PDFInput;
