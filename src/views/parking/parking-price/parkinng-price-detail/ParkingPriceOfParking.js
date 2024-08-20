import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { useParams } from "react-router";
import Loading from "ui-component/back-drop/Loading";
import MainCard from "ui-component/cards/MainCard";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import ApplyParking from "ui-component/modal/parking-price-apply/ApplyParking";
import Menu from "ui-component/parking-apply/Menu";
import SearchSection from "ui-component/search-section";

const ParkingPriceOfParking = () => {
  const { priceId } = useParams();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  const columns = [
    { field: "parkingId", headerName: "ID", width: 150 },
    { field: "parkingName", headerName: "Tên bãi xe", width: 700 },
    {
      field: "action",
      headerName: "",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => <Menu id={params.id} />,
    },
  ];

  const token = localStorage.getItem("token");
  const apiUrl = "https://parkzapi.azurewebsites.net/api";
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
      `${apiUrl}/parkings/parking-price/${priceId}`,
      requestOptions
    );

    const data = await response.json();
    setRows(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setIsDetail(true);
    setIsOpen(true);
  };

  const ApplyButton = () => {
    return (
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
      >
        Áp dụng
      </button>
    );
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      {loading ? (
        <>
          <Loading loading={loading} />
        </>
      ) : (
        <MainCard title={"Gói cước áp dụng cho bãi xe"}>
          <Grid item xs={12}>
            <SubCardStaff
              startComponent={<SearchSection />}
              endComponent={<ApplyButton onClick={handleCreate} />}
            />
          </Grid>
          {rows ? (
            <div style={{ height: "300px", width: "100%" }}>
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
              />
            </>
          )}
        </MainCard>
      )}

      <ApplyParking
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        priceId={priceId}
        isDetail={isDetail}
      />
    </>
  );
};

export default ParkingPriceOfParking;
