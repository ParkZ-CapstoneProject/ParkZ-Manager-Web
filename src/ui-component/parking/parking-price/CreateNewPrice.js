import React, { useState } from "react";
import CardInput from "./CardInput";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard";
import AddButton from "ui-component/buttons/add-button/AddButton";
import NextButton from "ui-component/buttons/next-button/NextButton";

const CreateNewPrice = () => {
  const [cards, setCards] = useState([
    {
      price: 0,
      startTime: "",
      endTime: "",
      isExtraFree: false,
      startingTime: 0,
      extraFree: 0,
      extraTimeStep: 0,
    },
  ]);
  const [name, setName] = useState("");
  const [vehicleType, setVehicleType] = useState(1);
  const [isPenaltyChecked, setIsPenaltyChecked] = useState(false);
  const [penaltyPrice, setPenaltyPrice] = useState(0);
  const [penaltyPriceStep, setPenaltyPriceStep] = useState(0);

  const theme = useTheme();

  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        price: 0,
        startTime: "",
        endTime: "",
        isExtraFree: false,
        startingTime: 0,
        extraFree: 0,
        extraTimeStep: 0,
      },
    ]);
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
    setName(e.target.value);
  };

  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };

  const handlePenaltyCheck = (event) => {
    setIsPenaltyChecked(event.target.checked);
  };

  const handlePenaltyPrice = (e) => {
    setPenaltyPrice(e.target.value);
  };

  const handlePenaltyPriceStep = (e) => {
    setPenaltyPriceStep(e.target.value);
  };

  console.log("cards", cards);

  return (
    <MainCard title="Tạo mới cước phí">
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={5.5}>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Tên cước phí
          </Typography>
          <TextField
            type="text"
            value={name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.5}>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Loại xe
          </Typography>
          <Select
            value={vehicleType}
            onChange={handleVehicleTypeChange}
            sx={{ width: "100%" }}
          >
            <option value={1}>Xe hơi</option>
            <option value={2}>Xe máy</option>
          </Select>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={6}
        sx={{ marginTop: "3px", marginLeft: "1px" }}
      >
        {cards.map((card, index) => (
          <Grid item xs={3.5} key={index}>
            <CardInput
              index={index}
              inputValues={[
                card.price,
                card.startTime,
                card.endTime,
                card.isExtraFree,
                card.startingTime,
                card.extraFree,
                card.extraTimeStep,
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
          <Checkbox checked={isPenaltyChecked} onChange={handlePenaltyCheck} />
        }
        label="Phạt qua giờ"
        sx={{
          marginLeft: "20px",
          "& .MuiFormControlLabel-label": {
            fontWeight: "bold",
            fontSize: 17,
          },
        }}
      />
      {isPenaltyChecked && (
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          sx={{
            border: "1px dashed gray",
            borderRadius: "7px",
            width: "97%",
            padding: "10px 10px 30px 10px",
            marginLeft: "23px",
          }}
        >
          <Grid item xs={5.5}>
            <Typography color={theme.palette.common.black} variant="subtitle1">
              Giá tiền phạt
            </Typography>
            <TextField
              type="number"
              value={penaltyPrice}
              onChange={handlePenaltyPrice}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Typography color={theme.palette.common.black} variant="subtitle1">
              Bước thời gian
            </Typography>
            <TextField
              type="number"
              value={penaltyPriceStep}
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
        <NextButton />
      </Grid>
    </MainCard>
  );
};

export default CreateNewPrice;
