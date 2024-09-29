import React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Custom styling for header cells
const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontWeight: "bold",
}));

const ReusableTable = ({
  columns,
  data,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  columnStyles = {}, // Custom styles for specific columns
  customRender = {}, // Custom render functions for specific columns
  renderRow, // Function to render expanded content
  triggerColumn, // The column that triggers row expand/collapse
}) => {
  const [expandedRow, setExpandedRow] = useState(null); // Track expanded row

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getColumnStyles = (columnId, value) => {
    if (columnStyles[columnId]) {
      return columnStyles[columnId](value);
    }
    return {};
  };

  const renderCellContent = (columnId, value, row) => {
    if (customRender[columnId]) {
      return customRender[columnId](value, row); // Pass the row for custom rendering
    }
    return value;
  };

  // Handle expanding/collapsing rows
  const toggleRowExpansion = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId); // Toggle expansion
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#f5f5f5",
                    color: "#333",
                  }}
                >
                  {column.label.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={getColumnStyles(column.id, value)}
                          onClick={() => {
                            if (column.id === triggerColumn) {
                              toggleRowExpansion(row.id); // Attach the click handler to triggerColumn
                            }
                          }}
                          style={{
                            cursor:
                              column.id === triggerColumn
                                ? "pointer"
                                : "default", // Show pointer cursor for triggerColumn
                          }}
                        >
                          {renderCellContent(column.id, value, row)}
                          {column.id === triggerColumn &&
                            (expandedRow === row.id ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            ))}
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* Expanded row content */}
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={columns.length}
                    >
                      <Collapse
                        in={expandedRow === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        {renderRow && renderRow(row)}{" "}
                        {/* Render the expanded content */}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReusableTable;
