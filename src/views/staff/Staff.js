import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
// import SubCard from "ui-component/cards/SubCard";
import { Avatar, Button, Grid } from "@mui/material";
import "./Staff.scss";
import Menu from "ui-component/staff/Menu";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalReducer";
import CreateModalStaff from "ui-component/modal/staff-modal/create-modal/CreateModalStaff";
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
  if (params.value === "true") {
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
  if (params.value === "false") {
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
    headerName: "Tên nhân viên",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 200,
    valueGetter: (params) => `${params.row.name || ""}`,
  },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "SĐT", width: 140 },
  {
    field: "dob",
    headerName: "Ngày sinh",
    // type: "number",
    width: 150,
  },
  { field: "gender", headerName: "Giới tính", width: 160 },
  { field: "parking", headerName: "Thuộc bãi", width: 260 },
  {
    field: "isActive",
    headerName: "Hoạt động",
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
    email: "nguyenthiquynhthi@gamil.com",
    phone: "012341234132",
    dob: "11-11-1990",
    gender: "Nam",
    parking: "Bãi xe Hoang Văn Thụ số 1",
    isActive: "true",
  },
  {
    id: 2,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    email: "nguyenthiquynhthi@gamil.com",
    phone: "012341234132",
    dob: "11-11-1990",
    gender: "Nam",
    parking: "Bãi xe Hoang Văn Thụ số 2",
    isActive: "false",
  },
  {
    id: 3,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    email: "nguyenthiquynhthi@gamil.com",
    phone: "012341234132",
    dob: "11-11-1990",
    gender: "Nam",
    parking: "Bãi xe Hoang Văn Thụ số 1",
    isActive: "true",
  },
  {
    id: 4,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    email: "nguyenthiquynhthi@gamil.com",
    phone: "012341234132",
    dob: "11-11-1990",
    gender: "Nam",
    parking: "Bãi xe Hoang Văn Thụ số 1",
    isActive: "false",
  },
  {
    id: 5,
    avatar:
      "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    name: "Nguyễn Thị Minh Khai",
    email: "nguyenthiquynhthi@gamil.com",
    phone: "012341234132",
    dob: "11-11-1990",
    gender: "Nam",
    parking: "Bãi xe Hoang Văn Thụ số 1",
    isActive: "true",
  },
];

export default function Staff() {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleOpenModalCreate = (modalType) => {
    dispatch(openModal(modalType));
  };

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <MainCard title={"Nhân viên"}>
        <Grid item xs={12}>
          <SubCardStaff
            startComponent={<SearchSection />}
            endComponent={
              <CreateButton
                onClick={() => handleOpenModalCreate("createModalStaff")}
              />
            }
          >
            {/* <SearchSection /> */}
          </SubCardStaff>
        </Grid>
        {/* <CreateButton /> */}
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

      <CreateModalStaff modalType="createModalStaff" />
    </>
  );
}
