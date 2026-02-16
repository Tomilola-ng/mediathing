export function compressFilename(filename: string, maxLength = 40): string {
  if (filename.length <= maxLength) return filename;
  const ext = filename.split(".").pop() || "";
  const base = filename.slice(0, filename.length - ext.length - 1);
  const keep = Math.floor((maxLength - ext.length - 5) / 2);
  const start = base.slice(0, keep);
  const end = base.slice(-keep);
  return `${start}...${end}.${ext}`;
}
