import React from "react";
import { PDFReader } from "reactjs-pdf-reader";
import "./PdfViewer.css";
const PdfViewer = (props) => {
  return (
    <div className="pdf-container">
      <PDFReader showAllPage={true} url={props.url} />
    </div>
  );
};
export default PdfViewer;
