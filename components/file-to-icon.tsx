"use client";

import {
  FileIcon,
  FileImageIcon,
  FileVideoIcon,
  FileAudioIcon,
} from "lucide-react";

export function FileToIcon({ mime }: { mime: string }) {
  if (mime.startsWith("image/")) return <FileImageIcon className="size-4" />;
  if (mime.startsWith("video/")) return <FileVideoIcon className="size-4" />;
  if (mime.startsWith("audio/")) return <FileAudioIcon className="size-4" />;
  return <FileIcon className="size-4" />;
}
