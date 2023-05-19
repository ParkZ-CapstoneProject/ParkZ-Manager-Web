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
import UploadBusinessLicense from "ui-component/upload-file/UploadBusinessLicense";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, setUserData } from "store/stepReducer";

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
        <Stack item xs={12} justifyContent="center" spacing={1}>
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
            rows={2}
            type="text"
            name="address"
            label="Địa chỉ(Số, đường, quận, TP Hô Chí Minh)"
            color="secondary"
          />
        </Stack>

        <Grid
          item
          container
          style={{ marginTop: "1%" }}
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
          <Grid item>
            <Button
              fullWidth
              size="large"
              style={{ backgroundColor: "#cb4e18" }}
              sx={{
                mt: 3,
                borderRadius: "10px",
                width: "220px",
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
                borderRadius: "10px",
                width: "220px",
                backgroundColor: "#063970",
                ":is(:hover, :focus)": {
                  backgroundColor: "#478be9",
                  outline: "3px solid #478be9",
                  outlineOffset: "1px",
                },
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
    </Grid>
  );
};

export default BusinessInfor;
