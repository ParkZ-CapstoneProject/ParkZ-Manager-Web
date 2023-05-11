import React from "react";
import "./CancelButton.scss";

const CancelButton = (props) => {
  const { onClick } = props;
  return (
    <div>
      <button class="btn-cancel" onClick={onClick}>
        Hủy
      </button>
    </div>
  );
};

export default CancelButton;
