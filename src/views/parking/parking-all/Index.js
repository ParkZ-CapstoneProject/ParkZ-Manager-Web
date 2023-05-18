import React from "react";
import MyParkingAll from "./ParkingAll";
import { useState } from "react";

const ParkingAll = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Bãi xe Hoàng Văn Thụ số 1",
      address: "Số 141/1A, Hoàng Văn Thụ, Quận Tân Bình Thạnh, TP HCM",
      description:
        "Bãi xe giả rẻ, rộng rãi, thoáng mát và thuận tiện di chuyển",
      motoSpot: 10,
      carSpot: 20,
      parking: "Bãi xe Hoang Văn Thụ số 1",
      isActive: "true",
      isFull: "false",
    },
    {
      id: 2,
      name: "Bãi xe Hoàng Văn Thụ số 1",
      address: "Số 141/1A, Hoàng Văn Thụ, Quận Tân Bình Thạnh, TP HCM",
      description:
        "Bãi xe giả rẻ, rộng rãi, thoáng mát và thuận tiện di chuyển",
      motoSpot: 10,
      carSpot: 20,
      parking: "Bãi xe Hoang Văn Thụ số 1",
      isActive: "false",
      isFull: "true",
    },
    {
      id: 3,
      name: "Bãi xe Hoàng Văn Thụ số 1",
      address: "Số 141/1A, Hoàng Văn Thụ, Quận Tân Bình Thạnh, TP HCM",
      description:
        "Bãi xe giả rẻ, rộng rãi, thoáng mát và thuận tiện di chuyển",
      motoSpot: 10,
      carSpot: 20,
      parking: "Bãi xe Hoang Văn Thụ số 1",
      isActive: "true",
      isFull: "true",
    },
    {
      id: 4,
      name: "Bãi xe Hoàng Văn Thụ số 1",
      address: "Số 141/1A, Hoàng Văn Thụ, Quận Tân Bình Thạnh, TP HCM",
      description:
        "Bãi xe giả rẻ, rộng rãi, thoáng mát và thuận tiện di chuyển",
      motoSpot: 10,
      carSpot: 20,
      parking: "Bãi xe Hoang Văn Thụ số 1",
      isActive: "false",
      isFull: "false",
    },
  ]);

  const updateRow = (rowId, isActive) => {
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, isActive } : row
    );
    setRows(updatedRows);
  };

  return (
    <>
      <MyParkingAll rows={rows} />
    </>
  );
};

export default ParkingAll;
