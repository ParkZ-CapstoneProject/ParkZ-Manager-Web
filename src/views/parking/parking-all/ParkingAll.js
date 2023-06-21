import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Grid, Switch, Typography } from "@mui/material";
import "./ParkingAll.scss";
import Menu from "ui-component/parking/parking-all/Menu";
import Swal from "sweetalert2";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useNavigate } from "react-router";
import { ImFilesEmpty } from "react-icons/im";

export default function MyParkingAll(props) {
  const { rows } = props;

  const navigate = useNavigate();

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
    { field: "parkingId", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên bãi",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 200,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    { field: "address", headerName: "Địa chỉ", width: 300 },
    {
      field: "carSpot",
      headerName: "Vị trí ô tô",
      type: "number",
      width: 170,
      valueGetter: getCellValue,
    },
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
            checked={Boolean(params.value)}
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
            <Switch checked={Boolean(params.value)} color="primary" />
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
      <MainCard title={"Tất cả bãi"}>
        <Grid item xs={12}>
          <SubCardStaff
            startComponent={<SearchSection />}
            endComponent={
              <CreateButton onClick={() => navigate("/new-parking")} />
            }
          ></SubCardStaff>
        </Grid>

        {rows ? (
          <div style={{ height: "500px", width: "100%" }}>
            <DataGrid
              rows={rows}
              rowHeight={70}
              getRowId={(row) => row.parkingId}
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
              sx={{ textAlign: "center", marginTop: "15%" }}
            >
              Không tìm thấy dữ liệu
            </Typography>
            <ImFilesEmpty
              style={{ fontSize: "150px", marginTop: "5%", marginLeft: "46%" }}
            />
          </>
        )}
      </MainCard>
    </>
  );
}
