import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ParkingLocation from "./ParkingLocation";

const LeftItem = ({ data }) => {
  const theme = useTheme();
  // const markerPosition = [data?.latitude, data?.longitude];
  // console.log("markerPosition", markerPosition);

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
              {data?.name}
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
            {data?.address}
          </Typography>
        </Grid>
        {/* <Grid item xs={3}>
          <ParkingLocation markerPosition={markerPosition} />
        </Grid> */}
      </Grid>
    </>
  );
};

export default LeftItem;
