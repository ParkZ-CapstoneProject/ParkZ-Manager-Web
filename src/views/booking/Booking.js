import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import SubCard from "ui-component/cards/SubCard";
import { Avatar, Button, Grid } from "@mui/material";
import "./Booking.scss";
import Menu from "ui-component/booking/Menu";
// import { useDispatch } from "react-redux";
// import { openModal } from "store/modalReducer";
// import { useState } from "react";
// import Loading from "ui-component/back-drop/Loading";
// import QRScan from "ui-component/buttons/qrscan-button/QRScan";

const renderAvatarCell = (params) => {
  return <Avatar src={params.value} alt="avatar" />;
};

const getCellValue = (params) => {
  return params.value ? params.value : "-------";
};

const renderCellStatus = (params) => {
  if (params.value === "Khởi tạo") {
    return (
      <Button
        disableTouchRipple
        variant="contained"
        size="small"
        color="inherit"
        sx={{
          borderRadius: "20px",
          fontSize: "12px",
          "&:hover": {},
        }}
      >
        {params.value}
      </Button>
    );
  }
  if (params.value === "Thành công") {
    return (
      <Button
        variant="contained"
        size="small"
        color="success"
        sx={{ borderRadius: "20px", fontSize: "12px", color: "#ffff" }}
      >
        {params.value}
      </Button>
    );
  }
  if (params.value === "Đã duyệt") {
    return (
      <Button
        variant="contained"
        size="small"
        color="primary"
        sx={{ borderRadius: "20px", fontSize: "12px" }}
      >
        {params.value}
      </Button>
    );
  }
  if (params.value === "Vào bãi") {
    return (
      <Button
        variant="contained"
        size="small"
        color="secondary"
        sx={{ borderRadius: "20px", fontSize: "12px" }}
      >
        {params.value}
      </Button>
    );
  }
  if (params.value === "Ra bãi") {
    return (
      <Button
        variant="contained"
        size="small"
        color="warning"
        sx={{ borderRadius: "20px", fontSize: "12px" }}
      >
        {params.value}
      </Button>
    );
  }
  if (params.value === "Chờ thanh toán") {
    return (
      <Button
        variant="contained"
        size="small"
        color="info"
        sx={{ borderRadius: "20px", fontSize: "11px", "&:hover": {} }}
      >
        {params.value}
      </Button>
    );
  }
  if (params.value === "Hủy đơn") {
    return (
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ borderRadius: "20px", fontSize: "12px" }}
      >
        {params.value}
      </Button>
    );
  }
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "avatar",
    headerName: "Ảnh",
    width: 80,
    renderCell: renderAvatarCell,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Tên khách hàng",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 170,
    valueGetter: (params) => `${params.row.name || ""}`,
  },
  { field: "position", headerName: "Vị trí", width: 100 },
  { field: "startTime", headerName: "Thời gian", width: 100 },
  {
    field: "totalPrice",
    headerName: "Giá",
    // type: "number",
    width: 100,
  },
  { field: "phone", headerName: "Số điện thoại", width: 130 },
  { field: "licensePlate", headerName: "Biển số xe", width: 110 },
  { field: "parkingName", headerName: "Bãi xe", width: 130 },
  {
    field: "checkInTime",
    headerName: "Giờ vào",
    width: 120,
    valueGetter: getCellValue,
  },
  {
    field: "checkOutTime",
    headerName: "Giờ ra",
    width: 120,
    valueGetter: getCellValue,
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

const rows = [
  {
    id: 1,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: null,
    guestPhone: null,
    status: "Khởi tạo",
  },
  {
    id: 2,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Đỗ Anh Linh",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: "Nguyễn Thị Minh Khai",
    guestPhone: null,
    status: "Thành công",
  },
  {
    id: 3,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: null,
    guestPhone: null,
    status: "Đã duyệt",
  },
  {
    id: 4,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: null,
    guestPhone: null,
    status: "Vào bãi",
  },
  {
    id: 5,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: null,
    guestPhone: null,
    status: "Chờ thanh toán",
  },
  {
    id: 6,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: null,
    guestPhone: null,
    status: "Ra bãi",
  },
  {
    id: 7,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    position: "A4",
    startTime: "7 : 00 AM",
    totalPrice: "20,000 vnđ",
    phone: "012341234132",
    licensePlate: "60A - 12345",
    parkingName: "Hoàng Văn Thụ",
    checkInTime: "7 AM",
    checkOutTime: null,
    paymentMethod: null,
    guestName: null,
    guestPhone: null,
    status: "Hủy đơn",
  },
];

export default function DataTable() {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <MainCard title={"Lịch đặt"}>
        <Grid item xs={12}>
          <SubCard>
            <SearchSection />
          </SubCard>
        </Grid>
        <div style={{ height: "500px", width: "100%" }}>
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
      </MainCard>
      {/* )} */}
      {/* <QRScan /> */}
    </>
  );
}
