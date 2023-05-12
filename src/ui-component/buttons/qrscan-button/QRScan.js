import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

const QRScan = () => {
  const [result, setResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const qrReaderRef = useRef(null);

  const openScanner = () => {
    if (qrReaderRef.current) {
      qrReaderRef.current.openImageDialog(); // Opens the file picker to choose an image or starts the camera
    }
  };

  return (
    <div>
      <Button onClick={openScanner}>Open Scanner</Button>
      <QrReader
        ref={qrReaderRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{result}</p>
    </div>
  );
};

export default QRScan;
