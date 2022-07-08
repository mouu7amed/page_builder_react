import {
  Divider,
  Typography,
  Stack,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionActions,
  AccordionSummary,
  Alert,
  Snackbar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fade,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import React, { forwardRef, useState } from "react";
import { updateUser } from "../../../redux/features/user/userSlice";
import { useAuth } from "../../../context/AuthProvider";
import { useDispatch } from "react-redux";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert ref={ref} elevation={2} {...props} />;
});

export const ProfileSettings = ({ avatar, userInfo }) => {
  const [photoBuffer, setPhotoBuffer] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [changePhone, setChangePhone] = useState(false);
  const [expanded, setExpanded] = useState("NamePanel");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState({
    birthday: "",
    gender: "",
    address: "",
    addressType: "home",
  });
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const handleExpandtion = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updateNameHandler = () => {
    //Name Validation
    const fullName = `${
      firstName.charAt(0).toUpperCase() + firstName.slice(1)
    } ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
    const userId = currentUser._id;

    if (!firstName && !lastName) {
      return;
    }

    if (firstName && !firstName.match(/^[a-zA-Z]+$/)) {
      setValidationError({
        ...validationError,
        firstName: "Please enter a valid first name",
        lastName: "",
      });
      setFirstName("");
      return;
    }

    if (lastName && !lastName.match(/^[a-zA-Z]+$/)) {
      setValidationError({
        ...validationError,
        firstName: "",
        lastName: "Please enter a valid last name",
      });
      setLastName("");
      return;
    }

    try {
      dispatch(updateUser({ name: fullName }, userId));
    } catch (err) {
      console.log("Error, ", err.message);
    }

    setFirstName("");
    setLastName("");
  };

  const changePhotoHandler = async () => {
    try {
      setError("");
      setLoading(true);
      // TODO
    } catch {
      console.log(error);
    }

    setPhotoBuffer(null);
    setLoading(false);
  };

  const updateInfoHandler = async () => {
    try {
      setLoading(true);
      setError("");
      setValidationError("");

      if (firstName && lastName) {
        //TODO
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  };

  const changeBioHandler = async () => {
    if (!additionalInfo.birthday) {
      return;
    }

    try {
      setValidationError("");
      setLoading(true);

      //TODO
    } catch (error) {
      console.log(error.message);
    }

    setAdditionalInfo({
      birthday: "",
    });
    setLoading(false);
  };

  return (
    <>
      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        Profile
      </Typography>
      <Divider />
      <Stack spacing={2}>
        <Accordion
          sx={{ mt: 2 }}
          elevation={0}
          expanded={expanded === "NamePanel"}
          onChange={(e, isExpanded) =>
            handleExpandtion(isExpanded, "NamePanel")
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction={{ md: "row", xs: "column-reverse" }}
              spacing={4}
              justifyContent="space-between"
            >
              <Stack spacing={2}>
                <Box>
                  <Typography fontWeight={500}>Change your name</Typography>
                  <Stack direction={"row"} spacing={2} mb={1} mt={1}>
                    <TextField
                      label="First Name"
                      disabled={loading.info}
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      error={!!validationError.firstName}
                      helperText={
                        !!validationError.firstName && validationError.firstName
                      }
                    />
                    <TextField
                      disabled={loading.info}
                      label="Last Name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      error={!!validationError.lastName}
                      helperText={
                        !!validationError.lastName && validationError.lastName
                      }
                    />
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="success"
              disableElevation
              onClick={updateNameHandler}
            >
              Update Name
            </Button>
          </AccordionActions>
        </Accordion>

        <Accordion
          sx={{ mt: 2 }}
          elevation={0}
          expanded={expanded === "AvatarPanel"}
          onChange={(e, isExpanded) =>
            handleExpandtion(isExpanded, "AvatarPanel")
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Avatar</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 1 }}>
            <Box p={1}>
              <Typography fontWeight={500} sx={{ mb: 1 }}>
                Profile Picture
              </Typography>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={avatar}
                  alt="avatar"
                  sx={{ width: 200, height: 200 }}
                />
                <Fade
                  in={loading.photo}
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "40%",
                  }}
                >
                  <CircularProgress />
                </Fade>
                <Button
                  variant="contained"
                  disableElevation
                  component="label"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    textTransform: "initial",
                  }}
                >
                  Edit
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setPhotoBuffer(e.target.files[0])}
                  />
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="success"
              disableElevation
              disabled={loading.photo}
              onClick={changePhotoHandler}
            >
              Update Avatar
            </Button>
          </AccordionActions>
        </Accordion>

        <Accordion
          elevation={0}
          expanded={expanded === "InfoPanel"}
          onChange={(e, isExpanded) =>
            handleExpandtion(isExpanded, "InfoPanel")
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>Additional Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontWeight={500} sx={{ mb: 1 }}>
              Birthday
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birthday"
                value={additionalInfo.birthday}
                onChange={(newValue) => {
                  setAdditionalInfo({
                    ...additionalInfo,
                    birthday: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: { sm: 458 } }}
                    disabled={loading.birthday}
                    error={!!validationError.birthday}
                    helperText={
                      !!validationError.birthday && validationError.birthday
                    }
                  />
                )}
              />
            </LocalizationProvider>
            <Typography fontWeight={500} sx={{ mb: 1, mt: 2 }}>
              Address
            </Typography>
            <Stack
              direction={"row"}
              spacing={2}
              mb={1}
              mt={1}
              sx={{ width: { sm: 458 } }}
            >
              <TextField
                fullWidth
                label="Address"
                type="text"
                value={additionalInfo.address}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    address: e.target.value,
                  })
                }
                error={!!validationError.address}
                helperText={
                  !!validationError.address && validationError.address
                }
              />

              <Select
                fullWidth
                required
                value={additionalInfo.addressType}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    addressType: e.target.value,
                  })
                }
              >
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="work">Work</MenuItem>
              </Select>
            </Stack>

            <Typography fontWeight={500} sx={{ mb: 1, mt: 2 }}>
              Gender
            </Typography>
            <RadioGroup
              defaultValue="male"
              row
              value={additionalInfo.gender}
              onChange={(e) =>
                setAdditionalInfo({
                  ...additionalInfo,
                  gender: e.target.value,
                })
              }
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="success"
              disableElevation
              onClick={changeBioHandler}
            >
              Save
            </Button>
          </AccordionActions>
        </Accordion>

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
            {!error
              ? "Settings changed successfully!"
              : "Error changing settings!"}
          </SnackbarAlert>
        </Snackbar>
      </Stack>
    </>
  );
};
