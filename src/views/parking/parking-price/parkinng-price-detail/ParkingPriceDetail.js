import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Chip, Grid, Skeleton } from "@mui/material";
import Menu from "ui-component/parking/parking-price/Menu";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import { useNavigate } from "react-router";
import Loading from "ui-component/back-drop/Loading";

export default function ParkingPriceDetail(props) {
  const { rows, loading } = props;
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create-new-price");
  };

  const getCellValue = (params) => {
    return params.value ? params.value : "-------";
  };

  const columns = [
    { field: "timeLineId", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên khung",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    {
      field: "price",
      headerName: "Giá khung giờ",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: getCellValue,
    },
    {
      field: "extraFee",
      headerName: "Giá phụ phí",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: getCellValue,
    },
    {
      field: "startTime",
      headerName: "Giờ bắt đầu",
      // sortable: false,
      width: 300,
      valueGetter: getCellValue,
    },
    {
      field: "endTime",
      headerName: "Giờ kết thúc",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: getCellValue,
    },
    // {
    //   field: "action",
    //   headerName: "",
    //   width: 70,
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => <Menu id={params.row.timeLineId} />,
    // },
  ];

  return (
    <>
      {loading ? (
        <>
          <Loading loading={loading} />
        </>
      ) : (
        <MainCard title={"Chi tiết bảng giá gói cước"}>
          <Grid item xs={12}>
            <SubCardStaff
              startComponent={<SearchSection />}
              endComponent={<CreateButton onClick={handleCreate} />}
            />
          </Grid>
          <div style={{ height: "500px", width: "100%" }}>
            <DataGrid
              rows={rows}
              rowHeight={70}
              getRowId={(row) => row.timeLineId}
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
      )}
    </>
  );
}
