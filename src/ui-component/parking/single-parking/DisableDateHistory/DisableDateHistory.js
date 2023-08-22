import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import TableData from "./TableData";

const DisableDateHistory = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

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
      `${apiUrl}/parkings/successed-history-disable-parking?parkingId=${id}`,
      requestOptions
    );

    const data = await response.json();
    if (data) {
      setRows(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography color={theme.palette.secondary.main} variant="h3">
        Lịch sử ngưng hoạt động bãi xe
      </Typography>

      <TableData rows={rows} loading={loading} />
    </>
  );
};

export default DisableDateHistory;
