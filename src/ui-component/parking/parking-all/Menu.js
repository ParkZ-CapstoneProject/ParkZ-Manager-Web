import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch } from "react-redux";
import { openModal, setBookingId, setStaffId } from "store/modalReducer";
import EditModalStaff from "ui-component/modal/staff-modal/edit-modal/EditModalStaff";
import DetailModalStaff from "ui-component/modal/staff-modal/detail-modal/DetailModalStaff";
import DeleteModalStaff from "ui-component/modal/staff-modal/delete-modal/DeleteModalStaff";
import { useNavigate } from "react-router";

const Menu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setBookingId(id));
    console.log("id: ", id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleDetail = () => {
    navigate(`/parking-detail/${id}`);
  };

  const handleOpenModalDelete = (modalType) => {
    dispatch(setStaffId(id));
    dispatch(openModal(modalType));
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
        <List sx={{ width: "130px" }}>
          {/* <ListItem onClick={() => handleOpenModalEdit("modalStaffEdit")}>
            <EditIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Chỉnh sửa
            </Typography>
          </ListItem> */}
          <ListItem onClick={handleDetail}>
            <RemoveRedEyeIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Chi tiết
            </Typography>
          </ListItem>

          <ListItem onClick={handleDetail}>
            <NoEncryptionGmailerrorredIcon
              sx={{ marginRight: "3%", color: "#2196f3" }}
            />
            <Typography color="primary" variant="subtitle1">
              Tắt bãi
            </Typography>
          </ListItem>

          <ListItem onClick={() => handleOpenModalDelete("modalStaffDelete")}>
            <DeleteIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Xóa
            </Typography>
          </ListItem>
        </List>
      </Popover>

      <EditModalStaff modalType="modalStaffEdit" />
      <DetailModalStaff modalType="modalStaffDetail" />
      <DeleteModalStaff modalType="modalStaffDelete" />
    </>
  );
};

export default Menu;
