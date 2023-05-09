import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Layout } from "ui-component/auth/layout";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
// import NextButton from "ui-component/buttons/next-button/NextButton";
import SaveButton from "ui-component/buttons/save-button/SaveButton";

const NewPassword = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Layout>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        marginTop="2%"
      >
        <form>
          <Grid item xs={12}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              marginBottom="10%"
            >
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? "h2" : "h1"}
              >
                Tạo mật khẩu mới
              </Typography>
              {/* <Typography
              color={theme.palette.secondary.dark}
              variant={matchDownSM ? "subtitle2" : "subtitle2"}
            >
              Nhập Email đã đăng ký vào hệ thống của chúng tôi
            </Typography> */}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography
                color={theme.palette.secondary.dark}
                gutterBottom
                variant={matchDownSM ? "h5" : "h4"}
                marginTop="8%"
              >
                Mật khẩu mới
              </Typography>
              <TextField
                fullWidth
                sx={{ width: "500px" }}
                required
                type="password"
                name="password"
                label="Mật khẩu"
                color="secondary"
                //     value={userData["password"]}
                //     error={spaceInput}
                //     onChange={handlePasswordChange}
                //     helperText={spaceInput ? "Vui lòng không nhập khoảng trống" : ""}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography
                color={theme.palette.secondary.dark}
                gutterBottom
                variant={matchDownSM ? "h5" : "h4"}
                marginTop="8%"
              >
                Nhập lại mật khẩu
              </Typography>
              <TextField
                fullWidth
                sx={{ width: "500px" }}
                required
                type="password"
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                color="secondary"
                // value={userData["confirmPassword"]}
                // onChange={handleConfirmPasswordChange}
                // error={!passwordsMatch || spaceInput}
                // helperText={
                //   !passwordsMatch
                //     ? "Mật khẩu không khớp"
                //     : spaceInput
                //     ? "Vui lòng không nhập khoảng trống"
                //     : ""
                // }
              />
            </Stack>

            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              marginTop="5%"
              spacing={3}
            >
              <Grid item xs={6} alignItems="center">
                <CancelButton />
              </Grid>
              <Grid item xs={6}>
                <SaveButton />
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
            <NextButton />
          </Stack> */}
          </Grid>
        </form>
      </Grid>
    </Layout>
  );
};

export default NewPassword;
