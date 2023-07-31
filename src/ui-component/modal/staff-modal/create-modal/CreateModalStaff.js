import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "store/modalReducer";
import ItemModal from "./ItemModal";

const style = {
  position: "fixed",
  overFlow: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  maxWidth: "40%",
  minHeight: "91%",
  maxHeight: "93%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 12,
  p: 4,
  zIndex: 9999,
};

export default function CreateModalStaff({ modalType }) {
  const theme = useTheme();
  const isOpen = useSelector((state) => state.modal.modals.includes(modalType));
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal(modalType));
  };

  return (
    <div>
      {/* <Button onClick={() => handleOpen("createModalStaff")}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ border: "none" }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                color: theme.palette.grey[500],
                backgroundColor: theme.palette.grey[100],
              }}
            >
              <CloseIcon />
            </IconButton>
            <ItemModal modalType={modalType} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
