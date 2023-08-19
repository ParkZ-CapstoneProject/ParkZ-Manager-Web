import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { useDispatch } from "react-redux";
import { closeModal } from "store/modalReducer";
import validator from "validator";
import Swal from "sweetalert2";
import Loading from "ui-component/back-drop/Loading";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ItemModal = ({ modalType }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [name, setName] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [parkings, setParkings] = useState([]);
  const [parkingId, setParkingId] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputPhone = (event) => {
    const { value } = event.target;
    const phoneNumber = value.replace(/\D/g, ""); // Remove non-digit characters

    if (phoneNumber.length > 0 && phoneNumber[0] === "0") {
      setPhone(phoneNumber.substring(0, 10));
    }
  };

  const handleInputEmail = (event) => {
    const { value } = event.target;

    const startsWithSpace = /^\s/.test(value);
    // Remove any spaces from the input value
    if (!startsWithSpace) {
      setEmail(value);
      setErrorEmail(!validator.isEmail(value));
    } else {
      setErrorEmail(true);
    }
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

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };
  // console.log("dateOfBirth", dateOfBirth);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

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

  const fetchDataParking = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/parkings?managerId=${userData._id}&pageNo=1&pageSize=22`,
      requestOptions
    );

    const data = await response.json();
    setParkings(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataParking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [gender, setGender] = useState("Nam");

  const handleCloseModal = () => {
    dispatch(closeModal(modalType));
  };

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleChangeParking = (e) => {
    setParkingId(e.target.value);
  };

  const handleRegisterStaff = async (e) => {
    e.preventDefault();
    if (errorEmail) {
      return;
    } else if (avatar.trim().length === 0) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng tải hình đại diện!",
      });
    }

    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      Swal.fire({
        icon: "warning",
        text: "Bạn phải ít nhất 18 tuổi để đăng ký nhân viên.",
      });
      return;
    }

    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng điền tất cả các field!",
      });
    }

    if (!dateOfBirth) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng chọn năm sinh!",
      });
    }

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

        const request = {
          name: name,
          email: email,
          phone: phone,
          dateOfBirth: dateOfBirth,
          gender: gender,
          avatar: avatar,
          managerId: userData._id,
          parkingId: parkingId,
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
          `${apiUrl}/keeper-account-management/register`,
          requestOptions
        );

        const data = await response.json();

        if (data.statusCode === 201) {
          dispatch(closeModal(modalType));

          Swal.fire({
            icon: "success",
            text: "Tạo mới bảo vệ thành công",
          }).then((result) => {
            if (result.isConfirmed) {
              setDateOfBirth("");
              setName("");
              setPhone("");
              setEmail();
              setAvatar("");
              setParkingId(0);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data.message,
          });
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
          Tạo mới nhân viên
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ marginTop: "3%" }}
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
              required
              label="Tên nhân viên"
              inputProps={{
                maxLength: 50,
              }}
              type="text"
              value={name}
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
              required
              type="date"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              error={calculateAge(dateOfBirth) < 18}
              helperText={
                calculateAge(dateOfBirth) < 18 ? "Ít nhất 18 tuổi" : ""
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
              required
              label="Email"
              type="email"
              value={email}
              onChange={handleInputEmail}
              error={errorEmail}
              helperText={errorEmail ? "Vui lòng nhập đúng email" : ""}
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
              required
              type="number"
              label="Số điện thoại"
              value={phone}
              onChange={handleInputPhone}
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
                value={gender}
                label="gender"
                onChange={handleChange}
                defaultValue={gender.Nam}
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Bãi xe</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={parkingId}
                onChange={handleChangeParking}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                MenuProps={MenuProps}
              >
                {parkings?.map((parking) => (
                  <MenuItem
                    key={parking.parkingId}
                    value={parking.parkingId}
                    sx={{ width: "100%" }}
                  >
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
            <UploadAvatar setAvatar={setAvatar} />
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
            <SaveButton onClick={handleRegisterStaff} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemModal;
