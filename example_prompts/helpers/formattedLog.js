export default function formattedLog(str, format) {
  if (format && (!format.includes(';')||!format.includes(':'))) {
    throw new Error('expecting CSS format');
  }
  console.log(str, format || 'background:yellow;color:black;');
}