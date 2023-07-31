import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "ui-component/back-drop/Loading";
import * as signalR from "@microsoft/signalr";
import MyVNPay from "./VNPay";

const VNPay = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_BASE_URL_API_APP;
  const signalRUrl = process.env.REACT_APP_BASE_URL_SIGNALR;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${signalRUrl}`)
      .build();

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadVnPays", () => {
      fetchData();
    });

    fetchData();

    return () => {
      connection.stop();
    };
  }, []);

  // useEffect(() => {
  //   fetchData();
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
      `${apiUrl}/vnpay/user/${userData._id}`,
      requestOptions
    );
    const data = await response.json();
    console.log("data.data", data.data);
    setRows(data.data);
    setLoading(false);
  };

  if (loading) {
    return <Loading loading={loading} />;
  }
  console.log("type: ", typeof rows);

  return (
    <>
      <MyVNPay rows={rows} />
    </>
  );
};

export default VNPay;
