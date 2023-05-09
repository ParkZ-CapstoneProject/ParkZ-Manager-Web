import React from "react";
import { Avatar, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Information from "./Information";
import EditButton from "ui-component/buttons/edit-button/EditButton";

const Personal = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4} alignItems="flex-start" justifyContent="center">
          <Avatar
            alt="avatar"
            src="https://img.freepik.com/free-icon/user_318-563642.jpg"
            variant="circular"
            sx={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid
          item
          container
          xs={4}
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Information props={props} />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Typography
              color={theme.palette.secondary.main}
              gutterBottom
              variant={matchDownSM ? "h4" : "h4"}
            >
              Mặt trước
            </Typography>
            <Avatar
              alt="front"
              src="https://media.phunutoday.vn/files/content/2022/12/20/can-cuoc-cong-dan-gan-chip-31280x720-800-resize-0938.jpg"
              variant="rounded"
              sx={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item>
            <Typography
              color={theme.palette.secondary.main}
              gutterBottom
              variant={matchDownSM ? "h4" : "h4"}
            >
              Mặt sau
            </Typography>
            <Avatar
              alt="bback"
              src="https://cdn.tgdd.vn/Files/2022/08/23/1458821/chipmatsaucuacancuoccongdan_1280x715-800-resize.jpg"
              variant="rounded"
              sx={{ width: "100%", height: "100%" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ marginTop: "6%" }}
      >
        <Grid item xs={1.5}>
          <EditButton />
        </Grid>
      </Grid>
    </>
  );
};

export default Personal;
