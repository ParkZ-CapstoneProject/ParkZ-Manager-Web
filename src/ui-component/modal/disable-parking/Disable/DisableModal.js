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
  height: "35%",
  bgcolor: "background.paper",
  // border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 12,
  p: 4,
};

const DisableModal = (props) => {
  const { isOpen, setIsOpen, parkingId } = props;
  const [date, setDate] = useState();
  const [reason, setReason] = useState("");

  const apiUrl = "https://parkzapi.azurewebsites.net/api";

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleDisableParking = async () => {
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn ngưng!",
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

        const request = {
          parkingId: parkingId,
          reason: reason,
          disableDate: date,
        };

        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        };

        const response = await fetch(
          `${apiUrl}/parkings/disable-parking-by-date`,
          requestOptions
        );
        // const data = await response.json();
        // console.log("response", response);
        // const data = await response.json();
        if (response.status === 204) {
          setIsOpen(false);
          Swal.fire({
            icon: "success",
            text: "Đặt lịch ngưng hoạt động bãi xe thành công!",
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
              alignItems="center"
              spacing={3}
              sx={{ marginTop: "10px" }}
            >
              <Grid item xs={5}>
                <Typography color={theme.palette.common.black} variant="h4">
                  Chọn ngày ngưng
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  sx={{ width: "100%" }}
                  type="date"
                  value={date}
                  onChange={handleChangeDate}
                />
              </Grid>
            </Grid>

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

export default DisableModal;
