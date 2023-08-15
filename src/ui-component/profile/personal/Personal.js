import React from "react";
import { Avatar, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Information from "./Information";
import EditButton from "ui-component/buttons/edit-button/EditButton";

const Personal = (props) => {
  const { data } = props;
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={1}>
          <Avatar
            alt="avatar"
            src={data?.avatar}
            variant="circular"
            sx={{ width: "105%", height: "150px" }}
          />
        </Grid>
        <Grid
          item
          container
          xs={2.4}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Information data={data} />
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          // sx={{ width: "55%" }}
        >
          <Grid item xs={4}>
            <Typography
              color={theme.palette.secondary.main}
              gutterBottom
              variant={matchDownSM ? "h4" : "h4"}
            >
              Mặt trước
            </Typography>
            <Avatar
              alt="front"
              src={data?.frontIdentification}
              variant="rounded"
              sx={{ width: "400px", height: "300px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography
              color={theme.palette.secondary.main}
              gutterBottom
              variant={matchDownSM ? "h4" : "h4"}
            >
              Mặt sau
            </Typography>
            <Avatar
              alt="bback"
              src={data?.backIdentification}
              variant="rounded"
              sx={{ width: "400px", height: "300px" }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ marginTop: "6%" }}
      >
        <Grid item xs={1.5}>
          <EditButton />
        </Grid>
      </Grid> */}
    </>
  );
};

export default Personal;
