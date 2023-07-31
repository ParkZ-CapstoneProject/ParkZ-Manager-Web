import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Grid, Switch, Typography } from "@mui/material";
import Menu from "ui-component/parking/parking-all/Menu";
import Swal from "sweetalert2";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useNavigate } from "react-router";
import { ImFilesEmpty } from "react-icons/im";
import { useRef } from "react";
import { useEffect } from "react";

export default function MyParkingAll(props) {
  const { rows } = props;

  const navigate = useNavigate();

  const dataGridRef = useRef(null);

  useEffect(() => {
    if (dataGridRef.current) {
      // get the height of the DataGrid using the ref
      const height = dataGridRef.current.clientHeight;
      // set the height of the outer div to be the same as the DataGrid height
      document.getElementById("outer-div").style.height = `${height}px`;
    }
  }, [rows]);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

  const getCellValue = (params) => {
    return params.value == null ? false : params.value;
  };

  const handleSwitchToggle = async (params, field) => {
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn thay đổi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (field === "isActive") {
            const requestOptions = {
              method: "DELETE",
              headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
              },
            };
            const response = await fetch(
              `${apiUrl}/parkings/parking/${params.id}`,
              requestOptions
            );
            if (response.status === 204) {
              Swal.fire({
                icon: "success",
                text: "Cập nhật trạng thái thành công!",
              });
            } else {
              Swal.fire({
                icon: "error",
                text: "Cập nhật trạng thái thất bạij!",
              });
            }
          } else {
            const requestOptions = {
              method: "PUT",
              headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
              },
            };
            const response = await fetch(
              `${apiUrl}/parkings/parking/full/${params.id}`,
              requestOptions
            );
            console.log("response", response.status);
            if (response.status === 204) {
              Swal.fire({
                icon: "success",
                text: "Cập nhật trạng thái thành công!",
              });
            } else {
              Swal.fire({
                icon: "error",
                text: "Cập nhật trạng thái thất bạij!",
              });
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  const renderCellIsActive = (params) => {
    const handleChange = () => {
      handleSwitchToggle(params, "isActive");
    };

    return (
      <Switch checked={params.value} onChange={handleChange} color="primary" />
    );
  };

  const renderCellIsFull = (params) => {
    const handleChange = () => {
      handleSwitchToggle(params, "isFull");
    };

    return (
      <Switch checked={params.value} onChange={handleChange} color="primary" />
    );
  };

  const columns = [
    { field: "parkingId", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Tên bãi",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    { field: "address", headerName: "Địa chỉ", width: 450 },
    {
      field: "carSpot",
      headerName: "Vị trí ô tô",
      // type: "number",
      width: 180,
      valueGetter: getCellValue,
    },
    {
      field: "isActive",
      headerName: "Hoạt động",
      width: 170,
      valueGetter: getCellValue,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellIsActive,
    },
    {
      field: "isFull",
      headerName: "Đã đầy",
      width: 170,
      valueGetter: getCellValue,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellIsFull,
    },
    {
      field: "action",
      headerName: "",
      width: 90,
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
          <div id="outer-div">
            <DataGrid
              rows={rows}
              rowHeight={70}
              autoHeight
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
              ref={dataGridRef}
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
