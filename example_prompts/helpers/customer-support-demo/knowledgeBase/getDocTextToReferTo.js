import formattedLog from "../../formattedLog";
import { applesDoc } from "./apples";
import { bananasDoc } from "./bananas";
import { carrotsDoc } from "./carrots";

export default function getDocTextToReferTo(text) {
  formattedLog(`%ctext:%c\n\n${text}`);
  if (!text || !text.length) return text;
  switch (text.split(" ")[0].toLowerCase()) {
    case "apples":
      return applesDoc;
    case "bananas":
      return bananasDoc;
    case "carrots":
      return carrotsDoc;
    default:
      return "";
  }
}
