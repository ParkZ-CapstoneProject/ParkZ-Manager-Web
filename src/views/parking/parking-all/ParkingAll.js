import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Chip, Grid, Typography } from "@mui/material";
import Menu from "ui-component/parking/parking-all/Menu";
import Swal from "sweetalert2";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useNavigate } from "react-router";
import { ImFilesEmpty } from "react-icons/im";
import DisableModal from "ui-component/modal/disable-parking/Disable/DisableModal";

export default function MyParkingAll(props) {
  const { rows } = props;

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [parkingId, setParkingId] = useState();
  // console.log("parkingId", parkingId);

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
    return params.value ? params.value : "-----";
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
          // if (field === "isActive") {
          //   const requestOptions = {
          //     method: "DELETE",
          //     headers: {
          //       Authorization: `bearer ${token}`,
          //       "Content-Type": "application/json",
          //     },
          //   };
          //   const response = await fetch(
          //     `${apiUrl}/parkings/parking/${params.id}`,
          //     requestOptions
          //   );
          //   if (response.status === 204) {
          //     Swal.fire({
          //       icon: "success",
          //       text: "Cập nhật trạng thái thành công!",
          //     });
          //   } else {
          //     Swal.fire({
          //       icon: "error",
          //       text: "Cập nhật trạng thái thất bạij!",
          //     });
          //   }
          // }
          if (field === "isFull") {
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
    if (params.value === true) {
      return (
        <Chip
          color="success"
          label="Có"
          sx={{
            padding: "10px 20px 10px 20px",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    } else {
      return (
        <Chip
          color="primary"
          label="Không"
          sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
        />
      );
    }
  };

  const renderCellSwitch = (params) => {
    const handleChange = () => {
      handleSwitchToggle(params, "isFull");
    };

    return (
      // <Switch checked={params.value} onChange={handleChange} color="primary" />
      <label className="switch">
        <input type="checkbox" checked={params.value} onChange={handleChange} />
        <span className="slider"></span>
      </label>
    );
  };

  const renderCellSwitchAvailable = (params, parkingId) => {
    const handleChange = () => {
      setIsOpen(true);
      setParkingId(parkingId);
    };
    return (
      // <Switch checked={params.value} onChange={handleChange} color="primary" />
      <label className="switch">
        <input type="checkbox" checked={params.value} onChange={handleChange} />
        <span className="slider"></span>
      </label>
    );
  };

  const columns = [
    { field: "parkingId", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Tên bãi",
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 280,
      valueGetter: (params) => `${params.row.name || "-----"}`,
    },
    { field: "address", headerName: "Địa chỉ", width: 420 },
    {
      field: "carSpot",
      headerName: "Tổng số vị trí",
      // type: "number",
      width: 120,
      valueGetter: getCellValue,
    },
    {
      field: "isActive",
      headerName: "Hoạt động",
      width: 170,
      // valueGetter: getCellValue,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellIsActive,
    },
    {
      field: "isAvailable",
      headerName: "Bãi xe bận",
      width: 140,
      // valueGetter: getCellValue,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        renderCellSwitchAvailable(params, params.row.parkingId),
    },
    {
      field: "isFull",
      headerName: "Đã đầy",
      width: 140,
      // valueGetter: getCellValue,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellSwitch,
    },
    {
      field: "action",
      headerName: "",
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => <Menu id={params.id} />,
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

      <DisableModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        parkingId={parkingId}
      />
    </>
  );
}
