import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssets } from "../../redux/features/assets/assetSlice";
import geditorConfig from "../../utils/geditorConfig";

const Editor = () => {
  const { pageId } = useParams();
  const assetsState = useSelector((state) => state.assets);
  const { assets } = assetsState;
  const dispatch = useDispatch();
  const { currentUser, uploadImage } = useAuth();

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  useEffect(() => {
    const editor = geditorConfig(
      assets,
      pageId,
      uploadImage,
      currentUser,
      dispatch
    );
  }, [assets, pageId, uploadImage, currentUser, dispatch]);

  return (
    <Box>
      <Box id="editor"></Box>
    </Box>
  );
};
export default Editor;
