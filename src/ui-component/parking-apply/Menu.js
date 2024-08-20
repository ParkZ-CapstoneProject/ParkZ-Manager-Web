import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const Menu = ({ id }) => {
  const { priceId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();
  const apiUrl = "https://parkzapi.azurewebsites.net/api";
  const token = localStorage.getItem("token");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisablePrice = async () => {
    Swal.fire({
      text: "Bạn có chắc chắn ngưng gói giá đối với bãi xe này!",
      icon: "question",
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
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        };

        const response = await fetch(
          `${apiUrl}/parkingHasPrice/v2/${id}/${priceId}`,
          requestOptions
        );

        if (response.status === 204) {
          Swal.fire({
            icon: "success",
            text: "Gói cước đã được dừng thành công",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: response.message,
          });
        }
      }
    });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List sx={{ width: "180px" }}>
          {/* <ListItem onClick={() => navigate(`/price-detail/${id}`)}>
            <RemoveRedEyeIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Chi tiết
            </Typography>
          </ListItem>
          <ListItem onClick={() => navigate(`/price-detail-parking/${id}`)}>
            <HistoryIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Đã áp dụng
            </Typography>
          </ListItem> */}
          <ListItem onClick={handleDisablePrice}>
            <DoDisturbIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Ngưng áp dụng gói
            </Typography>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default Menu;
