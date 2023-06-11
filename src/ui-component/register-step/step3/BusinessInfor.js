/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/material/styles";
// import UploadBusinessLicense from "ui-component/upload-file/UploadBusinessLicense";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, setUserData } from "store/stepReducer";
import BackButtonRegister from "ui-component/buttons/back-button/BackButtonRegister";
import ContinueButton from "ui-component/buttons/continue-button-register/ContinueButton";
import UploadBusinessLicense from "ui-component/upload-file-antd/UploadBusinessLicense";

const BusinessInfor = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.multiStep.currentStep);
  const userData = useSelector((state) => state.multiStep.userData);

  const [errorBusinessName, setErrorBusinessName] = useState(false);

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleInputBusinessName = (event) => {
    const { value } = event.target;

    const startsWithSpace = /^\s/.test(value);

    if (startsWithSpace) {
      setErrorBusinessName(true);
      return;
    } else {
      setErrorBusinessName(false);
      dispatch(setUserData({ ...userData, businessName: value }));
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      marginTop="2%"
    >
      <Grid item xs={12}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          marginBottom="8%"
        >
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h2" : "h1"}
          >
            Thông tin doanh nghiệp
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack xs={12} justifyContent="center" spacing={1}>
          <Typography
            color={theme.palette.secondary.dark}
            gutterBottom
            variant={matchDownSM ? "h5" : "h4"}
          >
            Tên doanh nghiệp
          </Typography>
          <TextField
            fullWidth
            required
            sx={{ width: "500px" }}
            type="text"
            name="businessName"
            label="Tên doanh nghiệp"
            color="secondary"
            onChange={handleInputBusinessName}
            value={userData["businessName"]}
            error={errorBusinessName}
            helperText={
              errorBusinessName ? "Không nhập bát đầu bàng khoảng trắng" : ""
            }
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            color={theme.palette.secondary.dark}
            gutterBottom
            variant={matchDownSM ? "h5" : "h4"}
            marginTop="5%"
          >
            Địa chỉ văn phòng(Optional)
          </Typography>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            type="text"
            name="address"
            label="Địa chỉ(Số, đường, quận, TP Hô Chí Minh)"
            color="secondary"
          />
        </Stack>

        <Grid
          item
          container
          style={{ marginTop: "1%", marginLeft: "-6px" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={1}>
            <Checkbox />
          </Grid>
          <Grid item xs={11}>
            <Typography
              color={theme.palette.secondary.dark}
              gutterBottom
              variant={matchDownSM ? "h6" : "h5"}
              marginTop="2%"
            >
              Hộ kinh doanh gia đình
            </Typography>
          </Grid>
        </Grid>

        <Stack spacing={1}>
          <Typography
            color={theme.palette.secondary.dark}
            gutterBottom
            variant={matchDownSM ? "h5" : "h4"}
            marginTop="2%"
          >
            Giấy phép kinh doanh
          </Typography>
          <UploadBusinessLicense />
        </Stack>
        <Grid
          item
          container
          style={{ marginTop: "5%" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={0.8}>
            <Checkbox />
          </Grid>
          <Grid item xs={11}>
            <Typography
              color={theme.palette.secondary.dark}
              gutterBottom
              variant={matchDownSM ? "h6" : "h5"}
              marginTop="2%"
            >
              Tôi đã đọc và đồng ý với <a href="#">chính sách phí</a> và{" "}
              <a href="#">hợp đồng cung cấp dịch vụ</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={4}
        >
          <Grid item xs={6}>
            <BackButtonRegister width="100%" onClick={handleBack} />
          </Grid>
          <Grid item xs={6}>
            <ContinueButton width="100%" onClick={handleNext} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BusinessInfor;
