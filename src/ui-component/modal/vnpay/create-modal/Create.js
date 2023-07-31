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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "43%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 12,
  p: 4,
};

export default function Create(props) {
  const { open, setOpen, vnPayId, edit } = props;

  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button onClick={() => handleOpen("createModalStaff")}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
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
        <Fade in={open}>
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
            <ItemModal vnPayId={vnPayId} edit={edit} setOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
