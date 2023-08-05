import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";

const CardInput = (props) => {
  const {
    index,
    inputValues,
    onInputChange,
    onRemove,
    isExtraFree,
    isWholeDay,
  } = props;
  const [values, setValues] = useState(inputValues);

  const theme = useTheme();

  const handleInputChange = (event, inputIndex) => {
    let newValue = event.target.value;

    if (inputIndex === 1 || inputIndex === 2) {
      newValue = formatTime(newValue);
    }

    const newValues = [...values];
    newValues[inputIndex] = newValue;
    setValues(newValues);
    onInputChange(index, inputIndex + 1, newValue);
  };

  const handleReset = () => {
    setValues(inputValues);
  };

  const formatTime = (timeString) => {
    const date = new Date();
    const [hours] = timeString.split(":");
    date.setHours(hours);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        spacing={2}
        sx={{
          border: "1px dashed gray",
          borderRadius: "7px",
          padding: "0px 0px 30px 5px",
          marginBottom: "15px",
          width: "100%",
        }}
      >
        <Grid item xs={11} sx={{ textAlign: "center" }}>
          <Typography color={theme.palette.secondary.dark} variant="h3">
            Khung giờ {index + 1}
          </Typography>
        </Grid>
        {index !== 0 && (
          <Grid item sx={{ marginLeft: "auto", marginTop: "-18px" }}>
            <IconButton onClick={() => onRemove(index)}>
              <CloseIcon
                sx={{
                  background: "#262525",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </IconButton>
          </Grid>
        )}

        <Grid item container direction="row" spacing={4} xs={11}>
          <Grid item xs={6}>
            <Typography color={theme.palette.common.black} variant="subtitle1">
              Từ giờ
            </Typography>
            <TextField
              type="time" // Change type to "number"
              label="giờ"
              value={values[1]}
              disabled={!isExtraFree || isWholeDay}
              onChange={(event) => handleInputChange(event, 1)}
              sx={
                !isExtraFree || isWholeDay
                  ? { width: "100%", opacity: 0.5 }
                  : { width: "100%" }
              }
              InputProps={{
                inputProps: {
                  style: { textAlign: "center" },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography color={theme.palette.common.black} variant="subtitle1">
              Đến giờ
            </Typography>
            <TextField
              type="time"
              value={values[2]}
              label="giờ"
              disabled={!isExtraFree || isWholeDay}
              onChange={(event) => handleInputChange(event, 2)}
              sx={
                !isExtraFree || isWholeDay
                  ? { width: "100%", opacity: 0.5 }
                  : { width: "100%" }
              }
              InputProps={{
                inputProps: {
                  style: { textAlign: "center" },
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" xs={11}>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Giá cước
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: 0 }} // Set min value to 0
            value={values[0]}
            onChange={(event) => handleInputChange(event, 0)}
            onBlur={handleReset}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item container direction="row" xs={11}>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Giá phụ phí
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: 0 }} // Set min value to 0
            value={values[3]}
            disabled={!isExtraFree}
            onChange={(event) => handleInputChange(event, 3)}
            onBlur={handleReset}
            sx={
              !isExtraFree ? { width: "100%", opacity: 0.5 } : { width: "100%" }
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

CardInput.propTypes = {
  index: PropTypes.number.isRequired,
  inputValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CardInput;
