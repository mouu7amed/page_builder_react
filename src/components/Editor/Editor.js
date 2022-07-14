import "grapesjs-preset-webpage";
import { GrapesjsReact } from "grapesjs-react";

const Editor = () => {
  return (
    <GrapesjsReact
      id="grapesjs-react"
      plugins={["gjs-preset-webpage", "gjs-blocks-basic"]}
    />
  );
};
export default Editor;
