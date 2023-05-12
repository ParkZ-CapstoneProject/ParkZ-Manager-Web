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
import { Link, useNavigate } from "react-router-dom";

const EmailInput = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("data", data);
    navigate("/otp", { state: { formData: data.email } });
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
              Nhập Email
            </Typography>
            <Typography
              color={theme.palette.secondary.dark}
              variant={matchDownSM ? "subtitle2" : "subtitle2"}
            >
              Nhập Email đã đăng ký vào hệ thống của chúng tôi
            </Typography>
          </Stack>
        </Grid>

        <form onSubmit={handleSubmit} method="post">
          <Grid item>
            <Stack justifyContent="center" spacing={1}>
              <Typography
                color={theme.palette.secondary.dark}
                gutterBottom
                variant={matchDownSM ? "h5" : "h4"}
              >
                Nhập Email
              </Typography>
              <TextField
                fullWidth
                required
                sx={{ width: "500px" }}
                inputProps={{ maxLength: 100 }}
                type="email"
                name="email"
                value={email}
                label="Email"
                color="secondary"
                onChange={handleInputEmail}
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
          </Grid>
          <Grid
            item
            justifyContent="center"
            sx={{ marginTop: "8%", marginLeft: "33%" }}
          >
            <NextButton />
          </Grid>
        </form>
      </Grid>
    </Layout>
  );
};

export default EmailInput;
