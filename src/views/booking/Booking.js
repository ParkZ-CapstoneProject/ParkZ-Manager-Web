import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
// import { Grid } from "@mui/material";
import SearchSection from "ui-component/search-section";
import SubCard from "ui-component/cards/SubCard";
import { Grid } from "@mui/material";
import { gridSpacing } from "store/constant";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <MainCard title={"Lịch đặt"}>
      <Grid item xs={12} spacing={gridSpacing}>
        <SubCard>
          <SearchSection />
        </SubCard>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          style={{ borderRadius: "8px", marginTop: "10px" }}
        />
      </div>
    </MainCard>
  );
}
