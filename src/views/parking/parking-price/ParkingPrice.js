import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
// import SubCard from "ui-component/cards/SubCard";
import { Avatar, Button, Grid } from "@mui/material";
import "./ParkingPrice.scss";
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

  const renderCellApply = (params) => {
    const parking = params.row.parking;

    if (parking === null) {
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ borderRadius: "20px", fontSize: "12px" }}
        >
          Apply
        </Button>
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
      width: 70,
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
