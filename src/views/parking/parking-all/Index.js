import React, { useEffect } from "react";
import MyParkingAll from "./ParkingAll";
import { useState } from "react";
import Loading from "ui-component/back-drop/Loading";
import * as signalR from "@microsoft/signalr";
import { Typography } from "@mui/material";
import { ImFilesEmpty } from "react-icons/im";

const ParkingAll = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_BASE_URL_API_APP;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://parkzwebapiver2-001-site1.ctempurl.com/parkz")
    .build();
  console.log("connection", connection);

  connection
    .start()
    .then(() => console.log("Connection started!"))
    .catch((err) => console.error("Error: ", err));

  connection.on("LoadParkingInAdmin", () => {
    fetchData();
  });

  useEffect(() => {
    fetchData();
  }, []);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/parkings?managerId=${userData._id}&pageNo=1&pageSize=11`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const updateRow = (rowId, isActive) => {
  //   const updatedRows = rows.map((row) =>
  //     row.id === rowId ? { ...row, isActive } : row
  //   );
  //   setRows(updatedRows);
  // };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <MyParkingAll rows={rows} />
    </>
  );
};

export default ParkingAll;
