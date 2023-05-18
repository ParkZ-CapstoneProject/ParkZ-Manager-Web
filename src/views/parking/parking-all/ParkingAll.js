import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
// import SubCard from "ui-component/cards/SubCard";
import { Avatar, Button, Grid, Switch } from "@mui/material";
import "./ParkingAll.scss";
import Menu from "ui-component/staff/Menu";
// import CreateButton from "ui-component/buttons/create-button/CreateButton";
// import SubCardStaff from "ui-component/cards/SubCardStaff";
// import { useDispatch } from "react-redux";
// import { openModal } from "store/modalReducer";
// import CreateModalStaff from "ui-component/modal/staff-modal/create-modal/CreateModalStaff";
import SubCard from "ui-component/cards/SubCard";
import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import { openModal } from "store/modalReducer";
// import { useState } from "react";
// import Loading from "ui-component/back-drop/Loading";
// import QRScan from "ui-component/buttons/qrscan-button/QRScan";

// const renderAvatarCell = (params) => {
//   return <Avatar src={params.value} alt="avatar" />;
// };

// const renderCellStatus = (params) => {
//   if (params.value === "true") {
//     return (
//       <Button
//         variant="contained"
//         size="small"
//         color="success"
//         sx={{ borderRadius: "20px", fontSize: "12px", color: "#ffff" }}
//       >
//         {params.value}
//       </Button>
//     );
//   }
//   if (params.value === "false") {
//     return (
//       <Button
//         variant="contained"
//         size="small"
//         color="secondary"
//         sx={{ borderRadius: "20px", fontSize: "12px" }}
//       >
//         {params.value}
//       </Button>
//     );
//   }
// };

export default function MyParkingAll(props) {
  const { rows } = props;

  const getCellValue = (params) => {
    return params.value ? params.value : "-------";
  };

  const handleSwitchToggle = (params, field) => {
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn thay đổi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Thành công!", "Trạng thái cập nhật thành công.", "success");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên bãi",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 200,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    { field: "address", headerName: "Địa chỉ", width: 300 },
    { field: "description", headerName: "Chi tiết", width: 250 },
    {
      field: "motoSpot",
      headerName: "Vị trí xe máy",
      type: "number",
      width: 170,
    },
    { field: "carSpot", headerName: "Vị trí ô tô", type: "number", width: 170 },
    {
      field: "isActive",
      headerName: "Hoạt động",
      width: 120,
      valueGetter: getCellValue,
      // renderCell: renderCellStatus,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleChange = () => {
          handleSwitchToggle(params, "isActive");
        };

        return (
          <Switch
            checked={params.value}
            onChange={handleChange}
            color="primary"
          />
        );
      },
    },
    {
      field: "isFull",
      headerName: "Đã đầy",
      width: 120,
      valueGetter: getCellValue,
      // renderCell: renderCellStatus,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleChange = () => {
          handleSwitchToggle(params, "isFull");
        };

        return (
          <div onClick={handleChange}>
            <Switch checked={params.value} color="primary" />
          </div>
        );
      },
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

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <MainCard title={"Tất cả bãi"}>
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

      {/* <CreateModalStaff modalType="createModalStaff" /> */}
    </>
  );
}
