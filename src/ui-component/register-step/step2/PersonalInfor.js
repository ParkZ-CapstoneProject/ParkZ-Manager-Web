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
import UploadFront from "ui-component/upload-file/UploadFront";
import UploadBackSide from "ui-component/upload-file/UploadBackSide";
import UploadAvatar from "ui-component/upload-file/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, setUserData } from "store/stepReducer";

const PersonalInfor = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.multiStep.currentStep);
  const userData = useSelector((state) => state.multiStep.userData);

  const [errorNumberLength, setErrorNumberLength] = useState(false);

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleInputPhone = (event) => {
    const { value } = event.target;

    setErrorNumberLength(value.length < 10 || value.length > 10);
    if (!isNaN(value)) {
      dispatch(setUserData({ ...userData, phone: value }));
    }
  };

  return (
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
                sx={{ width: "520px" }}
                type="text"
                name="name"
                inputProps={{ maxLength: 100 }}
                label="Họ và tên"
                color="secondary"
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
          <Grid
            item
            container
            direction="row"
            alignContent="center"
            justifyContent="center"
            sx={{ marginTop: "5%" }}
            xs={5}
            spacing={2}
          >
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                gutterBottom
                variant={matchDownSM ? "h5" : "h4"}
                marginTop="8%"
              >
                Mặt trước
              </Typography>
              <UploadFront />
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                gutterBottom
                variant={matchDownSM ? "h5" : "h4"}
                marginTop="8%"
              >
                Mặt sau
              </Typography>
              <UploadBackSide />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <UploadAvatar />
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
        style={{ marginTop: "1%", marginLeft: "7%" }}
        xs={10}
      >
        <Grid item>
          <Button
            fullWidth
            size="large"
            // style={{ backgroundColor: "#cb4e18", width: "250px" }}
            sx={{
              mt: 3,
              borderRadius: "7px",
              backgroundColor: "#cb4e18",
              width: "250px",
              ":is(:hover, :focus)": {
                backgroundColor: "#cb4e18",
                outline: "3px solid #cb4e18",
                outlineOffset: "1px",
              },
            }}
            type="submit"
            variant="contained"
            onClick={handleBack}
          >
            Trở lại
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            size="large"
            sx={{
              mt: 3,
              borderRadius: "7px",
              backgroundColor: "#063970",
              ":is(:hover, :focus)": {
                backgroundColor: "#478be9",
                outline: "3px solid #478be9",
                outlineOffset: "1px",
              },
              width: "250px",
            }}
            type="submit"
            variant="contained"
            onClick={handleNext}
          >
            Tiếp theo
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PersonalInfor;
