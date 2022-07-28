import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages } from "../../redux/features/page/pageSlice";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import parse, { domToReact } from "html-react-parser";

export const ViewPage = ({ title }) => {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.page);
  const { pages } = pageState;
  const { pageId } = useParams();
  const currentPage = pages.filter((page) => page._id === pageId);
  const style = currentPage.map((page) => page.view.css.style);

  useEffect(() => {
    document.title = title;
    dispatch(fetchPages());
  }, [title, dispatch]);

  return (
    <>
      {currentPage.map((page) => (
        <Fragment key={page._id}>
          <style>{style}</style>
          <Box>
            {parse(page.view.html.body, {
              replace: (domNode) => {
                const bodyTag = domNode.tagName === "body";
                if (bodyTag) {
                  return <Box>{domToReact(domNode.children)}</Box>;
                }
              },
            })}
          </Box>
        </Fragment>
      ))}
    </>
  );
};
