import React, { useState } from "react";
import CardInput from "./CardInput";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard";
import AddButton from "ui-component/buttons/add-button/AddButton";
// import NextButton from "ui-component/buttons/next-button/NextButton";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CreateNewPrice = () => {
  const theme = useTheme();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  const navigate = useNavigate();

  const [cards, setCards] = useState([
    {
      price: 0,
      startTime: "",
      endTime: "",
      extraFree: 0,
    },
  ]);

  const initialState = {
    name: "",
    vehicleType: 1,
    isWholeDay: false,
    isExtraFree: false,
    startingTime: 0,
    timeStep: 0,
    isPenaltyChecked: false,
    penaltyPrice: 0,
    penaltyPriceStep: 0,
  };
  const [parkingPrice, setParkingPrice] = useState(initialState);

  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        price: 0,
        startTime: "",
        endTime: "",
        extraFree: 0,
      },
    ]);
  };

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";

  const requestBody = {
    parkingPriceName: parkingPrice.name,
    managerId: userData._id,
    trafficId: parkingPrice.vehicleType,
    isWholeDay: parkingPrice.isWholeDay,
    startingTime: parkingPrice.startingTime ? parkingPrice.startingTime : null,
    hasPenaltyPrice: parkingPrice.isPenaltyChecked,
    penaltyPrice: parkingPrice.penaltyPrice ? parkingPrice.penaltyPrice : null,
    penaltyPriceStepTime: parkingPrice.penaltyPriceStep
      ? parkingPrice.penaltyPriceStep
      : null,
    isExtrafee: parkingPrice.isExtraFree,
    extraTimeStep: parkingPrice.timeStep,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  };

  const handleSave = () => {
    if (
      parkingPrice.name === "" ||
      (parkingPrice.isWholeDay === false && parkingPrice.isExtraFree === false)
    ) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng nhập tên gói cước và chọn gói cước!",
      });
      return;
    }
    if (
      parkingPrice.isPenaltyChecked === false ||
      parkingPrice.penaltyPrice === 0 ||
      parkingPrice.penaltyPriceStep === 0
    ) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng chọn phạt quá giờ, nhập phí phạt và số giờ tính phí!",
      });
      return;
    }
    const isValid = cards.every((card, index) => {
      if (!card.startTime || !card.endTime) {
        Swal.fire({
          icon: "error",
          text: `Thời gian bắt đầu và kết thúc không thể để trống cho khung giờ ${
            index + 1
          }`,
        });
        return false;
      }

      if (!card.price) {
        Swal.fire({
          icon: "error",
          text: `Vui lòng nhập giá cho khung giờ ${index + 1}`,
        });
      }

      if (index > 0) {
        const prevEndTime = cards[index - 1].endTime;
        const currStartTime = card.startTime;
        if (currStartTime < prevEndTime) {
          Swal.fire({
            icon: "error",
            text: `Thời gian bắt đầu của khung giờ ${
              index + 1
            } phải lớn hơn thời gian kết thúc của khung giờ ${index}`,
          });
          return false;
        }
      }
      return true;
    });

    if (isValid) {
      Swal.fire({
        title: "Xác nhận?",
        text: "Bạn có chắc chắn muốn thay đổi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận!",
      }).then((result) => {
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
          apiSaveData();
        }
      });
      // apiSaveData();
    }
  };

  const apiSaveData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/parking-price/create`,
        requestOptions
      );

      if (!response.ok) {
        Swal.close();
        const errorData = await response.json();
        const errorMessage =
          errorData?.message || "An error occurred during the request.";
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: errorMessage,
        });

        console.log("response", response.json());
      }
      const data = await response.json();

      if (data !== null) {
        cards.map((card, index) => {
          const timeRequest = {
            name: `Khung giờ ${index + 1}`,
            price: card.price,
            description: `Khung giờ ${index + 1}`,
            startTime: card.startTime ? card.startTime : "",
            endTime: card.endTime ? card.endTime : "",
            extraFee: card.extraFree ? card.extraFree : null,
            parkingPriceId: data.data,
          };
          console.log("timeRequest", timeRequest);

          const requestOptionsTime = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(timeRequest),
          };

          fetch(`${apiUrl}/timeline-management`, requestOptionsTime)
            .then((response) => {
              if (!response.ok) {
                console.log("response", response);
              }
              return response.json();
            })
            .then((data) => {
              console.log("data", data);
              Swal.close();
              Swal.fire({
                icon: "success",
                text: "Tạo mới giá và khung giờ cho giá thành công!",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/prices");
                }
              });
            });
          return data;
        });
      }
      // console.log("Response data:", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, inputIndex, inputValue) => {
    const updatedCards = [...cards];
    updatedCards[index][Object.keys(cards[index])[inputIndex - 1]] = inputValue;
    setCards(updatedCards);
  };

  const handleNameChange = (e) => {
    setParkingPrice({ ...parkingPrice, name: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    setParkingPrice({ ...parkingPrice, isExtraFree: event.target.checked });
  };

  const handleStartingTimeChange = (e) => {
    setParkingPrice({ ...parkingPrice, startingTime: Number(e.target.value) });
  };

  const handleTimeStepChange = (e) => {
    setParkingPrice({ ...parkingPrice, timeStep: Number(e.target.value) });
  };

  const handlePenaltyCheck = (event) => {
    setParkingPrice({
      ...parkingPrice,
      isPenaltyChecked: event.target.checked,
    });
  };

  const handlePenaltyPrice = (e) => {
    const newPenaltyPrice = Number(e.target.value);

    // Calculate the maximum price from the cards array
    const maxCardPrice = cards.reduce(
      (max, card) => Math.max(max, card.price),
      0
    );

    if (newPenaltyPrice > maxCardPrice * 2) {
      Swal.fire({
        icon: "warning",
        text: "Giá tiền phạt không vượt quá 200% giá khung giờ!",
      });
      return;
    }

    setParkingPrice({ ...parkingPrice, penaltyPrice: newPenaltyPrice });
  };

  const handlePenaltyPriceStep = (e) => {
    setParkingPrice({
      ...parkingPrice,
      penaltyPriceStep: Number(e.target.value),
    });
  };

  return (
    <MainCard title="Tạo mới cước phí">
      <Grid item container xs={5.5} sx={{ marginLeft: "2%" }}>
        <Typography
          color={theme.palette.common.black}
          variant="h4"
          sx={{ paddingBottom: "6px" }}
        >
          Tên cước phí
        </Typography>
        <TextField
          type="text"
          value={parkingPrice.name}
          onChange={handleNameChange}
          sx={{ width: "100%" }}
        />
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        marginTop="5px"
        spacing={2}
      >
        <Grid item xs={5.5}>
          <Typography
            color={theme.palette.common.black}
            variant="h4"
            sx={{ paddingBottom: "6px" }}
          >
            Số tiếng tính phí đầu
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            value={parkingPrice.startingTime}
            onChange={handleStartingTimeChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.5}>
          <Typography
            color={theme.palette.common.black}
            variant="h4"
            sx={{ paddingBottom: "6px" }}
          >
            Số tiếng tính phí tiếp theo
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            value={parkingPrice.timeStep}
            onChange={handleTimeStepChange}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>

      <Grid item sx={{ marginLeft: "2.2%", paddingTop: "5px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={parkingPrice.isExtraFree}
              onChange={handleCheckboxChange}
            />
          }
          label="Phụ phí"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontWeight: "bold",
              fontSize: 17,
            },
          }}
        />
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={6}
        sx={{ marginTop: "1px", marginLeft: "1px" }}
      >
        {cards.map((card, index) => (
          <Grid item xs={3.5} key={index}>
            <CardInput
              index={index}
              isExtraFree={parkingPrice.isExtraFree}
              isWholeDay={parkingPrice.isWholeDay}
              inputValues={[
                card.price,
                card.startTime,
                card.endTime,
                card.extraFree,
              ]}
              onInputChange={handleInputChange}
              onRemove={handleRemoveCard}
            />
          </Grid>
        ))}
        {cards.length < 5 && (
          <Grid item>
            <AddButton onClick={handleAddCard} />
          </Grid>
        )}
      </Grid>
      <FormControlLabel
        control={
          <Checkbox
            checked={parkingPrice.isPenaltyChecked}
            onChange={handlePenaltyCheck}
          />
        }
        label="Tiền phạt (Sẽ được áp dụng khi khách hàng đậu xe quá giờ đặt)"
        sx={{
          marginLeft: "20px",
          "& .MuiFormControlLabel-label": {
            fontWeight: "bold",
            fontSize: 17,
          },
        }}
      />
      {parkingPrice.isPenaltyChecked && (
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          sx={{
            border: "1px dashed gray",
            borderRadius: "8px",
            width: "97%",
            padding: "15px 10px 30px 10px",
            marginLeft: "23px",
          }}
        >
          <Grid item xs={5.5}>
            <Typography
              color={theme.palette.common.black}
              variant="h4"
              sx={{ paddingBottom: "6px" }}
            >
              Giá tiền phạt
            </Typography>
            <TextField
              type="number"
              inputProps={{ min: 0 }}
              value={parkingPrice.penaltyPrice}
              onChange={handlePenaltyPrice}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Typography
              color={theme.palette.common.black}
              variant="h4"
              sx={{ paddingBottom: "6px" }}
            >
              Cộng thêm sau mỗi
            </Typography>
            <TextField
              type="number"
              inputProps={{ min: 0 }}
              value={parkingPrice.penaltyPriceStep}
              onChange={handlePenaltyPriceStep}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginTop: "14px" }}
      >
        <SaveButton onClick={handleSave} />
      </Grid>
    </MainCard>
  );
};

export default CreateNewPrice;
