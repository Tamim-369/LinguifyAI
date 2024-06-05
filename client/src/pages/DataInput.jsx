import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { LuLoader2 } from "react-icons/lu";
import PDFInput from "../components/PDFInput";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdfjs } from "react-pdf";
import DisplayPDF from "../components/DisplayPDF";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
const DataInput = () => {
  const [uploadPDF, setUploadPDF] = useState(true);
  const [fileDisplay, setFileDisplay] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [converted, setConverted] = useState(false);
  const [pdfFileUrl, setPdfFileUrl] = useState(null);
  return (
    <div className="h-full min-h-[90%] w-full   overflow-hidden">
      <div className="button-group  flex justify-center items-center">
        {/* <div
          className={`rounded-xl ${
            uploadPDF ? "  transition-all ease-linear duration-150 " : ""
          } bg-white border border-gray-300 absolute z-10 shadow-lg top-[4.5rem] md:bottom-14 md:top-auto flex justify-center items-center`}
        >
          <button
            onClick={() => setUploadPDF(true)}
            className={`${
              uploadPDF
                ? "bg-gray-200 shadow-inner shadow-gray-400 border-r"
                : ""
            } bg-white px-4 py-2 rounded-l-xl`}
          >
            PDF
          </button>
          <button
            onClick={() => setUploadPDF(false)}
            className={`${
              !uploadPDF
                ? "bg-gray-200 shadow-inner shadow-gray-400 border-l"
                : ""
            } bg-white px-4 py-2 rounded-r-xl`}
          >
            Text
          </button>
        </div> */}
      </div>
      <div
        className={`${
          uploadPDF ? "flex" : "hidden"
        } p-2 w-full  h-[80dvh] sm:h-[85dvh] flex-col justify-start   flex items-center`}
      >
        {!converted ? (
          <PDFInput
            converted={converted}
            setConverted={setConverted}
            text={text}
            pdfFileUrl={pdfFileUrl}
            setPdfFileUrl={setPdfFileUrl}
            setText={setText}
            setInput={setInput}
            fileDisplay={fileDisplay}
            setFileDisplay={setFileDisplay}
          />
        ) : (
          <>
            {/* <div className="w-full h-full ">
              <DisplayPDF url={pdfFileUrl} />
            </div> */}
            <iframe
              src={`${pdfFileUrl}#toolbar=0`}
              height={"100%"}
              width={"100%"}
              className="border-8   rounded-xl custom-scrollbar border-gray-50 "
              frameBorder={0}
            />
          </>
        )}
      </div>
      <form
        className={`${
          uploadPDF ? "hidden" : "flex"
        } p-2 w-full min-h-[90%] flex pb-5 flex-col `}
      >
        <textarea
          name="textData"
          className="text-black w-full focus:outline-none p-3 rounded-md border-gray-300 border-2 h-[82dvh] mt-3"
          placeholder="Enter your text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default DataInput;
