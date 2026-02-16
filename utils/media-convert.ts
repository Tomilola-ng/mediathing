import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import type { Action } from "@/types/action";
import { EXT_TO_MIME, VIDEO_EXT } from "./constant";

function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

function getOutputFilename(fileName: string, toExt: string): string {
  const base = fileName.replace(/\.[^.]+$/, "");
  return `${base}.${toExt}`;
}

function isVideoExt(ext: string): boolean {
  return VIDEO_EXT.includes(ext.toLowerCase() as (typeof VIDEO_EXT)[number]);
}

function isAudioExt(ext: string): boolean {
  return ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"].includes(
    ext.toLowerCase()
  );
}

export async function convert(
  ffmpeg: FFmpeg,
  action: Action
): Promise<{ url: string; output: string }> {
  const inputExt = action.from || getExtension(action.file_name);
  const inputPath = `input.${inputExt}`;
  const outputFilename = getOutputFilename(action.file_name, action.to!);
  const outputPath = `output.${action.to}`;

  const data = await fetchFile(action.file);
  await ffmpeg.writeFile(inputPath, data);

  const fromExt = inputExt.toLowerCase();
  const toExt = action.to!.toLowerCase();
  const is3gp = fromExt === "3gp" || fromExt === "3g2";
  const isExtractAudio = isVideoExt(fromExt) && isAudioExt(toExt);

  if (isExtractAudio) {
    await ffmpeg.exec(["-i", inputPath, "-vn", "-acodec", "copy", outputPath]);
  } else if (is3gp) {
    await ffmpeg.exec([
      "-i",
      inputPath,
      "-r",
      "20",
      "-s",
      "352x288",
      "-vb",
      "400k",
      "-acodec",
      "aac",
      "-ac",
      "1",
      "-ar",
      "8000",
      outputPath,
    ]);
  } else {
    // For video conversion, try copy codec first, fallback to re-encode
    try {
      await ffmpeg.exec(["-i", inputPath, "-c", "copy", outputPath]);
    } catch {
      // If copy fails, re-encode with libx264 for video or default for others
      if (isVideoExt(fromExt) && isVideoExt(toExt)) {
        await ffmpeg.exec([
          "-i",
          inputPath,
          "-c:v",
          "libx264",
          "-c:a",
          "aac",
          outputPath,
        ]);
      } else {
        await ffmpeg.exec(["-i", inputPath, outputPath]);
      }
    }
  }

  const fileData = await ffmpeg.readFile(outputPath);
  const outputMime =
    EXT_TO_MIME[toExt] ?? action.file_type;
  // Convert FileData to proper Uint8Array<ArrayBuffer> for Blob
  // Create a new ArrayBuffer and copy the data to ensure proper type
  const uint8Array = fileData instanceof Uint8Array 
    ? new Uint8Array(Array.from(fileData))
    : new Uint8Array(0);
  const blob = new Blob([uint8Array], { type: outputMime });
  const url = URL.createObjectURL(blob);

  await ffmpeg.deleteFile(inputPath);
  await ffmpeg.deleteFile(outputPath);

  return { url, output: outputFilename };
}
