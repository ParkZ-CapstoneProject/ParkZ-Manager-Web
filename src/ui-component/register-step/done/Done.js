import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom/dist";

const Done = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/login2");
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <img
            src="https://img.freepik.com/premium-vector/done-green-sign-icon-web-app-check-mark-sign-vector-stock-illustration_100456-5937.jpg?w=2000"
            alt="done"
            width={700}
            height={300}
          />
        </Grid>
        <Grid item>
          <Typography color={theme.palette.primary.main} variant="h1">
            Hoàn Thành
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.secondary.dark} variant="h2">
            Chúc mừng bạn đã đăng ký thành công!
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.secondary.dark} variant="h2">
            Vui lòng kiểm tra Email để lấy tài khoản
          </Typography>
        </Grid>
        <Stack>
          <Button
            fullWidth
            size="large"
            sx={{
              mt: 3,
              borderRadius: "10px",
              backgroundColor: "#063970",
              ":is(:hover, :focus)": {
                backgroundColor: "#478be9",
                outline: "3px solid #478be9",
                outlineOffset: "1px",
              },
            }}
            type="submit"
            variant="contained"
            onClick={handleOnclick}
          >
            Tiếp tục đăng nhập
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default Done;
