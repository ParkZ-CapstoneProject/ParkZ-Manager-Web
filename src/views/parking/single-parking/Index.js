import React from "react";
import MainCard from "ui-component/cards/MainCard";
import ParkingImage from "ui-component/parking/parking-images/ParkingImage";
import ParkingDetailInfo from "ui-component/parking/single-parking/DetailParkInfo/ParkingDetailInfo";
import Tabs from "ui-component/parking/single-parking/Tabs";
import HistoryBooking from "ui-component/parking/single-parking/HistoryParking/HistoryBooking";
import FloorParking from "ui-component/parking/single-parking/PhysicalModalParking/FloorParking";

const tabs = [
  {
    label: "Thông tin bãi xe",
    component: <ParkingDetailInfo />,
  },
  {
    label: "Thông tin xa bàn",
    component: <FloorParking />,
  },
  {
    label: "Hình ảnh bãi xe",
    component: <ParkingImage />,
  },
  {
    label: "Lịch sử đặt",
    component: <HistoryBooking />,
  },
];

const ParkingDetail = () => {
  return (
    <MainCard title="Chi tiết bãi xe">
      <div className="container mx-auto mt-4">
        <Tabs tabs={tabs} />
      </div>
    </MainCard>
  );
};

export default ParkingDetail;
