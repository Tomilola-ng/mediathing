# MediaThing — Features & pages checklist

Use this to track implementation. Check off when the page exists and works end-to-end (upload → process → download).

---

## Core (MVP)

- [ ] **Home** (`/`) — Hero, feature grid linking to each tool, CTA, no ads
- [ ] **Extract audio** (`/extract-audio`) — Video in → audio out (format picker)
- [ ] **Convert video** (`/convert-video`) — Video in → same/different format out
- [ ] **Convert audio** (`/convert-audio`) — Audio in → different format out
- [ ] **Convert image** (`/convert-image`) — Image in → different format out

---

## Extended use cases

- [ ] **Compress video** (`/compress-video`) — Reduce size (quality/size preset or slider)
- [ ] **Compress image** (`/compress-image`) — Reduce size/quality
- [ ] **Trim video** (`/trim-video`) — Start/end time or in/out points
- [ ] **Trim audio** (`/trim-audio`) — Start/end time
- [ ] **Merge videos** (`/merge-videos`) — Multiple videos → one file
- [ ] **Merge audio** (`/merge-audio`) — Multiple audio files → one file
- [ ] **Extract frames** (`/extract-frames`) — Video → image(s) at time(s) or interval
- [ ] **Resize video** (`/resize-video`) — Resolution presets (e.g. 720p, 1080p) or custom
- [ ] **Resize image** (`/resize-image`) — Width/height or scale
- [ ] **GIF tools** (`/gif-tools`) — Video ↔ GIF (with optional loop, fps, scale)
- [ ] **Batch** (`/batch`) — Multiple files, same or mixed conversion tasks
- [ ] **About** (`/about`) — What MediaThing is, privacy, FFmpeg credit, repo link

---

## Shared / global

- [ ] **FFmpeg integration** — WASM or server API; single place for conversion logic
- [ ] **Upload component** — Drag-and-drop + file picker, type restrictions per tool
- [ ] **Format selector** — Dropdown or buttons for output format per tool
- [ ] **Download** — Trigger download of result; clear filename
- [ ] **Navigation** — Header/nav linking to Home + all tool pages
- [ ] **Mobile-friendly** — Layout and touch targets work on phones/tablets
- [ ] **No ads** — No ad scripts or trackers anywhere

---

## Optional polish

- [ ] Progress indicator for long conversions
- [ ] File size / duration preview before convert
- [ ] Presets (e.g. “Web”, “Archive”, “Mobile”) where relevant
- [ ] Error messages when format/codec not supported or file invalid
- [ ] Basic accessibility (focus, labels, keyboard use)

---

*Update this file as you complete each item.*
