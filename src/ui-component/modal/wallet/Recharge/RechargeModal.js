import React, { useEffect } from "react";
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
// import Data from "./Data";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "30%",
  bgcolor: "background.paper",
  // border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 12,
  p: 4,
};

const RechargeModal = (props) => {
  const { isOpen, setIsOpen } = props;
  const [mooney, setMooney] = useState();

  //   const navigate = useNavigate();

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  const localhostUrl = "http://localhost:3000/wallet";

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeMooney = (e) => {
    setMooney(e.target.value);
  };

  const handleRechargeMooney = async () => {
    if (mooney < 1000) {
      Swal.fire({
        icon: "warning",
        text: "Số tiền không được nhỏ hơn 1000 VNĐ!",
      });
      return;
    }
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn nạp số tiền này!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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

        const request = {
          totalPrice: mooney,
          userId: userData._id,
        };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(request),
        };

        const response = await fetch(
          `${apiUrl}/wallet/deposit/manager`,
          requestOptions
        );
        const data = await response.json();
        if (data) {
          window.location.href = data.data;
        } else {
          Swal.fire({
            icon: "error",
            text: data.message,
          });
        }
      }
    });
  };

  useEffect(() => {
    // Extract query parameters from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const vnPayResponseCode = urlSearchParams.get("vnp_ResponseCode");

    if (vnPayResponseCode === "24") {
      Swal.fire({
        icon: "error",
        title: "Giao dịch thất bại!",
        text: "Khách hàng hủy giao dịch!",
      });
    }
    if (vnPayResponseCode === "00") {
      // Redirect back to your localhost
      window.location.href = localhostUrl;
      // Alternatively, you can use the `useNavigate` hook to navigate programmatically
      // const navigate = useNavigate();
      // navigate("/");
    }
  }, []);

  const theme = useTheme();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ border: "none" }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                color: theme.palette.grey[500],
                backgroundColor: theme.palette.grey[100],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={5}
            >
              <Grid item>
                <Typography color={theme.palette.secondary.dark} variant="h3">
                  Nhập số tiền cần nạp
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Nhập số tiền"
                  type="number"
                  value={mooney}
                  onChange={handleChangeMooney}
                  inputProps={{
                    min: 1000,
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              marginTop={5}
            >
              <Grid item>
                <CancelButton onClick={handleClose} />
              </Grid>
              <Grid item>
                <SaveButton onClick={handleRechargeMooney} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default RechargeModal;
