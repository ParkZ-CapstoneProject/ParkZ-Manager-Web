import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
// import UploadFile from "../step3/UploadFile";
// import UploadFront from "ui-component/upload-file/UploadFront";
// import UploadBackSide from "ui-component/upload-file/UploadBackSide";
// import UploadAvatar from "ui-component/upload-file/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, setUserData } from "store/stepReducer";
import ContinueButton from "ui-component/buttons/continue-button-register/ContinueButton";
import BackButtonRegister from "ui-component/buttons/back-button/BackButtonRegister";
import UploadCCCD from "ui-component/upload-file-antd/UploadCCCD";
import UploadAvatar from "ui-component/upload-file-antd/UploadAvatar";

const PersonalInfor = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.multiStep.currentStep);
  const userData = useSelector((state) => state.multiStep.userData);

  const [errorNumberLength, setErrorNumberLength] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleInputName = (event) => {
    const { value } = event.target;

    const startsWithSpace = /^\s/.test(value);

    if (startsWithSpace) {
      setErrorName(true);
      return;
    } else {
      setErrorName(false);
      dispatch(setUserData({ ...userData, name: value }));
    }
  };

  const handleInputPhone = (event) => {
    const { value } = event.target;

    const startsWithSpace = /^\s/.test(value);

    if (startsWithSpace) {
      setErrorPhone(true);
      return;
    } else {
      setErrorPhone(false);
      setErrorNumberLength(value.length < 10 || value.length > 10);
      if (!isNaN(value)) {
        dispatch(setUserData({ ...userData, phone: value }));
      }
    }
  };

  return (
    <>
      <form>
        <Grid container direction="row" alignContent="center">
          <Grid item xs={12} sx={{ marginTop: "2%" }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              marginBottom="3%"
            >
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? "h2" : "h1"}
              >
                Thông tin chủ doanh nghiệp
              </Typography>
            </Stack>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            // marginLeft="17%"
            spacing={2}
          >
            <Grid
              item
              container
              direction="column"
              spacing={1}
              xs={5}
              justifyContent="center"
            >
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={5}>
                  <Typography
                    color={theme.palette.secondary.dark}
                    gutterBottom
                    variant={matchDownSM ? "h5" : "h4"}
                    marginBottom="3%"
                  >
                    Họ và tên
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    sx={{ width: "520px" }}
                    type="text"
                    name="name"
                    inputProps={{ maxLength: 100 }}
                    label="Họ và tên"
                    color="secondary"
                    value={userData["name"]}
                    onChange={handleInputName}
                    error={errorName}
                    helperText={
                      errorName ? "Không nhập bắt đâu bàng khoảng trống" : ""
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    color={theme.palette.secondary.dark}
                    gutterBottom
                    variant={matchDownSM ? "h5" : "h4"}
                    marginTop="5%"
                    marginBottom="3%"
                  >
                    Số điện thoại
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    sx={{ width: "520px" }}
                    type="number"
                    maxLength={10}
                    name="phoneNumber"
                    label="Số điện thoại"
                    color="secondary"
                    value={userData["phone"]}
                    onChange={handleInputPhone}
                    error={errorNumberLength}
                    helperText={
                      errorNumberLength && "Số điện thoại không vượt quá 10 số"
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  color={theme.palette.secondary.dark}
                  gutterBottom
                  variant={matchDownSM ? "h5" : "h4"}
                  marginLeft="17%"
                  marginTop="3%"
                >
                  Mặt trước và sau CCCD
                </Typography>
              </Grid>
              <Grid item container direction="row" justifyContent="center">
                <Grid item>
                  <UploadCCCD />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="baseline"
              xs={5}
              sx={{ marginTop: "-5%" }}
            >
              <Grid item sx={{ marginLeft: "-30%" }}>
                <Typography
                  color={theme.palette.secondary.dark}
                  gutterBottom
                  variant={matchDownSM ? "h5" : "h4"}
                >
                  Ảnh đại diện
                </Typography>
              </Grid>
              <Grid item sx={{ marginRight: "30%" }}>
                <UploadAvatar />
              </Grid>
              {/* components 2 */}
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={4}
            style={{ marginLeft: "7%", marginTop: "20px" }}
            xs={10}
          >
            <Grid item xs={3}>
              <BackButtonRegister width="100%" onClick={handleBack} />
            </Grid>
            <Grid item xs={3}>
              <ContinueButton width="100%" onClick={handleNext} />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PersonalInfor;
