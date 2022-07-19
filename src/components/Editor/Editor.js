import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_HOST } from "../../api";
import { useAuth } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import grapesjs from "grapesjs";
import gjsPresetWebage from "grapesjs-preset-webpage";
import {
  fetchAssets,
  uploadAsset,
} from "../../redux/features/assets/assetSlice";

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
    const editor = grapesjs.init({
      container: "#editor",
      storageManager: {
        type: "remote",
        autosave: true,
        stepsBeforeSave: 1,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
          "Content-Type": "application/json",
        },
        options: {
          remote: {
            urlStore: `${API_HOST}pages/${pageId}/content`,
            urlLoad: `${API_HOST}pages/${pageId}/content`,
          },
        },
      },
      assetManager: {
        storageType: "",
        storeOnChange: true,
        storeAfterUpload: true,
        assets: [],
        autoAdd: true,
        upload: false,
        uploadFile: async function (e) {
          var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
          await uploadImage(files[0]).then((url) => {
            const assetInfo = {
              type: files[0].type,
              src: url,
              userId: currentUser._id,
            };
            dispatch(uploadAsset(assetInfo));
          });
        },
      },
      plugins: [gjsPresetWebage],
      pluginsOpts: {
        gjsPresetWebage: {},
      },
    });

    const srcs = assets.map((asset) => asset.src);
    editor.AssetManager.add(srcs);
  }, [assets, pageId, uploadImage, currentUser, dispatch]);

  return (
    <Box>
      <Box id="editor"></Box>
    </Box>
  );
};
export default Editor;
