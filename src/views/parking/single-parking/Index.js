import React from "react";
import MainCard from "ui-component/cards/MainCard";
import ParkingImage from "ui-component/parking/parking-images/ParkingImage";
import ParkingDetailInfo from "ui-component/parking/single-parking/DetailParkInfo/ParkingDetailInfo";
import Tabs from "ui-component/parking/single-parking/Tabs";
import HistoryBooking from "ui-component/parking/single-parking/HistoryParking/HistoryBooking";
import FloorParking from "ui-component/parking/single-parking/PhysicalModalParking/FloorParking";
import DisableDateHistory from "ui-component/parking/single-parking/DisableDateHistory/DisableDateHistory";

const tabs = [
  {
    label: "Thông tin bãi xe",
    component: <ParkingDetailInfo />,
  },
  {
    label: "Thông tin sa bàn",
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
  {
    label: "Lịch sử ngưng hoạt động",
    component: <DisableDateHistory />,
  },
];

const ParkingDetail = () => {
  // const { id } = useParams();

  // console.log("parkingId", id);
  return (
    <MainCard title="Chi tiết bãi xe">
      <div className="container mx-auto mt-4">
        <Tabs tabs={tabs} />
      </div>
    </MainCard>
  );
};

export default ParkingDetail;
