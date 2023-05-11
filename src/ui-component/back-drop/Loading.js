import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import IconLoading from "./IconLoading";

const Loading = () => {
  return (
    <>
      <Backdrop
        open="true"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <IconLoading />
      </Backdrop>
    </>
  );
};

export default Loading;
