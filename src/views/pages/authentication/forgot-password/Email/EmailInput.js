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
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Swal from "sweetalert2";
// import "./Email.scss";

const EmailInput = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState(false);

  const navigate = useNavigate();

  const apiLink = process.env.REACT_APP_BASE_URL_API_APP;
  // console.log("apiLink", apiLink);

  const handleInputEmail = (event) => {
    const { value } = event.target;

    const startsWithSpace = /^\s/.test(value);
    // Remove any spaces from the input value
    if (!startsWithSpace) {
      setEmail(value);
      setErrorEmail(!validator.isEmail(value));
    } else {
      setErrorEmail(true);
    }
    // setSpaceInput(newEmail.trim().length === 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let otpEntity = { email: email };
    fetch(`${apiLink}/otp-management`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otpEntity),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.statusCode !== 201) {
          console.log("Message", data.message);
          Swal.fire({
            icon: "error",
            title: "Không tìm thấy",
            text: `${data.message}`,
          });
        } else {
          const formData = new FormData(event.target);
          const data2 = Object.fromEntries(formData.entries());
          navigate("/otp", { state: { formData: data2.email } });
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
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
                error={errorEmail}
                helperText={errorEmail ? "Vui lòng nhập đúng email" : ""}
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

        <div id="swal-container"></div>
      </Grid>
    </Layout>
  );
};

export default EmailInput;
