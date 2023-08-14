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
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import UploadAvatar from "ui-component/upload-file/upload-staff/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "store/modalReducer";
import validator from "validator";
import Swal from "sweetalert2";
import Loading from "ui-component/back-drop/Loading";

const ItemModal = ({ modalType }) => {
  const theme = useTheme();

  const staffId = useSelector((state) => state.modal.staffId);

  const dispatch = useDispatch();

  const defaultData = {
    name: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    avatar: "",
    parkingId: "",
    parkingName: "",
  };

  const [data, setData] = useState(defaultData);
  const [parkings, setParkings] = useState([]);
  // const [errorEmail, setErrorEmail] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const edit = true;
  const [isDataChanged, setIsDataChanged] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
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

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/keeper-account-management/${staffId}`,
      requestOptions
    );

    const responseData = await response.json();
    // console.log("responseData.data", responseData.data);
    if (responseData) {
      setData(responseData.data);
      setLoading(false);
    }
  };

  const fetchDataParking = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/parkings?managerId=${userData._id}&pageNo=1&pageSize=22`,
      requestOptions
    );

    const responseData = await response.json();
    setParkings(responseData.data);
    setLoading(false);
  };

  // console.log("avatar", avatar);

  useEffect(() => {
    fetchData();
    fetchDataParking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputPhone = (event) => {
    const { value } = event.target;
    const phoneNumber = value.replace(/\D/g, ""); // Remove non-digit characters

    if (phoneNumber.length > 0 && phoneNumber[0] === "0") {
      setData((prevData) => ({
        ...prevData,
        phone: phoneNumber.substring(0, 10),
      }));
      setIsDataChanged(true);
    }
  };

  const handleDateOfBirthChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      dateOfBirth: value,
    }));
    setIsDataChanged(true);
  };

  const handleChangeName = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      name: value,
    }));
    setIsDataChanged(true);
  };

  const handleCloseModal = () => {
    dispatch(closeModal(modalType));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      gender: value,
    }));
    setIsDataChanged(true);
  };

  const handleChangeParking = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      parkingId: value,
    }));
    setIsDataChanged(true);
  };
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    if (!isDataChanged) {
      dispatch(closeModal(modalType)); // Close modal if no changes
      return;
    }
    if (data.avatar.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng tải hình đại diện!",
      });
    }

    const age = calculateAge(data.dateOfBirth);
    if (age < 18) {
      Swal.fire({
        icon: "warning",
        text: "Bạn phải ít nhất 18 tuổi để đăng ký nhân viên.",
      });
      return;
    }

    if (
      data.name.length === 0 ||
      data.email.length === 0 ||
      data.phone.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng điền tất cả các ô dữ liệu!",
      });
    }

    // if (!data.dateOfBirth) {
    //   // Check if dateOfBirth is empty
    //   Swal.fire({
    //     icon: "warning",
    //     text: "Vui lòng chọn ngày sinh!",
    //   });
    //   return;
    // }

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

        const body = {
          userId: staffId,
          name: data.name,
          phone: data.phone,
          avatar: avatar ? avatar : data.avatar,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
        };
        try {
          const response = await fetch(
            `${apiUrl}/managers/censorship/${staffId}`,
            {
              ...requestOptions,
              method: "PUT",
              body: JSON.stringify(body),
            }
          );

          // console.log("response", response);
          if (response.status === 204) {
            Swal.fire({
              icon: "success",
              text: "Cập nhật thông tin nhân viên thành công!",
            });
          }
          if (response.status === 400) {
            Swal.fire({
              icon: "error",
              text: "Yêu cầu nhật tất cả các ô!",
            });
          }
        } catch (error) {
          // Handle network errors here
          console.error("Error:", error);
        }
      }
    });
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Typography variant="h2" color={theme.palette.primary.main}>
          Chỉnh sửa nhân viên
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
              Tên nhân viên
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="Nhân viên"
              type="text"
              value={data.name}
              onChange={handleChangeName}
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
              value={data.dateOfBirth.substring(0, 10)}
              onChange={handleDateOfBirthChange}
              error={calculateAge(data.dateOfBirth) < 18}
              helperText={
                calculateAge(data.dateOfBirth) < 18 ? "Ít nhất 18 tuổi" : ""
              }
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
              label="Email"
              type="email"
              value={data.email}
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
              Số điện thoại
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              type="number"
              label="Số điện thoại"
              value={data.phone}
              onChange={handleInputPhone}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.gender}
                label="gender"
                onChange={handleChange}
                defaultValue={data.gender}
              >
                <MenuItem fullWidth value="Nam" sx={{ width: "100%" }}>
                  Nam
                </MenuItem>
                <br />
                <MenuItem fullWidth value="Nữ" sx={{ width: "100%" }}>
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
                value={data.parkingId}
                label="parkingName"
                onChange={handleChangeParking}
                defaultValue={data.parkingName}
              >
                {parkings.map((parking) => (
                  <MenuItem sx={{ width: "100%" }} value={parking.parkingId}>
                    {parking.name}
                  </MenuItem>
                ))}
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
            <UploadAvatar
              avatar={data.avatar}
              setAvatar={setAvatar}
              edit={edit}
            />
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
            <SaveButton onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemModal;
