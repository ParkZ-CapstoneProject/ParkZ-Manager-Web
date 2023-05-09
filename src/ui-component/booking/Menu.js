import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "store/modalReducer";
import ModalBooking from "ui-component/modal/ModalBooking";
// import { useTheme } from "@mui/material/styles";

const Menu = ({ value, id }) => {
  // const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  // const { openModal } = useSelector((state) => state.modal.openModal);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("id: ", id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    console.log("clicked");
    console.log("isModalOpen", isModalOpen);
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
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
          <ListItem onClick={handleOpenModal}>
            <CheckIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Xác nhận
            </Typography>
          </ListItem>
          <ListItem onClick={() => console.log("clicked")}>
            <CheckCircleIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Check in
            </Typography>
          </ListItem>
          <ListItem onClick={() => console.log("clicked")}>
            <ExitToAppIcon sx={{ marginRight: "3%", color: "#ffc107" }} />
            <Typography color="#ffc107" variant="subtitle1">
              Check out
            </Typography>
          </ListItem>
          <ListItem onClick={() => console.log("clicked")}>
            <CancelIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Hủy
            </Typography>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default Menu;
