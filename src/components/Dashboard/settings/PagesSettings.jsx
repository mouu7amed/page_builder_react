import React, { forwardRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Link,
  Box,
  Paper,
  Stack,
  Button,
  Typography,
  Alert,
  Snackbar,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePage } from "../../../redux/features/page/pageSlice";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PagesSettings = ({ userUid, pageState }) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const [pageToDelete, setPageToDelete] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { pages } = pageState;
  const userPages = pages.filter((page) => page.userId === userUid);
  const dispatch = useDispatch();

  const HandlePageDeletion = () => {
    if (!pageToDelete) {
      return;
    }

    try {
      dispatch(deletePage(pageToDelete));
      setShowDeleteDialog(false);
      setSnackBarOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch {
      setError("Error Deleting your page!");
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          width: { xs: 400, md: 700 },
          mt: { xs: 2, md: 0 },
        }}
      >
        <Table
          sx={{ minWidth: { xs: 400, md: 700 } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Date Created
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Last Modified
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPages.map((page) => (
              <TableRow
                key={page._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Box>
                    <Typography sx={{ display: "inline-block" }}>
                      {page.name}
                    </Typography>{" "}
                    ({page.slug})
                  </Box>
                  <Stack direction={"row"} spacing={1} alignItems="center">
                    <Link href={`/editor/${page._id}`} underline="none">
                      Edit
                    </Link>
                    <Button
                      variant="text"
                      color="error"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        setShowDeleteDialog(true);
                        setPageToDelete(page._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Link href={``} underline="none">
                      View
                    </Link>
                  </Stack>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {moment
                    .utc(page.createdAt, "YYYY-MM-DDTHH:mm:ssZ")
                    .format("YYYY-MM-DD")}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {moment
                    .utc(page.updatedAt, "YYYY-MM-DDTHH:mm:ssZ")
                    .format("YYYY-MM-DD")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure to Delete the page?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            By Deleting this page you won't be able to restore it again and all
            page data will be lost, proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Keep the page
          </Button>
          <Button onClick={HandlePageDeletion}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          severity={!error ? "info" : "error"}
          onClose={(e, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackBarOpen(false);
          }}
        >
          {!error ? "Page deleted successfully!" : error}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};
