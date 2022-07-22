import grapesjs from "grapesjs";
import gjsPresetWebage from "grapesjs-preset-webpage";
import customCodePlugin from "grapesjs-custom-code";
import { API_HOST } from "../api";
import { uploadAsset } from "../redux/features/assets/assetSlice";

const geditorConfig = (assets, pageId, uploadImage, currentUser, dispatch) => {
  const editor = grapesjs.init({
    container: "#editor",
    allowScripts: 1,
    exportWrapper: true,
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
    // canvas: {
    //   scripts: ["...script1.js", "...script2.js"],
    //   styles: ["...style1.css", "...style2.css"],
    // },
    plugins: [gjsPresetWebage, customCodePlugin],
    pluginsOpts: {
      gjsPresetWebage: {},
      customCodePlugin: {},
    },
  });

  const srcs = assets.map((asset) => asset.src);
  editor.AssetManager.add(srcs);

  editor.on("run:preview", () => {
    editor.DomComponents.getWrapper().onAll(
      (comp) => comp.is("text") && comp.set({ editable: false })
    );
  });

  editor.on("stop:preview", () => {
    editor.DomComponents.getWrapper().onAll(
      (comp) => comp.is("text") && comp.set({ editable: false })
    );
  });

  const pageDocument = editor.Canvas.getDocument();
  console.log(pageDocument);

  editor.Panels.addButton("options", [
    {
      id: "save-db",
      className: "fa fa-floppy-o",
      command: "save-db",
      attributes: { title: "Save DB" },
    },
  ]);

  editor.Commands.add("save-db", {
    run: function (editor, sender) {
      sender.set("active", true);

      editor.store();
    },
  });
};

export default geditorConfig;
