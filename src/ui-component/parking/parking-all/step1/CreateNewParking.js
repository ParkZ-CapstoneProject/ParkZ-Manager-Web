import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";
import UploadFront from "ui-component/upload-file/UploadFront";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import NextButton from "ui-component/buttons/next-button/NextButton";

const CreateNewParking = () => {
  const theme = useTheme();
  return (
    <>
      <MainCard title="Tạo mới bãi xe">
        <Grid
          container
          direction="row"
          spacing={3}
          justifyContent="space-evenly"
        >
          <Grid item container direction="column" xs={5} spacing={2}>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Tên
              </Typography>
            </Grid>
            <Grid item>
              <TextField type="text" fullWidth color="secondary" label="Tên" />
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Mô tả
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                type="text"
                name="description"
                label="Mô tả"
                color="secondary"
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Grid item>
                <Checkbox />
              </Grid>
              <Grid item>
                <Typography
                  color={theme.palette.common.dark}
                  variant="subtitle2"
                >
                  Xe máy
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Số vị trí xe máy
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                type="number"
                fullWidth
                color="secondary"
                label="Số vị trí"
              />
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Cước xe máy
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Cước phí xe máy
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={gender}
                  label="cước"
                  // onChange={handleChange}
                >
                  <MenuItem fullWidth value="nam" sx={{ width: "100%" }}>
                    Bãi xe số 1
                  </MenuItem>
                  <br />
                  <MenuItem fullWidth value="nữ" sx={{ width: "100%" }}>
                    Bãi xe số 2
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Chọn hình ảnh
              </Typography>
            </Grid>
            <Grid item>
              <UploadFront />
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="column"
            xs={5}
            sx={{ marginTop: "6%" }}
            spacing={2}
          >
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Địa chỉ
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                type="text"
                name="address"
                label="Địa chỉ(Số, đường, quận, TP Hô Chí Minh)"
                color="secondary"
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Grid item>
                <Checkbox />
              </Grid>
              <Grid item>
                <Typography
                  color={theme.palette.common.dark}
                  variant="subtitle2"
                >
                  Xe ô tô
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Số vị trí xe ô tô
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                type="number"
                fullWidth
                color="secondary"
                label="Số vị trí"
              />
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.secondary.dark}
                variant="subtitle1"
              >
                Cước xe ô tô
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Cước phí xe ô tô
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={gender}
                  label="cước"
                  // onChange={handleChange}
                >
                  <MenuItem fullWidth value="nam" sx={{ width: "100%" }}>
                    Bãi xe số 1
                  </MenuItem>
                  <br />
                  <MenuItem fullWidth value="nữ" sx={{ width: "100%" }}>
                    Bãi xe số 2
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ marginLeft: "85%", marginTop: "-3%" }}>
          <NextButton />
        </div>
      </MainCard>
    </>
  );
};

export default CreateNewParking;
