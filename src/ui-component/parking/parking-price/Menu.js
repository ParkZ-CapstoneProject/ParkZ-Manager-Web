import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HistoryIcon from "@mui/icons-material/History";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Menu = ({ id, value }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
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
      text: value
        ? "Bạn có chắc chắn ngưng sử dụng gói giá này!"
        : "Bạn có chắc chắn kích hoạt lại gói giá này!",
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
        const request = {
          parkingPriceId: id,
        };

        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(request),
        };

        const response = await fetch(
          `${apiUrl}/parking-price/disable-or-enable-parking-price`,
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
        <List sx={{ width: "140px" }}>
          <ListItem onClick={() => navigate(`/price-detail/${id}`)}>
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
          </ListItem>
          <ListItem onClick={handleDisablePrice}>
            {value ? (
              <DeleteIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            ) : (
              <LibraryAddCheckIcon
                sx={{ marginRight: "3%", color: "#f44336" }}
              />
            )}
            <Typography color="error" variant="subtitle1">
              {value ? "Ngưng dùng" : "Kích hoạt"}
            </Typography>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default Menu;
