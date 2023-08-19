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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "27%",
  bgcolor: "background.paper",
  // border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 12,
  p: 4,
};

const DisableRightNow = (props) => {
  const { isOpen, setIsOpen, parkingId } = props;
  //   const [date, setDate] = useState();
  const [reason, setReason] = useState("");

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };

  //   const handleChangeDate = (e) => {
  //     setDate(e.target.value);
  //   };

  const handleDisableParking = async () => {
    if (reason.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng nhập lý do!",
      });
      return;
    }
    Swal.fire({
      title: "Xác nhận?",
      text: "Nếu tắt bãi xe ngay bây giờ thì tất cả đơn đặt chỗ sẽ bị hủy và sẽ bị hoàn tiền nếu khách hàng đã thanh toán trước, ảnh hưởng đến tất cả đơn đặt của bãi xe! Bạn có chắc chắn muốn khóa ngay bây giờ!",
      icon: "warning",
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

        const date = new Date();

        const body = {
          parkingId: parkingId,
          disableDate: date.toISOString(),
          reason: reason,
        };

        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(body),
        };

        const response = await fetch(
          `${apiUrl}/parkings/disable-parking-by-date-time`,
          requestOptions
        );

        if (response.status === 204) {
          setIsOpen(false);
          Swal.fire({
            icon: "success",
            text: "Thành công",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.close();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: response.message,
          });
        }
      }
    });
  };

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
              direction="row"
              justifyContent="space-evenly"
              spacing={3}
              alignItems="center"
              sx={{ marginTop: "10px" }}
            >
              <Grid item xs={5}>
                <Typography color={theme.palette.common.black} variant="h4">
                  Lý do ngưng
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  type="text"
                  rows={3}
                  placeholder="Nhập lý do"
                  value={reason}
                  onChange={handleChangeReason}
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
                <SaveButton onClick={handleDisableParking} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DisableRightNow;
