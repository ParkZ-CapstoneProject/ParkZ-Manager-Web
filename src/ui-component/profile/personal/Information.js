import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Information = (props) => {
  const { data } = props;
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h4" : "h4"}
          >
            Tên
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            gutterBottom
            variant={matchDownSM ? "subtitle1" : "subtitle1"}
          >
            {data?.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h4" : "h4"}
          >
            Chức vụ
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            gutterBottom
            variant={matchDownSM ? "subtitle1" : "subtitle1"}
          >
            Chủ doanh nghiệp
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h4" : "h4"}
          >
            Email
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            gutterBottom
            variant={matchDownSM ? "subtitle1" : "subtitle1"}
          >
            {data?.email}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h4" : "h4"}
          >
            Số điện thoại
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            gutterBottom
            variant={matchDownSM ? "subtitle1" : "subtitle1"}
          >
            {data?.phone}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h4" : "h4"}
          >
            Ngày sinh
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            gutterBottom
            variant={matchDownSM ? "subtitle1" : "subtitle1"}
          >
            {data?.dateOfBirth ? data?.dateOfBirth : "Chưa cập nhật"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h4" : "h4"}
          >
            Giới tính
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={theme.palette.common.black}
            gutterBottom
            variant={matchDownSM ? "subtitle1" : "subtitle1"}
          >
            {data?.gender ? data?.gender : "Chưa cập nhật"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Information;
