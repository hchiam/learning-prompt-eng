export default function formattedLog(str, format) {
  if (format && (!format.includes(";") || !format.includes(":"))) {
    throw new Error("expecting CSS format");
  }
  // just handle the first two '%c's in both Firefox and Chrome:
  console.log(str, format || "background:yellow;color:black;", "all:reset;");
}
