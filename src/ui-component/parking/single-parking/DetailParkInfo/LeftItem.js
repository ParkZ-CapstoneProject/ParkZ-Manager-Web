import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ParkingLocation from "./ParkingLocation";

const LeftItem = () => {
  const theme = useTheme();

  return (
    <>
      <Grid container direction="column" spacing={5}>
        <Grid item container direction="row" justifyContent="space-around">
          <Grid item xs={6}>
            <Typography color={theme.palette.primary.main} variant="h3">
              Tên bãi
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color={theme.palette.common.black} variant="h4">
              Vinhome grandpark
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.primary.main} variant="h3">
            Địa chỉ
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.common.black} variant="h4">
            495A Đ. Cách Mạng Tháng 8, Phường 13, Quận 10, Thành phố Hồ Chí Minh
          </Typography>
        </Grid>
        {/* <Grid item xs={3}>
          <ParkingLocation />
        </Grid> */}
      </Grid>
    </>
  );
};

export default LeftItem;
