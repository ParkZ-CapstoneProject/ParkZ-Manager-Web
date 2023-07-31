import React, { useEffect, useState } from "react";
import ParkingPriceDetail from "./ParkingPriceDetail";
import { useParams } from "react-router";
import * as signalR from "@microsoft/signalr";

const PriceDetail = () => {
  const { priceId } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const signalRUrl = process.env.REACT_APP_BASE_URL_SIGNALR;

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${signalRUrl}`)
      .build();
    console.log("connection", connection);

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadTimelineInManager", () => {
      fetchDataPrice();
    });

    fetchDataPrice();

    return () => {
      connection.stop();
    };
  }, []);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

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

  return (
    <>
      <ParkingPriceDetail rows={rows} loading={loading} />
    </>
  );
};

export default PriceDetail;
