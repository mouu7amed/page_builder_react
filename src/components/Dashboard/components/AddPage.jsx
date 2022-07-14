import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { createPage } from "../../../redux/features/page/pageSlice";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../../../context/AuthProvider";

export const AddPage = ({ pageState }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const { currentUser } = useAuth();
  const { pages } = pageState;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setIsValid(false);
      return;
    }

    const userPages = pages.filter((page) => page.userId === currentUser._id);
    if (userPages.find((page) => page.name === name)) {
      setIsDuplicated(true);
      return;
    }

    const pageInfo = {
      name: name,
      userId: currentUser._id,
    };

    setOpen(false);
    dispatch(createPage(pageInfo));
    setName("");
    setIsDuplicated(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create New Page
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new page, please enter the page title here. By creating
            this page you agree to our privacy and policy of pages.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Page Title"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!isValid || isDuplicated}
            helperText={
              !isValid
                ? "Please provide a valid name."
                : isDuplicated
                ? "Page already exist."
                : null
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
