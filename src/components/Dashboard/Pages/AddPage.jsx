import React, { useState } from "react";
import { Typography } from "@mui/material";
import { createPage } from "../../../redux/features/page/pageSlice";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useAuth } from "../../../context/AuthProvider";

export const AddPage = ({ pageState }) => {
  const [name, setName] = useState("");
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

    dispatch(createPage(pageInfo));
    setName("");
    setIsDuplicated(false);
  };

  return (
    <>
      <Typography variant="h3" fontSize={18} mb={1}>
        Create Page
      </Typography>

      <Box
        component="form"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        mb={2}
        borderRadius={2}
        sx={{ backgroundColor: "#fff", width: 700 }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          type="text"
          placeholder="Page Name"
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

        <Stack direction="row" spacing={2} ml={2}>
          <Button variant="contained" disableElevation type="submit">
            Save
          </Button>
          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={() => setName("")}
          >
            Clear
          </Button>
        </Stack>
      </Box>
    </>
  );
};
