import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPages } from "../../redux/features/page/pageSlice";
import { ListPages } from "./Pages/ListPages";
import { AddPage } from "./Pages/AddPage";
import { Navbar } from "./components/NavBar";
import { useAuth } from "../../context/AuthProvider";

export const Dashboard = ({ title }) => {
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userAddress, setUserAddress] = useState([]);

  const { currentUser } = useAuth();
  const pageState = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    dispatch(fetchPages());
  }, [title, dispatch]);

  useEffect(() => {
    if (currentUser?._id) {
      setUserUid(currentUser._id);
    }
    if (currentUser?.name) {
      setUserName(currentUser.name);
    }
    if (currentUser?.email) {
      setUserEmail(currentUser.email);
    }
    if (currentUser?.avatar) {
      setAvatar(currentUser.avatar);
    }
    if (currentUser?.addresses) {
      setUserAddress(currentUser.addresses);
    }
  }, [currentUser]);

  return (
    <>
      <Box sx={{ backgroundColor: "#E4F2FD", minHeight: "100vh" }}>
        <Navbar userName={userName} avatar={avatar} />
        {location.pathname === "/dashboard" ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            p={2}
          >
            <AddPage pageState={pageState} />
            <ListPages pageState={pageState} userUid={userUid} />
          </Box>
        ) : (
          <Outlet
            context={{
              userUid,
              userName,
              userEmail,
              avatar,
              userAddress,
              pageState,
            }}
          />
        )}
      </Box>
    </>
  );
};
