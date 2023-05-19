import React, { useState } from "react";
import MyParkingPrice from "./ParkingPrice";

const ParkingPrice = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Gói cước cho bãi xe số 1",
      parking: "Bãi xe Hoàng Văn Thụ số 1",
      isActive: "false",
    },
    {
      id: 2,
      name: "Gói cước cho bãi xe số 1",
      parking: "Bãi xe Hoàng Văn Thụ số 1",
      isActive: "true",
    },
    {
      id: 3,
      name: "Gói cước cho bãi xe số 1",
      parking: null,
      isActive: "false",
    },
    {
      id: 4,
      name: "Gói cước cho bãi xe số 1",
      parking: "Bãi xe Hoàng Văn Thụ số 1",
      isActive: "false",
    },
  ]);
  return (
    <>
      <MyParkingPrice rows={rows} />
    </>
  );
};

export default ParkingPrice;
