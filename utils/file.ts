import { IMAGE_EXT, VIDEO_EXT } from "./constant";

const IMAGE_SET = new Set(IMAGE_EXT.map((e) => e.toLowerCase()));
const VIDEO_SET = new Set(VIDEO_EXT.map((e) => e.toLowerCase()));

export type FileTypeResult = "image" | "video" | "audio" | "invalid";

export function isValidFileType(file: File): FileTypeResult {
  const name = file.name.toLowerCase();
  const ext = name.split(".").pop() || "";
  if (IMAGE_SET.has(ext)) return "image";
  if (VIDEO_SET.has(ext)) return "video";
  if (
    ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"].includes(ext)
  )
    return "audio";
  return "invalid";
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
