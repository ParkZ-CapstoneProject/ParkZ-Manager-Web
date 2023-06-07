import { Grid } from "@mui/material";
import React from "react";
import LeftItem from "./LeftItem";
import RightItem from "./RightItem";

const ParkingDetailInfo = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={5}
        sx={{ padding: "10px", marginLeft: "2px" }}
      >
        <Grid item xs={6}>
          <LeftItem />
        </Grid>
        <Grid item xs={6}>
          <RightItem />
        </Grid>
      </Grid>
    </>
  );
};

export default ParkingDetailInfo;
