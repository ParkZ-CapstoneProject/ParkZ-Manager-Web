import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const CardInput = (props) => {
  const { index, inputValues, onInputChange, onRemove } = props;
  const [values, setValues] = useState(inputValues);

  const theme = useTheme();

  const handleInputChange = (event, inputIndex) => {
    const newValues = [...values];
    newValues[inputIndex] = event.target.value;
    setValues(newValues);
    onInputChange(index, inputIndex + 1, event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const newValues = [...values];
    newValues[3] = event.target.checked;
    setValues(newValues);
    onInputChange(index, 4, event.target.checked);
  };

  const handleReset = () => {
    setValues(inputValues);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        spacing={2}
        sx={{
          border: "1px dashed gray",
          borderRadius: "7px",
          padding: "0px 0px 30px 5px",
          marginBottom: "15px", // Add marginBottom property
        }}
      >
        <Grid item>
          <Typography color={theme.palette.secondary.dark} variant="h3">
            Khung giờ {index + 1}
          </Typography>
        </Grid>
        {index !== 0 && (
          <Grid item sx={{ marginLeft: "auto", marginTop: "-52px" }}>
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

        <Grid item xs={12}>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Giá cước
          </Typography>
          <TextField
            type="number"
            value={values[0]}
            onChange={(event) => handleInputChange(event, 0)}
            onBlur={handleReset}
            sx={{ width: "180%" }}
          />
        </Grid>
        <Grid item container direction="row" spacing={9}>
          <Grid item>
            <Typography color={theme.palette.common.black} variant="subtitle1">
              Từ
            </Typography>
            <TextField
              type="time"
              value={values[1]}
              onChange={(event) => handleInputChange(event, 1)}
              onBlur={handleReset}
              sx={{ width: "120%" }}
            />
          </Grid>
          <Grid item>
            <Typography color={theme.palette.common.black} variant="subtitle1">
              Đến
            </Typography>
            <TextField
              type="time"
              value={values[2]}
              onChange={(event) => handleInputChange(event, 2)}
              onBlur={handleReset}
              sx={{ width: "120%" }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox checked={values[3]} onChange={handleCheckboxChange} />
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
        <Grid item>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Số giờ bắt đầu tính phụ phí
          </Typography>
          <TextField
            type="number"
            value={values[4]}
            disabled={!values[3]}
            onChange={(event) => handleInputChange(event, 4)}
            onBlur={handleReset}
            sx={{ width: "180%" }}
          />
        </Grid>
        <Grid item>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Giá phụ phí
          </Typography>
          <TextField
            type="number"
            value={values[5]}
            disabled={!values[3]}
            onChange={(event) => handleInputChange(event, 5)}
            onBlur={handleReset}
            sx={{ width: "180%" }}
          />
        </Grid>
        <Grid item>
          <Typography color={theme.palette.common.black} variant="subtitle1">
            Bước thời gian
          </Typography>
          <TextField
            type="number"
            value={values[6]}
            disabled={!values[3]}
            onChange={(event) => handleInputChange(event, 6)}
            onBlur={handleReset}
            sx={{ width: "180%" }}
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
