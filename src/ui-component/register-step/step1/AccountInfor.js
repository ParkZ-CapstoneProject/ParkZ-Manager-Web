import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { setCurrentStep, setUserData } from "store/stepReducer";
import validator from "validator";
// import { multiStepContext } from "context/StepContext";

const AccountInfor = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.multiStep.currentStep);
  const userData = useSelector((state) => state.multiStep.userData);

  const [email, setEmail] = useState("");
  // const [spaceInput, setSpaceInput] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleInputEmail = (event) => {
    const newEmail = event.target.value;
    // setSpaceInput(newEmail.trim().length === 0);
    setEmail(newEmail);
    dispatch(setUserData({ ...userData, email: newEmail }));
    setErrorEmail(!validator.isEmail(newEmail));
  };

  const handlePasswordChange = (event) => {
    // setSpaceInput(event.target.value.trim() === 0);
    setPassword(event.target.value);
    dispatch(setUserData({ ...userData, password: event.target.value }));
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    // setSpaceInput(event.target.value.trim() === 0);
    setConfirmPassword(event.target.value);
    dispatch(setUserData({ ...userData, confirmPassword: event.target.value }));
    setPasswordsMatch(event.target.value === password);
  };
  console.log("length", userData.email);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      marginTop="8%"
    >
      <Grid item xs={12}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          marginBottom="15%"
        >
          <Typography
            color={theme.palette.secondary.main}
            gutterBottom
            variant={matchDownSM ? "h2" : "h1"}
          >
            Thông tin tài khoản
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
            Email
          </Typography>
          <TextField
            fullWidth
            required
            sx={{ width: "500px" }}
            inputProps={{ maxLength: 100 }}
            type="email"
            name="email"
            value={userData["email"]}
            label="Email"
            color="secondary"
            onChange={handleInputEmail}
            error={errorEmail}
            helperText={errorEmail ? "Vui lòng nhập đúng email" : ""}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            color={theme.palette.secondary.dark}
            gutterBottom
            variant={matchDownSM ? "h5" : "h4"}
            marginTop="8%"
          >
            Mật khẩu
          </Typography>
          <TextField
            fullWidth
            required
            type="password"
            name="password"
            label="Mật khẩu"
            color="secondary"
            value={userData["password"]}
            onChange={handlePasswordChange}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            color={theme.palette.secondary.dark}
            gutterBottom
            variant={matchDownSM ? "h5" : "h4"}
            marginTop="8%"
          >
            Xác nhận mật khẩu
          </Typography>
          <TextField
            fullWidth
            required
            type="password"
            name="confirmPassword"
            label="Xác nhận mậu khẩu"
            color="secondary"
            value={userData["confirmPassword"]}
            onChange={handleConfirmPasswordChange}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? "Mật khẩu không khớp" : ""}
          />
        </Stack>
        <Stack sx={{ marginTop: "8%" }}>
          <Button
            fullWidth
            size="large"
            sx={{
              mt: 3,
              borderRadius: "10px",
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
            disabled={
              userData.email === undefined ||
              userData.password === undefined ||
              userData.confirmPassword === undefined
            }
          >
            Tiếp theo
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountInfor;
