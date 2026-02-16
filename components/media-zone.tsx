"use client";

import * as React from "react";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { loadFfmpeg } from "@/utils/load-ffmpeg";
import { convert } from "@/utils/media-convert";
import {
  AUDIO_EXT,
  IMAGE_EXT,
  VIDEO_EXT,
} from "@/utils/constant";
import { formatFileSize } from "@/utils/file";
import { compressFilename } from "@/utils/compress-filenames";
import { FileToIcon } from "@/components/file-to-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Action } from "@/types/action";
import { UploadIcon, DownloadIcon, TrashIcon, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToolType =
  | "extract-audio"
  | "convert-video"
  | "convert-audio"
  | "convert-image";

const IMAGE_EXT_ARR = [...IMAGE_EXT];
const VIDEO_EXT_ARR = [...VIDEO_EXT];
const AUDIO_EXT_ARR = [...AUDIO_EXT];

function getOutputFormats(
  tool: ToolType,
  fromExt: string
): { ext: string; label: string }[] {
  const ext = fromExt.toLowerCase();
  switch (tool) {
    case "extract-audio":
      return AUDIO_EXT_ARR.map((e) => ({ ext: e, label: e.toUpperCase() }));
    case "convert-video":
      return VIDEO_EXT_ARR.map((e) => ({
        ext: e,
        label: e.toUpperCase(),
      }));
    case "convert-audio":
      return AUDIO_EXT_ARR.filter((e) => e !== ext).map((e) => ({
        ext: e,
        label: e.toUpperCase(),
      }));
    case "convert-image":
      return IMAGE_EXT_ARR.filter((e) => e !== ext).map((e) => ({
        ext: e,
        label: e.toUpperCase(),
      }));
    default:
      return [];
  }
}

function fileToAction(file: File): Action {
  const name = file.name;
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const fileType =
    file.type ||
    (ext === "mp4" ? "video/mp4" : ext === "mp3" ? "audio/mpeg" : "application/octet-stream");
  return {
    file,
    file_name: name,
    file_size: file.size,
    from: ext,
    to: null,
    file_type: fileType,
    is_converting: false,
    is_converted: false,
    is_error: false,
    url: null,
    output: null,
  };
}

export function MediaZone({ tool }: { tool: ToolType }) {
  const ffmpegRef = React.useRef<FFmpeg | null>(null);
  const actionsRef = React.useRef<Action[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [actions, setActions] = React.useState<Action[]>([]);

  // Keep ref in sync with state
  React.useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  React.useEffect(() => {
    loadFfmpeg().then((ff) => {
      ffmpegRef.current = ff;
      setIsLoaded(true);
    });
  }, []);

  const acceptStr = React.useMemo(() => {
    if (tool === "convert-image") return "image/*";
    if (tool === "convert-audio") return "audio/*";
    return "video/*";
  }, [tool]);

  const onDrop = React.useCallback(
    (files: File[]) => {
      const valid = files.filter((f) => {
        const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
        switch (tool) {
          case "extract-audio":
          case "convert-video":
            return VIDEO_EXT_ARR.includes(ext as (typeof VIDEO_EXT_ARR)[number]);
          case "convert-audio":
            return AUDIO_EXT_ARR.includes(ext as (typeof AUDIO_EXT_ARR)[number]);
          case "convert-image":
            return IMAGE_EXT_ARR.includes(ext as (typeof IMAGE_EXT_ARR)[number]);
          default:
            return false;
        }
      });
      const newActions = valid.map(fileToAction);
      setActions((prev) => [...prev, ...newActions]);
    },
    [tool]
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onDrop(files);
    },
    [onDrop]
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length) onDrop(files);
      e.target.value = "";
    },
    [onDrop]
  );

  const updateAction = React.useCallback((fileName: string, to: string) => {
    setActions((prev) =>
      prev.map((a) =>
        a.file_name === fileName ? { ...a, to } : a
      )
    );
  }, []);

  const deleteAction = React.useCallback((fileName: string) => {
    setActions((prev) => prev.filter((a) => a.file_name !== fileName));
  }, []);

  const isReady = actions.length > 0 && actions.every((a) => a.to !== null);
  const isConverting = actions.some((a) => a.is_converting);
  const isDone =
    actions.length > 0 &&
    !isConverting &&
    actions.every((a) => a.is_converted || a.is_error);

  const handleConvert = React.useCallback(async () => {
    const ff = ffmpegRef.current;
    if (!ff || isConverting) return;

    // Mark all pending actions as converting
    setActions((prev) =>
      prev.map((a) =>
        a.to && !a.is_converted && !a.is_error
          ? { ...a, is_converting: true }
          : a
      )
    );

    // Process each file sequentially using ref for fresh state
    const pending = actionsRef.current.filter(
      (a) => a.to && !a.is_converted && !a.is_error
    );

    for (const action of pending) {
      try {
        const { url, output } = await convert(ff, action);
        setActions((prev) =>
          prev.map((a) =>
            a.file_name === action.file_name
              ? { ...a, is_converting: false, is_converted: true, url, output }
              : a
          )
        );
      } catch (error) {
        console.error("Conversion error:", error);
        setActions((prev) =>
          prev.map((a) =>
            a.file_name === action.file_name
              ? { ...a, is_converting: false, is_error: true }
              : a
          )
        );
      }
    }
  }, [isConverting]);

  const handleDownload = React.useCallback((action: Action) => {
    if (!action.url || !action.output) return;
    const a = document.createElement("a");
    a.href = action.url;
    a.download = action.output;
    a.click();
  }, []);

  const handleDownloadAll = React.useCallback(() => {
    actions
      .filter((a) => a.is_converted && a.url && a.output)
      .forEach((a) => handleDownload(a));
  }, [actions, handleDownload]);

  const handleConvertMore = React.useCallback(() => {
    setActions([]);
  }, []);

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-3">
            <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading FFmpeg...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <label
          htmlFor="media-dropzone-input"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={cn(
            "border-border flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed p-6 transition-colors hover:bg-muted/30"
          )}
        >
          <input
            id="media-dropzone-input"
            type="file"
            accept={acceptStr}
            multiple
            onChange={handleFileChange}
            className="hidden"
            disabled={!isLoaded}
          />
          <UploadIcon className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag and drop files, or click to select
          </p>
        </label>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.length > 0 && (
          <ul className="space-y-3">
            {actions.map((action) => (
              <li
                key={action.file_name}
                className="border-border flex flex-wrap items-center gap-3 rounded border p-3"
              >
                <FileToIcon mime={action.file_type} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {compressFilename(action.file_name)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(action.file_size)}
                  </p>
                </div>
                {action.to === null && (() => {
                  const formats = getOutputFormats(tool, action.from);
                  if (formats.length === 0) return null;
                  return (
                    <Select
                      value=""
                      onValueChange={(v) => updateAction(action.file_name, v)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((f) => (
                          <SelectItem key={f.ext} value={f.ext}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                })()}
                {action.to !== null && !action.is_converted && !action.is_error && (
                  <span className="text-xs text-muted-foreground">
                    → {action.to?.toUpperCase()}
                  </span>
                )}
                {action.is_converting && (
                  <LoaderIcon className="size-4 animate-spin" />
                )}
                {action.is_converted && action.url && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(action)}
                  >
                    <DownloadIcon className="size-4" />
                    Download
                  </Button>
                )}
                {action.is_error && (
                  <span className="text-xs text-destructive">Error</span>
                )}
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => deleteAction(action.file_name)}
                  aria-label="Remove file"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}

        {actions.length > 0 && !isDone && (
          <Button
            onClick={handleConvert}
            disabled={!isReady || isConverting}
            className="w-full"
          >
            {isConverting ? (
              <>
                <LoaderIcon className="size-4 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert Now"
            )}
          </Button>
        )}

        {isDone && (
          <div className="flex gap-2">
            <Button onClick={handleDownloadAll} className="flex-1">
              <DownloadIcon className="size-4" />
              Download All
            </Button>
            <Button variant="outline" onClick={handleConvertMore}>
              Convert More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
