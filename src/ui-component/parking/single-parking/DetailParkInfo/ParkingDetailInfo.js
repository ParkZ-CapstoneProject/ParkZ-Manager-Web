import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftItem from "./LeftItem";
import RightItem from "./RightItem";
import { useNavigate, useParams } from "react-router";
import Loading from "ui-component/back-drop/Loading";
import Swal from "sweetalert2";

const ParkingDetailInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = "https://parkzapi.azurewebsites.net/api";
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
    const response = await fetch(`${apiUrl}/parkings/${id}`, requestOptions);

    const data = await response.json();
    if (data.data) {
      setData(data.data.parkingEntity);
      setLoading(false);
    } else {
      Swal.fire({
        icon: "error",
        text: data.message,
        confirmButtonText: "Trở lại",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/parkings");
        }
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log("data log", data?.description);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={5}
        sx={{ padding: "10px", marginLeft: "2px" }}
      >
        <Grid item xs={6}>
          <LeftItem data={data} />
        </Grid>
        <Grid item xs={6}>
          <RightItem data={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default ParkingDetailInfo;
