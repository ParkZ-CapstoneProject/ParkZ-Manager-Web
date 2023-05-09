import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Information = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  let { name, position, email, phone, dob, gender } = props;
  name = "Nguyễn Trần Duy Minh";
  position = "Chủ doanh nghiệp";
  email = "nguyentranduynam@gmail.com";
  phone = "01234123412";
  dob = "11/12/1999";
  gender = "Nam";

  return (
    <>
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
          variant={matchDownSM ? "h3" : "h3"}
        >
          {name}
        </Typography>
      </Grid>
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
          variant={matchDownSM ? "h3" : "h3"}
        >
          {position}
        </Typography>
      </Grid>
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
          variant={matchDownSM ? "h3" : "h3"}
        >
          {email}
        </Typography>
      </Grid>
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
          variant={matchDownSM ? "h3" : "h3"}
        >
          {phone}
        </Typography>
      </Grid>
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
          variant={matchDownSM ? "h3" : "h3"}
        >
          {dob}
        </Typography>
      </Grid>
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
          variant={matchDownSM ? "h3" : "h3"}
        >
          {gender}
        </Typography>
      </Grid>
    </>
  );
};

export default Information;
