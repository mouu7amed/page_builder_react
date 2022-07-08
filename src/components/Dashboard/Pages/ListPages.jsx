import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Link, Box, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const ListPages = ({ pageState, userUid }) => {
  const { pages } = pageState;
  const userPages = pages.filter((page) => page.userId === userUid);

  return (
    <>
      <Typography variant="h3" fontSize={18} mb={1}>
        Pages
      </Typography>

      <TableContainer
        component={Box}
        sx={{ backgroundColor: "white", borderRadius: "0.5rem", width: 700 }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Slug</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPages.map((page) => (
              <TableRow
                key={page._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {page._id}
                </StyledTableCell>
                <StyledTableCell>{page.name}</StyledTableCell>
                <StyledTableCell>{page.slug}</StyledTableCell>
                <StyledTableCell>
                  <Link href={`/editor/${page._id}`}>Edit</Link>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
