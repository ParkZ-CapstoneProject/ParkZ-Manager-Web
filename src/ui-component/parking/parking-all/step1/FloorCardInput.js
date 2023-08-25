import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const FloorCardInput = (props) => {
  const { index, inputValues, onInputChange, onRemove, setError } = props;
  const theme = useTheme();
  const [values, setValues] = useState(inputValues);

  const handleInputChange = (event, inputIndex) => {
    const newValue = Number(event.target.value);

    if (inputIndex === 0) {
      onInputChange(index, inputIndex + 1, `Tầng ${index + 1}`);
    }

    const newValues = [...values];
    newValues[inputIndex] = newValue;
    setValues(newValues);
    onInputChange(index, inputIndex + 1, newValue);
  };

  useEffect(() => {
    if (values[2] > values[1]) {
      setError(true);
      Swal.fire({
        icon: "error",
        text: "Số vị trí dự phòng không được vượt quá tổng số vị trí",
      }).then(() => {
        // Clear the input value for the backup position field
        const newValues = [...values];
        newValues[2] = 0;
        setValues(newValues);
      });
    } else if (values[3] > 0 && values[4] > 0) {
      if (values[4] * values[3] < values[1]) {
        setError(true);
        Swal.fire({
          icon: "error",
          text: "Tổng số vị trí phải nhỏ hơn hoặc bằng tích hàng và cột!",
        }).then(() => {
          // Clear the input value for the column and row fields
          const newValues = [...values];
          newValues[4] = 0;
          setValues(newValues);
        });
      } else {
        setError(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  // ...

  const handleReset = () => {
    setValues(inputValues);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{
          border: "1px dashed gray",
          borderRadius: "7px",
          padding: "5px 20px 30px 5px",
          marginBottom: "15px",
          // width: "100%",
        }}
      >
        <Grid item sx={{ textAlign: "center" }}>
          <Typography color={theme.palette.secondary.dark} variant="h3">
            Tầng {index + 1}
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

        <Grid item container direction="row" spacing={2.5} alignItems="center">
          <Grid item xs={6}>
            <Typography
              color={theme.palette.common.black}
              variant="subtitle1"
              sx={{ fontSize: "16px" }}
            >
              Tổng số vị trí
            </Typography>
            <TextField
              type="number"
              fullWidth
              inputProps={{ min: 0 }} // Set min value to 0
              value={values[1]}
              onChange={(event) => handleInputChange(event, 1)}
              onBlur={handleReset}
              // sx={{
              //   width: "100%",
              // }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              color={theme.palette.common.black}
              variant="subtitle1"
              sx={{ fontSize: "16px" }}
            >
              Vị trí dự phòng
            </Typography>
            <TextField
              type="number"
              fullWidth
              inputProps={{ min: 0 }} // Set min value to 0
              value={values[2]}
              onChange={(event) => handleInputChange(event, 2)}
              onBlur={handleReset}
              // sx={{
              //   width: "100%",
              // }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            color={theme.palette.common.black}
            variant="subtitle1"
            sx={{ fontSize: "16px" }}
          >
            Số hàng
          </Typography>
          <TextField
            type="number"
            fullWidth
            inputProps={{ min: 0 }} // Set min value to 0
            value={values[3]}
            onChange={(event) => handleInputChange(event, 3)}
            onBlur={handleReset}
            sx={{
              width: "100%",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            color={theme.palette.common.black}
            variant="subtitle1"
            sx={{ fontSize: "16px" }}
          >
            Số cột
          </Typography>
          <TextField
            fullWidth
            type="number"
            inputProps={{ min: 0 }} // Set min value to 0
            value={values[4]}
            onChange={(event) => handleInputChange(event, 4)}
            onBlur={handleReset}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

FloorCardInput.propTypes = {
  index: PropTypes.number.isRequired,
  inputValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FloorCardInput;
