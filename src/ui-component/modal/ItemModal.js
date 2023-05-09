import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import AcceptButton from "ui-component/buttons/accept-button/AcceptButton";
import CancelButton from "ui-component/buttons/simple-cancel-button/CancelButton";
// import SaveButton from "ui-component/buttons/save-button/SaveButton";

const ItemModal = () => {
  const theme = useTheme();

  return (
    <>
      <Grid container direction="row">
        <Grid
          item
          container
          xs={5}
          direction="column"
          spacing={2}
          justifyContent="center"
          //   alignItems="center"
          sx={{ marginLeft: "1%", marginTop: "4%" }}
        >
          <Grid item sx={{ textAlign: "center" }}>
            <Typography color={theme.palette.primary.main} variant="h2">
              Thông tin chi tiết
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            // spacing={4}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Mã
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                123
              </Typography>
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: "2%" }}>
            <Typography color={theme.palette.primary.secondary} variant="h3">
              Hồ sơ
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Người đặt
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Ngọc Hương
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                SĐT
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                0234125123
              </Typography>
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: "2%" }}>
            <Typography color={theme.palette.primary.secondary} variant="h3">
              Người được đặt hộ
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Tên KH
              </Typography>
            </Grid>

            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Ngọc Hương
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                SĐT
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                0234125123
              </Typography>
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: "2%" }}>
            <Typography color={theme.palette.primary.secondary} variant="h3">
              Thông tin xe
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Phương tiện
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Mercedes-Benz SUV
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Biển số xe
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                60A - 12345
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Loại xe
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Ô tô
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Màu xe
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Đen
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Màu xe
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Đen
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "6%" }}
          >
            <Grid item>
              <Typography
                color={theme.palette.common.black}
                variant="h3"
                sx={{ fontSize: "25px" }}
              >
                Số tiền
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.common.black}
                variant="h3"
                sx={{ fontSize: "25px" }}
              >
                20,000VNĐ
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          xs={5}
          alignItems="center"
          sx={{ marginLeft: "10%", marginTop: "4%" }}
          spacing={2}
        >
          <Grid item>
            <Avatar
              alt="avatar"
              src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
              variant="rounded"
              sx={{
                width: "250px",
                height: "250px",
                // marginLeft: "5%",
                marginTop: "5%",
                borderRadius: "15px",
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              color={theme.palette.primary.secondary}
              variant="h3"
              sx={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              Thông tin đơn
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Bãi xe
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                Bãi xe Hoàng Văn Thụ
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Ngày đặt
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                11-04-2023
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Giờ vào
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                7:00 AM
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Giờ ra
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                10:00 AM
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Vị trí
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                A1
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h4">
                Tầng
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.black} variant="h4">
                1
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-end"
        sx={{ marginTop: "7%" }}
      >
        <Grid item>
          <CancelButton />
        </Grid>
        <Grid item>
          <AcceptButton />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemModal;
