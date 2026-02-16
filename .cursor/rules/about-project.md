# MediaThing — Project Overview

## What It Is

**MediaThing** is a simple, open-source media conversion tool built on FFmpeg. It lets non-programmers handle common media tasks in the browser—no command line, no installs, no ads.

**Tagline:** *Open-source FFmpeg for everyone.*

## Principles

- **Web-only** — Runs in the browser; accessible from any device.
- **No ads** — No tracking or advertisements.
- **Open source** — Code is free to use, modify, and contribute to.
- **Non-programmer friendly** — No terminal or config files required.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/Base UI
- **Conversion engine:** FFmpeg (via WebAssembly or server-side, TBD)
- **Deployment:** Static or serverless (e.g. Vercel)

## Website Structure

```
/                     → Home page (hero, feature grid, CTA)
/extract-audio        → Extract audio from video
/convert-video        → Convert video format (e.g. MP4 ↔ WebM ↔ MKV)
/convert-audio        → Convert audio format (e.g. MP3 ↔ WAV ↔ FLAC)
/convert-image        → Convert image format (e.g. PNG ↔ JPG ↔ WebP)
/compress-video       → Compress video (reduce file size)
/compress-image       → Compress/resize images
/trim-video           → Trim/cut video (set start & end)
/trim-audio           → Trim/cut audio
/merge-videos         → Merge multiple videos
/merge-audio          → Merge multiple audio files
/extract-frames       → Extract frames/screenshots from video
/resize-video         → Change video resolution
/resize-image         → Resize image dimensions
/gif-tools            → GIF ↔ video conversion
/batch                → Batch convert multiple files
/about                → About, privacy, credits (FFmpeg, etc.)
```

## Use Cases (Summary)

| Use case           | Route              | Description |
|--------------------|--------------------|-------------|
| Extract audio      | `/extract-audio`   | Get MP3/WAV/etc. from video files. |
| Convert video      | `/convert-video`   | Change container/format (MP4, WebM, MKV, etc.). |
| Convert audio      | `/convert-audio`   | Change format (MP3, WAV, FLAC, OGG, etc.). |
| Convert image      | `/convert-image`   | Change format (PNG, JPG, WebP, AVIF, etc.). |
| Compress video     | `/compress-video`  | Reduce video file size (quality/size trade-off). |
| Compress image     | `/compress-image`  | Reduce image size or quality. |
| Trim video         | `/trim-video`      | Cut video by start/end time. |
| Trim audio         | `/trim-audio`      | Cut audio by start/end time. |
| Merge videos       | `/merge-videos`    | Concatenate multiple videos. |
| Merge audio        | `/merge-audio`     | Concatenate multiple audio files. |
| Extract frames     | `/extract-frames`  | Grab still images/screenshots from video. |
| Resize video       | `/resize-video`    | Change resolution (e.g. 1080p → 720p). |
| Resize image       | `/resize-image`    | Change width/height. |
| GIF tools          | `/gif-tools`       | Video to GIF, GIF to video. |
| Batch convert      | `/batch`           | Convert many files at once (same or mixed tasks). |

## Conventions for This Repo

- Use the App Router (`app/`) for all routes above.
- Each use case has its own route folder and `page.tsx` (e.g. `app/convert-video/page.tsx`).
- Shared UI: reusable upload, format selector, and download components.
- Keep copy and UI simple so non-technical users can complete tasks in a few clicks.
