import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTableItem from "./DataTableItem";
import { useParams } from "react-router";
import Loading from "ui-component/back-drop/Loading";

const BoxContent = ({ name, value }) => {
  return (
    <Box
      sx={{
        border: "none",
        p: 2,
        background: "#2C97EB",
        width: 260,
        height: 170,
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" color="#fff" sx={{ mb: 1 }}>
        {name}
      </Typography>
      <Typography
        variant="h1"
        color="#fff"
        sx={{ textAlign: "center", marginTop: "10%", fontSize: "50px" }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const HistoryBooking = () => {
  const { parkingId } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBooking, setTotalBooking] = useState(0);
  const [cancelBooking, setCancelBooking] = useState(0);
  const [doneBooking, setDoneBooking] = useState(0);
  const [bookingDay, setBookingDay] = useState(0);
  const [bookingWatining, setBookingWatining] = useState(0);

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
      `${apiUrl}/booking-management/parkings/${parkingId}?pageNo=1&pageSize=11`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    console.log("data.data", data.data);
    setLoading(false);
  };

  const fetchBookingDoneCancel = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/chart/pie/parkings/${parkingId}/done-cancel-booking`,
      requestOptions
    );
    const data = await response.json();
    setDoneBooking(data.data.numberOfDoneBooking);
    setCancelBooking(data.data.numberOfCancelBooking);
    console.log("data.data", data.data);
    setLoading(false);
  };

  const fetchBookingDayWatting = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/chart/card/parkings/${parkingId}/statistic-card`,
      requestOptions
    );
    const data = await response.json();
    setTotalBooking(data.data.numberOfOrders);
    setBookingDay(data.data.numberOfOrdersInCurrentDay);
    setBookingWatining(data.data.waitingOrder);
    console.log("data.data", data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchBookingDoneCancel();
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        spacing={3}
        sx={{ marginTop: "2px" }}
      >
        <Grid item xs={2.2}>
          <BoxContent name="Tổng số đơn" value={totalBooking} />
        </Grid>
        <Grid item xs={2.2}>
          <BoxContent name="Đơn hoàn thành" value={doneBooking} />
        </Grid>
        <Grid item xs={2.2}>
          <BoxContent name="Đơn trong ngày" value={bookingDay} />
        </Grid>
        <Grid item xs={2.2}>
          <BoxContent name="Số đơn hủy" value={cancelBooking} />
        </Grid>
        <Grid item xs={2.2}>
          <BoxContent name="Số đơn chờ" value={bookingWatining} />
        </Grid>
      </Grid>

      <DataTableItem rows={rows} />
    </>
  );
};

export default HistoryBooking;
