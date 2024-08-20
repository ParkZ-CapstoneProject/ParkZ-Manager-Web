import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import DisableRightNow from "ui-component/modal/disable-parking/Disable/DisableRightNow";

const Menu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const apiUrl = "https://parkzapi.azurewebsites.net/api";
  const token = localStorage.getItem("token");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleDetail = () => {
    navigate(`/parking-detail/${id}`);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn thay đổi!",
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

        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          // body: JSON.stringify(requestBody),
        };

        const response = await fetch(
          `${apiUrl}/parkings/parking/${id}`,
          requestOptions
        );
        if (response.statusCode === 204) {
          Swal.fire({
            icon: "success",
            text: "Xóa bãi xe thành công!",
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

  const handleDisableRightNow = () => {
    setIsOpen(true);
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
        <List sx={{ width: "145px" }}>
          <ListItem onClick={handleDetail}>
            <RemoveRedEyeIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Chi tiết
            </Typography>
          </ListItem>

          <ListItem onClick={() => handleDisableRightNow()}>
            <NoEncryptionGmailerrorredIcon
              sx={{ marginRight: "3%", color: "#2196f3" }}
            />
            <Typography color="primary" variant="subtitle1">
              Tắt bãi ngay
            </Typography>
          </ListItem>

          <ListItem onClick={handleDelete}>
            <DeleteIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Xóa
            </Typography>
          </ListItem>
        </List>
      </Popover>

      <DisableRightNow isOpen={isOpen} setIsOpen={setIsOpen} parkingId={id} />
    </>
  );
};

export default Menu;
