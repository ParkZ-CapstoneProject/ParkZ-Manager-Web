import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import Swal from "sweetalert2";
import DeleteButton from "ui-component/buttons/delete-button/DeleteButton";

const ItemModal = (props) => {
  const { setOpenDetailDelete, vnPayId, detail } = props;

  const theme = useTheme();

  const dataDefault = {
    tmnCode: "",
    hashSecret: "",
  };

  const [data, setData] = useState(dataDefault);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

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
    setData(data.data);
  };

  useEffect(() => {
    fetchDataParking();
  }, []);

  const handleCloseModal = () => {
    setOpenDetailDelete(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn xóa liên kết!",
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

        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
            "Content-Type": "application/json", // Replace with the appropriate content type
          },
        };

        const response = await fetch(
          `${apiUrl}/vnpay/${vnPayId}`,
          requestOptions
        );

        if (response.statusCode === 204) {
          Swal.fire({
            icon: "success",
            text: "Tài khoản đã được xóa thành công!",
            confirmButtonText: "Trở lại",
          }).then((result) => {
            if (result.isConfirmed) {
              handleCloseModal();
            }
          });
        }
      }
    });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item>
          <Typography color={theme.palette.secondary.main} variant="h2">
            {detail ? "Chi tiết liên kết" : "Xóa liên kết"}
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
            InputProps={{
              readOnly: true,
            }}
            value={data.tmnCode}
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
            InputProps={{
              readOnly: true,
            }}
            value={data.hashSecret}
            sx={{ width: "160%" }}
          />
        </Grid>

        {detail ? (
          <>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <CancelButton onClick={handleCloseModal} />
              </Grid>
            </Grid>
          </>
        ) : (
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
              <DeleteButton onClick={handleDelete} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ItemModal;
