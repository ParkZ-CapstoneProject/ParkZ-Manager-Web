import { Pagination } from "@mui/material";

export default function CustomDataGridPagination(props) {
  const { state, api } = props;

  if (!state?.pagination) {
    return null;
  }

  const handleChangePage = (event, value) => {
    api.current.setPage(value - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    api.current.setPageSize(+event.target.value);
  };

  return (
    <Pagination
      className="custom-pagination"
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page + 1}
      count={state.pagination.pageCount}
      rowsPerPage={state.pagination.pageSize}
      rowsPerPageOptions={[5, 10, 25]} // Specify available page size options
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
