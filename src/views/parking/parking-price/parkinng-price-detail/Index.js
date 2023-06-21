import React, { useEffect, useState } from "react";
import ParkingPriceDetail from "./ParkingPriceDetail";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { ImFilesEmpty } from "react-icons/im";

const PriceDetail = () => {
  const { priceId } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const apiUrl = process.env.REACT_APP_BASE_URL_API_APP;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  useEffect(() => {
    const fetchDataPrice = async () => {
      setLoading(true);
      const res = await fetch(
        `${apiUrl}/timeline-management/${priceId}?pageNo=1&pageSize=11`,
        requestOptions
      );

      const data = await res.json();
      console.log("data", data.data);

      setRows(data.data);
      setLoading(false);
    };

    fetchDataPrice();
  }, []);

  return (
    <>
      {rows ? (
        <ParkingPriceDetail rows={rows} loading={loading} />
      ) : (
        <>
          <Typography
            variant="h1"
            color="#21130d"
            sx={{ textAlign: "center", marginTop: "15%" }}
          >
            Không tìm thấy dữ liệu
          </Typography>
          <ImFilesEmpty
            style={{ fontSize: "150px", marginTop: "5%", marginLeft: "46%" }}
          />
        </>
      )}
    </>
  );
};

export default PriceDetail;
