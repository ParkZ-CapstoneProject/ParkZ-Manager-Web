import { Avatar, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { ImFilesEmpty } from "react-icons/im";
import Menu from "ui-component/booking/Menu";
import MainCard from "ui-component/cards/MainCard";

const getCellValue = (params) => {
  return params.value ? params.value : "-------";
};

const renderCellStatus = (params) => {
  const statusMap = {
    Initial: { color: "#fff", bgColor: "gray" },
    Done: { color: "#fff", bgColor: "#4caf50" },
    OverTime: { color: "#fff", bgColor: "#1976d2" },
    Check_In: { color: "#fff", bgColor: "#f44336" },
    Check_Out: { color: "#000", bgColor: "#ff9800" },
    Success: { color: "#fff", bgColor: "#2196f3" },
    Cancel: { color: "#fff", bgColor: "#f44336" },
  };

  const { value } = params;
  const statusStyle = statusMap[value] || {
    color: "inherit",
    bgColor: "gray",
  };

  return (
    <Chip
      label={value}
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
  { field: "bookingId", headerName: "ID", width: 70 },
  {
    field: "customerName",
    headerName: "Tên khách hàng",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 170,
    valueGetter: (params) => `${params.row.customerName || ""}`,
  },
  { field: "position", headerName: "Vị trí", width: 100 },
  {
    field: "startTime",
    headerName: "Thời gian đặt",
    width: 200,
    valueGetter: getCellValue,
    renderCell: (params) =>
      `${formatTime(params.row.startTime) || ""} - ${
        formatTime(params.row.endTime) || ""
      }`,
  },
  {
    field: "totalPrice",
    headerName: "Giá",
    // type: "number",
    width: 100,
    renderCell: (params) =>
      params.row.totalPrice ? formatPrice(params.row.totalPrice) : "-----",
  },
  {
    field: "actualPrice",
    headerName: "Giá thực tế",
    // type: "number",
    width: 100,
    renderCell: (params) =>
      params.row.actualPrice ? formatPrice(params.row.actualPrice) : "-----",
  },
  { field: "phone", headerName: "Số điện thoại", width: 130 },
  { field: "licensePlate", headerName: "Biển số xe", width: 110 },
  { field: "parkingName", headerName: "Bãi xe", width: 130 },
  {
    field: "checkInTime",
    headerName: "Giờ vào",
    width: 120,
    // valueGetter: getCellValue,
    renderCell: (params) =>
      params.value ? formatTime(params.row.checkInTime) : "-----",
  },
  {
    field: "checkOutTime",
    headerName: "Giờ ra",
    width: 120,
    // valueGetter: getCellValue,
    renderCell: (params) =>
      params.value ? formatTime(params.row.checkOutTime) : "-----",
  },
  {
    field: "paymentMethod",
    headerName: "Thanh toán",
    width: 130,
    valueGetter: getCellValue,
  },
  {
    field: "guestName",
    headerName: "Người đặt hộ",
    width: 170,
    valueGetter: getCellValue,
  },
  {
    field: "guestPhone",
    headerName: "SĐT đặt hộ",
    width: 130,
    valueGetter: getCellValue,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
    valueGetter: getCellValue,
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

  return (
    <>
      {rows ? (
        <div style={{ height: "500px", width: "100%", marginTop: "15px" }}>
          <DataGrid
            rows={rows}
            rowHeight={70}
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
