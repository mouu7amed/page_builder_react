import { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";

const Editor = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [gjsPresetWebpage],
    });
    setEditor(editor);
  }, []);

  return (
    <div className="editor">
      <div id="editor"></div>
    </div>
  );
};

export default Editor;
