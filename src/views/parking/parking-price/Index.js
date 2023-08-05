import React, { useEffect, useState } from "react";
import MyParkingPrice from "./ParkingPrice";
import * as signalR from "@microsoft/signalr";

const ParkingPrice = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const signalRUrl = "https://parkzserver-001-site1.btempurl.com/parkz";

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${signalRUrl}`)
      .build();
    console.log("connection", connection);

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadParkingPrice", () => {
      fetchDataPrice();
    });

    fetchDataPrice();

    return () => {
      connection.stop();
    };
  }, []);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

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
      `${apiUrl}/parking-price?ManagerId=${userData._id}&PageNo=1&PageSize=11`,
      requestOptions
    );

    const data = await res.json();
    console.log("data", data.data);

    setRows(data.data);
    setLoading(false);
  };

  return (
    <>
      <MyParkingPrice rows={rows} loading={loading} />
    </>
  );
};

export default ParkingPrice;
