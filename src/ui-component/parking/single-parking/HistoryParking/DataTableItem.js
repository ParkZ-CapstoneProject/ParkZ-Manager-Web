import { Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { ImFilesEmpty } from "react-icons/im";
import Menu from "ui-component/booking/Menu";

const getCellValue = (params) => {
  return params.value ? params.value : "-------";
};

const renderCellStatus = (params) => {
  const statusMap = {
    Initial: { label: "Khởi tạo", color: "#fff", bgColor: "gray" },
    Done: { label: "Hoàn thành", color: "#fff", bgColor: "#1e88e5" },
    OverTime: { label: "Quá hạn", color: "#fff", bgColor: "#1976d2" },
    Check_In: { label: "Check in", color: "#fff", bgColor: "#f44336" },
    Check_Out: { label: "Check out", color: "#000", bgColor: "#ff9800" },
    Success: {
      label: "Thành công",
      color: "#fff",
      bgColor: "rgb(56, 142, 60)",
    },
    Cancel: { label: "Hủy bỏ", color: "#fff", bgColor: "rgb(244, 67, 54)" },
  };

  const { value } = params;
  const statusStyle = statusMap[value] || {
    label: value,
    color: "inherit",
    bgColor: "gray",
  };

  return (
    <Chip
      label={statusStyle.label}
      sx={{
        backgroundColor: statusStyle.bgColor,
        color: statusStyle.color,
        padding: "5px",
      }}
    />
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const timeString = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};

const formatPrice = (number) => {
  const formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formattedNumber;
};

const columns = [
  {
    field: "bookingId",
    headerName: "ID",
    width: 70,
    valueGetter: (params) =>
      params.row.bookingForGetAllBookingByParkingIdResponse?.bookingId ||
      "----",
  },
  {
    field: "name",
    headerName: "Tên khách hàng",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 170,
    valueGetter: (params) =>
      `${params.row.userForGetAllBookingByParkingIdResponse?.name || "----"}`,
  },
  {
    field: "floor",
    headerName: "Tầng",
    width: 100,
    valueGetter: (params) =>
      `${params.row.floorDtoForAdmin?.floorName || "----"}`,
  },
  {
    field: "position",
    headerName: "Vị trí",
    width: 100,
    valueGetter: (params) => `${params.row.slotDtoForAdmin?.name || "----"}`,
  },
  {
    field: "startTime",
    headerName: "Thời gian đặt",
    width: 200,
    valueGetter: getCellValue,
    renderCell: (params) =>
      `${
        formatTime(
          params.row.bookingForGetAllBookingByParkingIdResponse?.startTime
        ) || ""
      } - ${
        formatTime(
          params.row.bookingForGetAllBookingByParkingIdResponse?.endTime
        ) || ""
      }`,
  },
  {
    field: "totalPrice",
    headerName: "Giá",
    // type: "number",
    width: 100,
    renderCell: (params) =>
      params.row.bookingForGetAllBookingByParkingIdResponse?.totalPrice
        ? formatPrice(
            params.row.bookingForGetAllBookingByParkingIdResponse?.totalPrice
          )
        : "-----",
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 130,
    valueGetter: (params) =>
      `${params.row.userForGetAllBookingByParkingIdResponse?.phone || "----"}`,
  },
  {
    field: "licensePlate",
    headerName: "Biển số xe",
    width: 110,
    valueGetter: (params) =>
      `${
        params.row.vehicleForGetAllBookingByParkingIdResponse?.licensePlate ||
        "----"
      }`,
  },
  {
    field: "parkingName",
    headerName: "Bãi xe",
    width: 130,
    valueGetter: (params) => `${params.row.parkingDtoForAdmin?.name || "----"}`,
  },
  {
    field: "checkInTime",
    headerName: "Giờ vào",
    width: 120,
    // valueGetter: getCellValue,
    renderCell: (params) =>
      params.row.bookingForGetAllBookingByParkingIdResponse?.checkinTime
        ? formatTime(
            params.row.bookingForGetAllBookingByParkingIdResponse?.checkinTime
          )
        : "-----",
  },
  {
    field: "checkOutTime",
    headerName: "Giờ ra",
    width: 120,
    // valueGetter: getCellValue,
    renderCell: (params) =>
      params.row.bookingForGetAllBookingByParkingIdResponse?.checkoutTime
        ? formatTime(
            params.row.bookingForGetAllBookingByParkingIdResponse?.checkoutTime
          )
        : "-----",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 160,
    valueGetter: (params) =>
      `${
        params.row.bookingForGetAllBookingByParkingIdResponse?.status || "----"
      }`,
    renderCell: renderCellStatus,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "action",
    headerName: "",
    width: 70,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => <Menu value={params.value} id={params.id} />,
  },
];

const DataTableItem = (props) => {
  const { rows } = props;
  console.log("rows", rows);
  return (
    <>
      {rows ? (
        <div style={{ height: "500px", width: "100%", marginTop: "15px" }}>
          <DataGrid
            rows={rows}
            rowHeight={70}
            getRowId={(row) =>
              row.bookingForGetAllBookingByParkingIdResponse.bookingId
            }
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            style={{ paddingTop: "12px" }}
          />
        </div>
      ) : (
        <>
          <Typography
            variant="h1"
            color="#21130d"
            sx={{ textAlign: "center", marginTop: "9%" }}
          >
            Không tìm thấy dữ liệu
          </Typography>
          <ImFilesEmpty
            style={{ fontSize: "150px", marginTop: "5%", marginLeft: "46%" }}
          />
        </>
      )}
    </>
  );
};

export default DataTableItem;
