import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Create from "ui-component/modal/vnpay/create-modal/Create";
import DelEdit from "ui-component/modal/vnpay/delete-modal/DelEdit";

const Menu = ({ vnPayId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openDetailDelete, setOpenDetailDelete] = useState(false);
  const [detail, setDetail] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleOpenModalEdit = () => {
    setOpen(true);
    setEdit(true);
  };

  const handleOpenModalDetail = () => {
    setOpenDetailDelete(true);
    setDetail(true);
  };

  const handleOpenModalDelete = () => {
    setOpenDetailDelete(true);
    setDetail(false);
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
          <ListItem onClick={handleOpenModalEdit}>
            <EditIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Chỉnh sửa
            </Typography>
          </ListItem>
          <ListItem onClick={handleOpenModalDetail}>
            <RemoveRedEyeIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Chi tiết
            </Typography>
          </ListItem>
          <ListItem onClick={handleOpenModalDelete}>
            <DeleteIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Xóa
            </Typography>
          </ListItem>
        </List>
      </Popover>

      <Create open={open} setOpen={setOpen} edit={edit} vnPayId={vnPayId} />
      <DelEdit
        vnPayId={vnPayId}
        detail={detail}
        openDetailDelete={openDetailDelete}
        setOpenDetailDelete={setOpenDetailDelete}
      />
    </>
  );
};

export default Menu;
