import { useState } from "react";
import { Box } from "@mui/material";
import grapesjs from "grapesjs";
import gjsPresetWebage from "grapesjs-preset-webpage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_HOST } from "../../api";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { pageId } = useParams();

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      storageManager: {
        type: "remote",
        stepsBeforeSave: 3,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
          "Content-Type": "application/json",
        },
        urlStore: `${API_HOST}pages/${pageId}/content`,
        urlLoad: `${API_HOST}pages/${pageId}/content`,
      },
      plugins: [gjsPresetWebage],
      pluginsOpts: {
        gjsPresetWebage: {},
      },
    });
    setEditor(editor);
  }, [pageId]);

  return (
    <Box>
      <Box id="editor"></Box>
    </Box>
  );
};
export default Editor;
