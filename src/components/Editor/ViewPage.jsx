import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages } from "../../redux/features/page/pageSlice";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

export const ViewPage = ({ title }) => {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.page);
  const { pages } = pageState;
  const { pageId } = useParams();
  const currentPage = pages.filter((page) => page._id === pageId);
  console.log(currentPage.map((page) => page.view.doc));

  useEffect(() => {
    document.title = title;
    dispatch(fetchPages());
  }, [title, dispatch]);

  return (
    <>
      {/* {currentPage.map((page) => (
        <Box key={page._id}>{page.view.doc}</Box>
      ))} */}
    </>
  );
};
