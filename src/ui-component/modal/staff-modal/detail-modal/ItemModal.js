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
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "store/modalReducer";
// import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import UploadAvatar from "ui-component/upload-file/upload-staff/UploadAvatar";
// import DeleteButton from "ui-component/buttons/delete-button/DeleteButton";

const ItemModal = ({ modalType }) => {
  const theme = useTheme();
  const staffId = useSelector((state) => state.modal.staffId);

  const dispatch = useDispatch();

  const [data, setData] = useState();

  const apiUrl = process.env.REACT_APP_BASE_URL_API_APP;
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchData = async () => {
    const response = await fetch(
      `${apiUrl}/keeper-account-management/${staffId}`,
      requestOptions
    );

    const data = await response.json();
    if (data) {
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModal(modalType));
  };

  return (
    <>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Typography variant="h2" color={theme.palette.primary.main}>
          Chi tiết nhân viên
        </Typography>
      </Grid>
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
            <TextField
              fullWidth
              type="text"
              value={data?.name}
              InputProps={{
                readOnly: true,
              }}
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
              Ngày-tháng-năm sinh
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              type="date"
              value={data?.dateOfBirth.substring(0, 10)}
              InputProps={{
                readOnly: true,
              }}
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
            <TextField
              fullWidth
              type="email"
              value={data?.email}
              InputProps={{
                readOnly: true,
              }}
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
              SĐT
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              value={data?.phone}
              InputProps={{
                readOnly: true,
              }}
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
              Giới tính
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              value={data?.gender}
              InputProps={{
                readOnly: true,
              }}
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
              Bãi xe
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              value={data?.parkingName}
              InputProps={{
                readOnly: true,
              }}
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
              Ảnh đại diện
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <UploadAvatar avatar={data?.avatar} />
          </Grid>
        </Grid>

        <Grid item>
          <CancelButton onClick={handleCloseModal} />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemModal;
