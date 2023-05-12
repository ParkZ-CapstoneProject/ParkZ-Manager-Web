import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

const App = () => {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrReaderRef = useRef(null);

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  const openScanner = () => {
    if (qrReaderRef.current) {
      qrReaderRef.current.openImageDialog();
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <button onClick={openScanner}>Open Scanner</button>
      <QrReader
        ref={qrReaderRef}
        delay={300}
        style={{ width: "50%" }}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
      />
      <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
    </div>
  );
};

export default App;
