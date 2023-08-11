import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom/dist";
import ContinueLogin from "ui-component/buttons/continue-login/ContinueLogin";
import Lottie from "react-lottie";
import animationData from "../../assets/json/animation_ll60aohe.json";

const FailReCharge = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleOnclick = () => {
    navigate("/wallet");
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        // spacing={3}
        sx={{
          width: "100%",
          height: "955px",
          background: "rgb(137 156 171 / 50%)",
        }}
      >
        <Grid item>
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            // isStopped={isStopped}
            // isPaused={isPaused}
          />
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            variant="h1"
            paddingBottom={1}
          >
            Giao dịch thất bại
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.secondary.dark}
            variant="h2"
            paddingBottom={1}
          >
            Rất tiếc vì giao dịch của bạn đã hủy và thất bại
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.secondary.dark} variant="h2">
            Vui lòng trở lại ví để nạp tiền!
          </Typography>
        </Grid>
        <Stack sx={{ marginTop: "12px" }}>
          <ContinueLogin onClick={handleOnclick} text="Trở Lại Ví" />
        </Stack>
      </Grid>
    </>
  );
};

export default FailReCharge;
