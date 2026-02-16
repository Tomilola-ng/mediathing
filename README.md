# MediaThing

**Simple, open-source media conversion in the browser—powered by FFmpeg, built for everyone.**

MediaThing lets you extract audio from video, convert video/audio/image formats, compress files, trim clips, merge media, and more—without the command line, without ads, and without leaving the web.

---

## GitHub short description (for repo subtitle)

Use this as the repository description on GitHub:

> Simple, ad-free media conversion in the browser. Extract audio, convert video/audio/images, compress, trim, merge—powered by FFmpeg. No install, no terminal.

---

## Features

- **Extract audio** — Get MP3, WAV, or other audio from any video.
- **Convert video** — Change format (MP4, WebM, MKV, MOV, AVI, etc.).
- **Convert audio** — Change format (MP3, WAV, FLAC, OGG, M4A, etc.).
- **Convert image** — Change format (PNG, JPG, WebP, AVIF, BMP, etc.).
- **Compress video** — Reduce file size with quality/size options.
- **Compress image** — Shrink images for web or storage.
- **Trim video / audio** — Cut by start and end time.
- **Merge videos / audio** — Combine multiple files into one.
- **Extract frames** — Grab screenshots or stills from video.
- **Resize video / image** — Change resolution or dimensions.
- **GIF tools** — Convert between video and GIF.
- **Batch convert** — Process many files in one go.

All in the browser, no installs, no ads.

---

## Getting started

### Prerequisites

- Node.js 18+
- pnpm (or npm / yarn)

### Install and run

```bash
git clone https://github.com/your-username/mediathing.git
cd mediathing
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
pnpm build
pnpm start
```

---

## Project structure

```
app/
  page.tsx              # Home
  extract-audio/        # Extract audio from video
  convert-video/        # Video format conversion
  convert-audio/        # Audio format conversion
  convert-image/        # Image format conversion
  compress-video/
  compress-image/
  trim-video/
  trim-audio/
  merge-videos/
  merge-audio/
  extract-frames/
  resize-video/
  resize-image/
  gif-tools/
  batch/
  about/
components/             # Shared UI (upload, format picker, etc.)
lib/                    # FFmpeg bindings, utils
public/
```

See [.cursor/rules/about-project.md](.cursor/rules/about-project.md) for full route and use-case list.

---

## Tech stack

- **Next.js** (App Router) — Routing and UI
- **React** — Components
- **Tailwind CSS** — Styling
- **FFmpeg** — Media processing (WASM or server-side, TBD)
- **shadcn / Base UI** — Accessible components

---

## Contributing

Contributions are welcome: new use-case pages, better defaults, accessibility, and docs. Please open an issue or PR.

---

## License

Open source; see [LICENSE](LICENSE) in the repo.

---

## Credits

- [FFmpeg](https://ffmpeg.org/) — The media engine behind MediaThing.
