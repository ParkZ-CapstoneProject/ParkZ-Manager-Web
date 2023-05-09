import React from "react";
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

const OTP = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
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
          <form>
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
                // onChange={handleInputEmail}
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
            >
              <Grid item xs={6}>
                <BackButton />
              </Grid>
              <Grid item xs={6} sx={{ marginTop: "-3%" }}>
                <NextButton />
              </Grid>
            </Grid>

            {/* <Stack sx={{ marginTop: "8%" }}>
            <Button
              fullWidth
              size="large"
              sx={{
                mt: 3,
                borderRadius: "7px",
                backgroundColor: "#063970",
                ":is(:hover, :focus)": {
                  backgroundColor: "#478be9",
                  outline: "3px solid #478be9",
                  outlineOffset: "1px",
                },
              }}
              type="submit"
              variant="contained"
              onClick={handleNext}
              disabled={
                userData.email === undefined ||
                userData.password === undefined ||
                userData.confirmPassword === undefined
              }
            >
              Tiếp theo
            </Button>
          </Stack> */}
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OTP;
