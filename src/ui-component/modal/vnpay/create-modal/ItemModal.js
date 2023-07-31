import React, { useEffect, useState } from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import Swal from "sweetalert2";

const ItemModal = (props) => {
  const { setOpen, vnPayId, edit } = props;

  const theme = useTheme();

  const dataDefault = {
    tmnCode: "",
    hashSecret: "",
  };

  const [data, setData] = useState(dataDefault);

  const apiUrl = process.env.REACT_APP_BASE_URL_API_APP;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchDataParking = async () => {
    const response = await fetch(`${apiUrl}/vnpay/${vnPayId}`, requestOptions);

    const data = await response.json();
    console.log("data", data);
    setData(data.data);
  };

  useEffect(() => {
    if (edit) {
      fetchDataParking();
    }
  }, []);
  console.log("data", data);

  const handleCloseModal = () => {
    if (!edit) {
      if (data.tmnCode.trim().length > 0 || data.hashSecret.trim().length > 0) {
        Swal.fire({
          icon: "warning",
          text: "Bạn có chắc chắn hủy! Dữ liệu sẽ mất",
          confirmButtonText: "Hủy",
          showCancelButton: true,
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.isConfirmed) {
            setData((prevData) => ({
              ...prevData,
              tmnCode: "",
              hashSecret: "",
            }));
            setOpen(false);
          }
        });
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleChangeTmCode = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      tmnCode: value,
    }));
  };

  const handleChangeHashSecret = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      hashSecret: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn lưu!",
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

        if (!edit) {
          await handleCreateNew();
          handleCreateNew();
        } else {
          await handleEdit();
        }
      }
    });
  };

  const handleCreateNew = async () => {
    const body = {
      tmnCode: data.tmnCode,
      hashSecret: data.hashSecret,
      userId: userData._id,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
        "Content-Type": "application/json", // Replace with the appropriate content type
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${apiUrl}/vnpay`, requestOptions);
    const dataRes = await response.json();

    if (dataRes.data) {
      Swal.fire({
        icon: "success",
        text: "Tạo mới thành công tài khoản",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpen(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        text: dataRes.message,
      });
      return;
    }
  };

  const handleEdit = async () => {
    const body = {
      vnPayId: vnPayId,
      tmnCode: data.tmnCode,
      hashSecret: data.hashSecret,
      userId: userData._id,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
        "Content-Type": "application/json", // Replace with the appropriate content type
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${apiUrl}/vnpay/${vnPayId}`, requestOptions);
    const dataRes = await response.json();

    if (dataRes.data) {
      Swal.fire({
        icon: "success",
        text: "Cập nhật thành công tài khoản",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpen(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        text: dataRes.message,
      });
      return;
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Typography color={theme.palette.secondary.main} variant="h2">
            {edit ? "Chính sửa tài liên kết" : "Tạo mới liên kết"}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginLeft: "-23%" }}>
          <Typography
            color={theme.palette.common.black}
            variant="h4"
            sx={{ paddingBottom: "10px" }}
          >
            TmCode
          </Typography>
          <TextField
            fullWidth
            type="text"
            value={data.tmnCode}
            onChange={handleChangeTmCode}
            sx={{ width: "160%" }}
          />
        </Grid>

        <Grid item xs={12} sx={{ marginLeft: "-23%" }}>
          <Typography
            color={theme.palette.common.black}
            variant="h4"
            sx={{ paddingBottom: "10px" }}
          >
            HashSecret
          </Typography>
          <TextField
            fullWidth
            type="text"
            value={data.hashSecret}
            onChange={handleChangeHashSecret}
            sx={{ width: "160%" }}
          />
        </Grid>

        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <CancelButton onClick={handleCloseModal} />
          </Grid>
          <Grid>
            <SaveButton onClick={handleSave} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemModal;
