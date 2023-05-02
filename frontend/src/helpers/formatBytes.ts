function formatBytes(bytes: any, decimals = 2) {
  if (!+bytes) return "0 Байты";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Байты", "KБ", "МБ", "ГБ", "ТБ"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
export default formatBytes;
