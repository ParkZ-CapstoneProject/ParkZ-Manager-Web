import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
// import { useDispatch } from "react-redux";
// import { closeModal } from "store/modalReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCreate = (props) => {
  const { open, onClose } = props;

  const theme = useTheme();
  // const dispatch = useDispatch();
  const handleClose = () => {
    if (onClose) {
      onClose();
      // dispatch(closeModal());
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: "center" }}>
          <Typography color={theme.palette.primary.main} variant="h3">
            Xác nhận hành động
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color={theme.palette.secondary.dark} variant="subtitle1">
            Bạn có chắc chắn muốn lưu thay đổi
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Hủy
          </Button>
          {/* <Button color="secondary">Delete</Button> */}
          <Button color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogCreate;
