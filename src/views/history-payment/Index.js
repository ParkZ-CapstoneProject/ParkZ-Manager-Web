import React, { useRef, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import { Chip, Skeleton, Typography } from "@mui/material";
import Loading from "ui-component/back-drop/Loading";
import { ImFilesEmpty } from "react-icons/im";
import * as signalR from "@microsoft/signalr";

const getCellValue = (params) => {
  return params.value ? params.value : "-------";
};

const renderCellStatus = (params) => {
  if (params.value === "Nap_tien_vao_vi_thanh_cong") {
    return (
      <Chip
        color="primary"
        label="Nạp tiền vào ví"
        sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
      />
    );
  }
  if (params.value === "Da_thanh_toan") {
    return (
      <Chip
        color="success"
        label="Đã thanh toán"
        sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
      />
    );
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

const formatPrice = (number) => {
  const formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formattedNumber;
};

const columns = [
  { field: "transactionId", headerName: "ID", width: 70 },
  {
    field: "price",
    headerName: "Số tiền giao dịch",
    width: 200,
    renderCell: (params) => {
      if (params.row.price) {
        if (
          params.row.description === "Hoàn tiền cho khách hàng" ||
          params.row.description === "Hệ thống trừ tiền sử dụng dịch vụ"
        ) {
          return "-" + formatPrice(params.row.price);
        } else {
          return "+" + formatPrice(params.row.price);
        }
      } else {
        return "-----";
      }
    },
  },
  {
    field: "paymentMethod",
    headerName: "Phương thức thanh toán",
    width: 350,
    renderCell: (params) =>
      params.row.paymentMethod === "thanh_toan_online"
        ? "Thanh toán online"
        : "Thanh toán tiền mặt",
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 350,
    valueGetter: getCellValue,
  },
  {
    field: "createdDate",
    headerName: "Ngày tạo",
    width: 250,
    valueGetter: (params) =>
      params.row.createdDate ? formatDate(params.row.createdDate) : "----",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 220,
    valueGetter: getCellValue,
    renderCell: renderCellStatus,
    sortable: false,
    disableColumnMenu: true,
  },
];

export default function HistoryPayment() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

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
  const signalRUrl = "https://parkzserver-001-site1.btempurl.com/parkz";
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${signalRUrl}`)
      .build();
    console.log("connection", connection);

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadHistoryInManager", () => {
      fetchData();
    });

    fetchData();

    return () => {
      connection.stop();
    };
  }, []);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/customer/transactions/${userData._id}`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    setLoading(false);
  };
  //   console.log("rows", rows);

  if (loading) {
    // Render the Skeleton components or any other loading indicator
    return (
      <>
        <MainCard title={"Lịch sử giao dịch"}>
          <div style={{ height: "300px", width: "100%" }}>
            {/* Render the Skeleton components for the data grid */}
            <Skeleton animation="wave" height={300} />
          </div>
        </MainCard>
        <Loading loading={loading} />
      </>
    );
  }

  return (
    <>
      <MainCard title={"Lịch sử giao dịch"}>
        {rows.length !== 0 ? (
          <div id="outer-div">
            <DataGrid
              rows={rows}
              rowHeight={70}
              autoHeight
              getRowId={(row) => row.transactionId}
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
              Không có dữ liệu
            </Typography>
            <ImFilesEmpty
              style={{
                fontSize: "150px",
                marginTop: "5%",
                marginLeft: "46%",
                padding: "5px",
              }}
            />
          </>
        )}
      </MainCard>
    </>
  );
}
