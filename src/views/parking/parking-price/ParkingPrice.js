import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
// import SubCard from "ui-component/cards/SubCard";
import { Avatar, Button, Chip, Grid } from "@mui/material";
// import "./ParkingPrice.scss";
import Menu from "ui-component/parking/parking-price/Menu";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalReducer";
// import CreateModalStaff from "ui-component/modal/staff-modal/create-modal/CreateModalStaff";
// import { useDispatch } from "react-redux";
// import { openModal } from "store/modalReducer";
// import { useState } from "react";
// import Loading from "ui-component/back-drop/Loading";
// import QRScan from "ui-component/buttons/qrscan-button/QRScan";

export default function MyParkingPrice(props) {
  const { rows } = props;
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleOpenModalCreate = (modalType) => {
    dispatch(openModal(modalType));
  };

  const getCellValue = (params) => {
    return params.value ? params.value : "-------";
  };

  const renderCellStatus = (params) => {
    if (params.value === "true") {
      return (
        <Chip
          color="success"
          label={params.value}
          sx={{ padding: "10px", color: "#fff" }}
        />
      );
    }
    if (params.value === "false") {
      return (
        <Chip
          color="secondary"
          label={params.value}
          sx={{ padding: "10px", color: "#fff" }}
        />
      );
    }
  };

  const renderCellApply = (params) => {
    const parking = params.row.parking;

    if (parking === null) {
      return (
        <button class="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
          Áp dụng
        </button>
      );
    } else {
      return null; // Return null if parking field is null
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên gói",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    {
      field: "parking",
      headerName: "Bãi xe",
      width: 350,
      valueGetter: getCellValue,
    },
    {
      field: "isActive",
      headerName: "Hoạt động",
      width: 120,
      renderCell: renderCellStatus,
      valueGetter: getCellValue,
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
    {
      field: "apply",
      headerName: "",
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellApply,
    },
  ];

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <MainCard title={"Bảng giá gói cước"}>
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
    </>
  );
}
