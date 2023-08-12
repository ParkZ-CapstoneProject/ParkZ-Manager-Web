import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Grid, Typography } from "@mui/material";
import { ImFilesEmpty } from "react-icons/im";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useState } from "react";
import Create from "ui-component/modal/vnpay/create-modal/Create";
import Menu from "ui-component/vnpay/Menu";
import { useRef } from "react";
import { useEffect } from "react";

export default function MyVNPay(props) {
  const { rows } = props;
  console.log("rows", rows);

  const [open, setOpen] = useState(false);

  const dataGridRef = useRef(null);

  useEffect(() => {
    if (dataGridRef.current) {
      // get the height of the DataGrid using the ref
      const height = dataGridRef.current.clientHeight;
      // set the height of the outer div to be the same as the DataGrid height
      document.getElementById("outer-div").style.height = `${height}px`;
    }
  }, [rows]);

  const getCellValue = (params) => {
    return params.value == null ? false : params.value;
  };

  const columns = [
    { field: "vnPayId", headerName: "ID", width: 110 },
    {
      field: "userName",
      headerName: "Tên sử dụng",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: (params) => `${params.row.userName || ""}`,
    },
    { field: "userId", headerName: "Mã người dùng", width: 200 },
    {
      field: "tmnCode",
      headerName: "Mã code",
      width: 300,
      valueGetter: getCellValue,
    },
    {
      field: "hashSecret",
      headerName: "Mã hash",
      width: 400,
      valueGetter: getCellValue,
    },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => <Menu vnPayId={params.id} />,
    },
  ];

  const handleCreate = () => {
    setOpen(true);
  };

  return (
    <>
      <MainCard title={"Thông tin liên kết"}>
        <Grid item xs={12}>
          <SubCardStaff
            startComponent={<SearchSection />}
            endComponent={<CreateButton onClick={handleCreate} />}
          ></SubCardStaff>
        </Grid>

        {rows.length !== 0 ? (
          <div id="outer-div">
            <DataGrid
              rows={[rows]}
              autoHeight
              columns={columns}
              getRowId={(row) => row.vnPayId}
              loading={false} // Set loading to false when data is available
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

      <Create open={open} setOpen={setOpen} />
    </>
  );
}
