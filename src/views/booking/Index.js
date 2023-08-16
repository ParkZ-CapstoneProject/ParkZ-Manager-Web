import React, { useEffect } from "react";
import DataTable from "./Booking";
import { useState } from "react";
// import * as signalR from "@microsoft/signalr";

const Booking = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  // const signalRUrl = 'https://parkzserver-001-site1.btempurl.com/parkz';
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl(`${signalRUrl}`)
  //     .build();
  //   console.log("connection", connection);

  //   connection
  //     .start()
  //     .then(() => console.log("Connection started!"))
  //     .catch((err) => console.error("Error: ", err));

  //   connection.on("LoadKeeperAccounts", () => {
  //     fetchData();
  //   });

  //   fetchData();

  //   return () => {
  //     connection.stop();
  //   };
  // }, []);

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
      `${apiUrl}/booking-management/request/${userData._id}?pageNo=1&pageSize=11`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    // console.log("data.data", data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DataTable rows={rows} loading={loading} />
    </>
  );
};

export default Booking;
