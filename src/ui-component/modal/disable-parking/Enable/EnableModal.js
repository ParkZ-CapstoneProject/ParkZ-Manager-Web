import React from "react";
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
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import Swal from "sweetalert2";

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

const EnableModal = (props) => {
  const { isOpen, setIsOpen, id, disableDate } = props;
  console.log("disableDate", disableDate);
  const theme = useTheme();

  const formatDate = (date) => {
    const parts = date.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    return formattedDate;
  };

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEnableParking = async () => {
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn hủy ngày ngưng này!",
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

        const date = formatDate(disableDate);

        const request = {
          parkingId: id,
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
          `${apiUrl}/parkings/enable-disable-parking`,
          requestOptions
        );
        // const data = await response.json();
        if (response.status === 204) {
          Swal.fire({
            icon: "success",
            text: "Cập nhật hủy ngưng hoạt động bãi xe thành công!",
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
                  Ngày ngưng hoạt động
                </Typography>
              </Grid>
              <Grid item>
                <TextField fullWidth readOnly value={disableDate} />
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
                <SaveButton onClick={handleEnableParking} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EnableModal;
