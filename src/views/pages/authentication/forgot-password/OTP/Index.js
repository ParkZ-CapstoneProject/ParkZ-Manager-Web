import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Layout } from "ui-component/auth/layout";
import NextButton from "ui-component/buttons/next-button/NextButton";
import BackButton from "ui-component/buttons/back-button/BackButton";
import CountTime from "./CountTime";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const OTP = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [otp, setOTP] = useState();
  const location = useLocation();
  const { formData } = location.state;
  // console.log(formData);
  const navigate = useNavigate();
  const handleInputOTP = (e) => {
    setOTP(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    let verifyEntity = { email: formData, otpCode: otp };
    fetch("https://parkzapi.azurewebsites.net/api/otp-management/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyEntity),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((dataRes) => {
        if (dataRes.statusCode !== 201) {
          console.log("Message", dataRes.message);
        } else {
          // const formData = new FormData(event.target);
          // const data= Object.fromEntries(formData.entries());
          // console.log("data2", data2);
          navigate("/new-password", { state: { formData: formData } });
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
    // navigate("/otp", { state: { formData: data } });
  };

  return (
    <Layout>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        marginTop="5%"
      >
        <Grid item xs={12}>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            marginBottom="15%"
          >
            <Typography
              color={theme.palette.secondary.main}
              gutterBottom
              variant={matchDownSM ? "h2" : "h1"}
            >
              Nhập OTP
            </Typography>

            <Typography
              color={theme.palette.secondary.dark}
              variant={matchDownSM ? "subtitle2" : "subtitle1"}
            >
              Nhập mã OTP
            </Typography>
          </Stack>
        </Grid>

        <Grid item>
          <form onSubmit={handleSubmit} method="post">
            <Stack xs={12} justifyContent="center" spacing={1}>
              <Typography
                color={theme.palette.secondary.dark}
                gutterBottom
                variant={matchDownSM ? "h5" : "h4"}
              >
                Nhập OTP
              </Typography>
              <TextField
                fullWidth
                required
                sx={{ width: "500px" }}
                inputProps={{ maxLength: 100 }}
                type="number"
                name="otp"
                // value={userData["email"]}
                label="OTP"
                color="secondary"
                onChange={handleInputOTP}
                // error={errorEmail || spaceInput}
                // helperText={
                //   spaceInput
                //     ? "Không nhập khoảng cách"
                //     : errorEmail
                //     ? "Vui lòng nhập đúng email"
                //     : ""
                // }
              />
            </Stack>

            <Grid item xs={6} sx={{ marginTop: "3%" }}>
              <CountTime />
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              xs={12}
              marginTop="5%"
              marginLeft="7%"
            >
              <Grid item xs={5}>
                <BackButton />
              </Grid>
              <Grid item xs={5}>
                <NextButton />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OTP;
