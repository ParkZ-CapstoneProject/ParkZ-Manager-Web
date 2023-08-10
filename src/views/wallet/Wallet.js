import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "ui-component/back-drop/Loading";
import RechargeButton from "ui-component/buttons/recharge-button/RechargeButton";
import MainCard from "ui-component/cards/MainCard";
import Balance from "ui-component/cards/Wallet/Balance/Balance";
import Debt from "ui-component/cards/Wallet/Debt/Debt";
import RechargeModal from "ui-component/modal/wallet/Recharge/RechargeModal";

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/customer/wallet/${userData._id}`,
      requestOptions
    );
    const data = await response.json();
    setData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    <Loading loading={loading} />;
  }

  return (
    <>
      <MainCard title="Ví của bạn">
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <RechargeButton onClick={handleOpenModal} />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          padding={5}
        >
          <Grid item xs={3}>
            <Balance data={data} />
          </Grid>
          <Grid item xs={3}>
            <Debt data={data} />
          </Grid>
        </Grid>
      </MainCard>

      <RechargeModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Wallet;
