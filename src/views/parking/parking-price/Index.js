import React, { useEffect, useState } from "react";
import MyParkingPrice from "./ParkingPrice";
import * as signalR from "@microsoft/signalr";
import { Typography } from "@mui/material";
import { ImFilesEmpty } from "react-icons/im";

const ParkingPrice = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://parkzwebapiver2-001-site1.ctempurl.com/parkz")
    .build();
  console.log("connection", connection);

  connection
    .start()
    .then(() => console.log("Connection started!"))
    .catch((err) => console.error("Error: ", err));

  connection.on("LoadParkingPrice", () => {
    fetchDataPrice();
  });

  useEffect(() => {
    fetchDataPrice();
  }, []);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  const apiUrl = process.env.REACT_APP_BASE_URL_API_APP;

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
      `${apiUrl}/parking-price?BusinessId=${userData._id}&PageNo=1&PageSize=11`,
      requestOptions
    );

    const data = await res.json();
    console.log("data", data.data);

    setRows(data.data);
    setLoading(false);
  };

  return (
    <>
      {rows ? (
        <MyParkingPrice rows={rows} loading={loading} />
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

export default ParkingPrice;
