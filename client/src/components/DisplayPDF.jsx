import { useState } from "react";
import { Document, Page } from "react-pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function DisplayPDF({ url }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <div className="w-full flex justify-around items-center relative">
        <div
          className="p-1 text-3xl text-gray-700 rounded-full cursor-pointer transition-all ease-linear duration-150 hover:text-black absolute left-4 md:left-8 z-10"
          onClick={() => {
            setPageNumber(pageNumber - 1);
            if (pageNumber <= 1) {
              setPageNumber(1);
            }
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className="w-full flex justify-center items-center">
          <Document
            file={url}
            className="flex justify-center items-center w-full max-w-screen-md mx-auto"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
        <div
          className="p-1 text-3xl text-gray-700 rounded-full cursor-pointer transition-all ease-linear duration-150 hover:text-black absolute right-4 md:right-8 z-10"
          onClick={() => {
            setPageNumber(pageNumber + 1);
            if (pageNumber >= numPages) {
              setPageNumber(numPages);
            }
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className="text-sm my-4 font-semibold text-gray-600">
        {pageNumber} of {numPages}
      </div>
    </div>
  );
}

export default DisplayPDF;
