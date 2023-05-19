import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useState } from "react";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import UploadAvatar from "ui-component/upload-file/upload-staff/UploadAvatar";
import { useDispatch } from "react-redux";
import { closeModal } from "store/modalReducer";
import DialogCreate from "./DialogCreate";

const ItemModal = ({ modalType }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (e) => {
    const inputTime = e.target.value;
    const formattedTime = formatTime(inputTime);
    setSelectedTime(formattedTime);
  };

  const formatTime = (time) => {
    // Assuming the input format is "HH:mm"
    const [hours, minutes] = time.split(":");
    const formattedTime = `${hours}:${minutes}:00`;
    return formattedTime;
  };

  console.log("selectedTime", selectedTime);

  const [gender, setGender] = useState("nam");

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    dispatch(closeModal(modalType));
  };

  const handleChange = (e) => {
    setGender(e.target.value);
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ marginTop: "5%" }}
      >
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Tên NV
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Tên NV" type="text" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Ngày-tháng-năm sinh
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              // inputProps={{ step: 1 }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Email
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Email" type="email" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              SĐT
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="SĐT" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Giới tính
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="gender"
                onChange={handleChange}
                defaultValue={gender.nam}
              >
                <MenuItem fullWidth value="nam" sx={{ width: "100%" }}>
                  Nam
                </MenuItem>
                <br />
                <MenuItem fullWidth value="nữ" sx={{ width: "100%" }}>
                  Nữ
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Bãi xe
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Bãi xe</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="gender"
                onChange={handleChange}
              >
                <MenuItem fullWidth value="nam" sx={{ width: "100%" }}>
                  Bãi xe số 1
                </MenuItem>
                <br />
                <MenuItem fullWidth value="nữ" sx={{ width: "100%" }}>
                  Bãi xe số 2
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Ảnh đại diện
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <UploadAvatar />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <CancelButton onClick={handleCloseModal} />
          </Grid>
          <Grid item>
            <SaveButton onClick={handleOpenDialog} />
          </Grid>
        </Grid>
      </Grid>

      <DialogCreate open={openDialog} modalType={modalType} />
    </>
  );
};

export default ItemModal;
