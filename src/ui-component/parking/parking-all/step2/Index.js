import React, { useState } from "react";
import SearchBox from "./SearchBox";
import MapParking from "./MapParking";
import MainCard from "ui-component/cards/MainCard";
import "./Index.scss";
import NextButton from "ui-component/buttons/next-button/NextButton";

const Maps = () => {
  const [searchResult, setSearchResult] = useState();

  return (
    <>
      <MainCard title="Chọn vị trí bãi xe">
        <div
          style={{
            display: "flex",
            width: "97vw",
            height: "75vh",
            position: "relative",
          }}
        >
          <div style={{ flex: "1", position: "relative" }}>
            <MapParking
              searchResult={searchResult}
              setSearchResult={setSearchResult}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "300px",
              transform: "translateX(-50%)",
              zIndex: 999,
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              padding: "5px",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <SearchBox setSearchResult={setSearchResult} />
          </div>
        </div>
      </MainCard>
      <div
        style={{
          display: "flex",
          marginRight: "20px",
          marginTop: "20px",
          justifyContent: "end",
        }}
      >
        <NextButton />
      </div>
    </>
  );
};

export default Maps;
