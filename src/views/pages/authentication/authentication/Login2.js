import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout as AuthLayout } from "../../../../ui-component/auth/layout";
import LoginButton from "ui-component/buttons/login-button/LoginButton";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateToken } from "store/tokenSlice";
// import jwt from "jsonwebtoken";

const Page = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = "https://parkzapi.azurewebsites.net/api";
  const FCMToken = localStorage.getItem("FCMToken");

  const requestBody = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "info",
      title: "Đang xử lý thông tin...",
      text: "Vui lòng chờ trong giây lát!",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      fetch(`${apiUrl}/business-manager-authentication`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const res = data;

          if (res.data === null) {
            Swal.close();

            Swal.fire({
              icon: "error",
              title: "Đăng nhập thất bại!",
              text: res.message,
            });
          } else {
            const parts = data.data.token.split(".");
            const payload = parts[1];
            const urlDecodedPayload = decodeURIComponent(payload);
            const decodedPayload = atob(urlDecodedPayload);

            const user = JSON.parse(decodedPayload);

            // console.log("Decoded Payload:", payloadObject);
            // Decode the payload using the base64-decoding function
            // const user = JSON.parse(atob(parts[1]));
            const request = {
              userId: user._id,
              devicetoken: FCMToken,
            };
            const requestOptionsPut = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(request),
            };

            if (user.role === "Manager" || user.role === "Keeper") {
              fetch(`${apiUrl}/DeviceToken`, requestOptionsPut).then(
                (response) => {
                  if (response.ok) {
                    console.log("response", response);
                  }
                }
              );
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("user", JSON.stringify(user));
              dispatch(updateToken(data.data.token));
              Swal.close();
              navigate("/dashboard");
            }
          }
          // console.log("res", res);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
              textAlign={"center"}
              marginTop="-5%"
            >
              <Box>
                <Typography
                  color="#063970"
                  gutterBottom
                  variant={matchDownSM ? "h2" : "h1"}
                  fontSize="50px"
                >
                  Đăng nhập
                </Typography>
              </Box>
            </Stack>
            <form method="post" onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  sx={{ borderRadius: "5px" }}
                  required
                  value={email}
                  inputProps={{ maxLength: 150 }}
                  error={email.length > 150}
                  helperText={email.length > 50 ? "Tối đa 150 ký tự" : ""}
                  fullWidth
                  label="Tên đăng nhập"
                  name="email"
                  type="text"
                  onChange={handleChangeEmail}
                />

                <TextField
                  required
                  value={password}
                  inputProps={{ maxLength: 150 }}
                  error={password.length >= 150}
                  helperText={password.length > 150 ? "Tối đa 150 ký tự" : ""}
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  onChange={handleChangePassword}
                />

                <Typography
                  color={theme.palette.secondary.dark}
                  variant="subtitle1"
                  sx={{
                    cursor: "pointer",
                    textAlign: "end",
                  }}
                >
                  <a href="/input-email">Bạn quên mật khẩu?</a>
                </Typography>
              </Stack>

              <Stack sx={{ marginTop: "2%" }}>
                <LoginButton />
              </Stack>

              <Stack sx={{ textAlign: "center", marginTop: "2%" }}>
                <Typography
                  color={theme.palette.secondary.main}
                  variant="subtitle1"
                >
                  Bạn chưa có tài khoản?{" "}
                  <a
                    href="/register"
                    style={{ textDecoration: "underline", color: "#3e3ee3" }}
                  >
                    Đăng ký tại đây
                  </a>
                </Typography>
              </Stack>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Page;
