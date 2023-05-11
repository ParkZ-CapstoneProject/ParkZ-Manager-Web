import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import {
  openModal,
  setAccept,
  setBookingId,
  setCancel,
  setCheckIn,
  setCheckOut,
} from "store/modalReducer";
import ModalBooking from "ui-component/modal/ModalBooking";

const Menu = ({ value, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setBookingId(id));
    console.log("id: ", id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleOpenModalAccept = () => {
    dispatch(setAccept(true));
    dispatch(setCheckIn(false));
    dispatch(setCheckOut(false));
    dispatch(setCancel(false));
    dispatch(openModal());
  };

  const handleOpenModalCheckIn = () => {
    dispatch(setAccept(false));
    dispatch(setCheckIn(true));
    dispatch(setCheckOut(false));
    dispatch(setCancel(false));
    dispatch(openModal());
  };

  const handleOpenModalCheckOut = () => {
    dispatch(setAccept(false));
    dispatch(setCheckIn(false));
    dispatch(setCheckOut(true));
    dispatch(setCancel(false));
    dispatch(openModal());
  };

  const handleOpenModalCancel = () => {
    dispatch(setAccept(false));
    dispatch(setCheckIn(false));
    dispatch(setCheckOut(false));
    dispatch(setCancel(true));
    dispatch(openModal());
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
          <ListItem onClick={handleOpenModalAccept}>
            <CheckIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Xác nhận
            </Typography>
          </ListItem>
          <ListItem onClick={handleOpenModalCheckIn}>
            <CheckCircleIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Check in
            </Typography>
          </ListItem>
          <ListItem onClick={handleOpenModalCheckOut}>
            <ExitToAppIcon sx={{ marginRight: "3%", color: "#ffc107" }} />
            <Typography color="#ffc107" variant="subtitle1">
              Check out
            </Typography>
          </ListItem>
          <ListItem onClick={handleOpenModalCancel}>
            <CancelIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Hủy
            </Typography>
          </ListItem>
        </List>
      </Popover>

      <ModalBooking />
    </>
  );
};

export default Menu;
