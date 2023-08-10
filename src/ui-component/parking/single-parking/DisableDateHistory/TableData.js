import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Grid, Typography } from "@mui/material";
import Loading from "ui-component/back-drop/Loading";
import { ImFilesEmpty } from "react-icons/im";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import EnableModal from "ui-component/modal/disable-parking/Enable/EnableModal";

export default function TableData(props) {
  const { id } = useParams();
  const { rows, loading } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [disableDate, setDisableDate] = useState("");
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
    return params.value ? params.value : "-------";
  };

  const renderCellStatus = (params) => {
    if (params.value === "Scheduled") {
      return (
        <Chip
          color="success"
          label="Đang chờ"
          sx={{ padding: "0 5px", color: "#fff", fontWeight: "bold" }}
        />
      );
    }
    if (params.value === "Succeeded") {
      return (
        <Chip
          color="secondary"
          label="Hoàn thành"
          sx={{ padding: "5px", color: "#fff", fontWeight: "bold" }}
        />
      );
    }
  };

  const handleApply = (disableDate) => {
    setIsOpen(true);
    setDisableDate(disableDate);
  };

  const renderCellApply = (params) => {
    if (params.row.state === "Scheduled") {
      return (
        <button
          onClick={() => handleApply(params.row.disableDate)}
          className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          Hoạt động lại
        </button>
      );
    }
    return null;
  };

  const columns = [
    {
      field: "disableDate",
      headerName: "Ngày ngưng hoạt động",
      //   description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 500,
      valueGetter: (params) => `${params.row.disableDate || ""}`,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      //   description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 500,
      valueGetter: (params) => `${params.row.createdAt || ""}`,
    },
    {
      field: "state",
      headerName: "Trạng thái",
      width: 220,
      renderCell: renderCellStatus,
      valueGetter: getCellValue,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "apply",
      headerName: "",
      width: 150,
      sortable: false,
      align: "center",
      disableColumnMenu: true,
      renderCell: renderCellApply,
    },
  ];

  return (
    <>
      {loading ? (
        <>
          <Loading loading={loading} />
        </>
      ) : (
        <>
          {rows ? (
            <div id="outer-div">
              <DataGrid
                rows={rows}
                rowHeight={70}
                autoHeight
                getRowId={(row) => row.disableDate}
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
                sx={{ textAlign: "center", marginTop: "5%" }}
              >
                Không tìm thấy dữ liệu
              </Typography>
              <ImFilesEmpty
                style={{
                  fontSize: "150px",
                  marginTop: "5%",
                  marginLeft: "46%",
                }}
              />{" "}
            </>
          )}
        </>
      )}

      <EnableModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={id}
        disableDate={disableDate}
      />
    </>
  );
}
