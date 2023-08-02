import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import SubCard from "ui-component/cards/SubCard";
import { Chip, Grid, Skeleton } from "@mui/material";
import Menu from "ui-component/booking/Menu";
import Loading from "ui-component/back-drop/Loading";
import { useRef } from "react";
import { useEffect } from "react";

const getCellValue = (params) => {
  return params.value ? params.value : "-------";
};

const renderCellStatus = (params) => {
  const statusMap = {
    Initial: { label: "Chưa xử lý", color: "#fff", bgColor: "gray" },
    Done: { label: "Hoàn thành", color: "#fff", bgColor: "#4caf50" },
    OverTime: { label: "Quá hạn", color: "#fff", bgColor: "#1976d2" },
    Check_In: { label: "Check in", color: "#fff", bgColor: "#f44336" },
    Check_Out: { label: "Check out", color: "#000", bgColor: "#ff9800" },
    Success: { label: "Thành công", color: "#fff", bgColor: "#2196f3" },
    Cancel: { label: "Hủy bỏ", color: "#fff", bgColor: "#f44336" },
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
    renderCell: (params) => <Menu id={params.id} />,
  },
];

export default function DataTable(props) {
  const { rows, loading } = props;
  const dataGridRef = useRef(null);

  useEffect(() => {
    if (dataGridRef.current) {
      // get the height of the DataGrid using the ref
      const height = dataGridRef.current.clientHeight;
      // set the height of the outer div to be the same as the DataGrid height
      document.getElementById("outer-div").style.height = `${height}px`;
    }
  }, [rows]);

  if (loading) {
    // Render the Skeleton components or any other loading indicator
    return (
      <>
        <MainCard title={"Lịch đặt"}>
          <Grid item xs={12}>
            <SubCard>
              {/* Render the Skeleton components for the search section */}
              <Skeleton animation="wave" height={40} width={200} />
            </SubCard>
          </Grid>
          <div style={{ height: "500px", width: "100%" }}>
            {/* Render the Skeleton components for the data grid */}
            <Skeleton animation="wave" height={400} />
          </div>
        </MainCard>
        <Loading loading={loading} />
      </>
    );
  }

  return (
    <>
      <MainCard title={"Lịch đặt"}>
        <Grid item xs={12}>
          <SubCard>
            <SearchSection />
          </SubCard>
        </Grid>
        <div id="outer-div">
          <DataGrid
            rows={rows}
            rowHeight={70}
            autoHeight
            columns={columns}
            getRowId={(row) => row.bookingId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            style={{ paddingTop: "12px" }}
            ref={dataGridRef}
          />
        </div>
      </MainCard>
    </>
  );
}
