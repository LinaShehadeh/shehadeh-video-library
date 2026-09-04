# Shehadeh Lab — Foundational Science Video Library

A build-free static site. No framework, no build step. Deploys to Cloudflare
Pages and serves at **videos.shehadehlab.com**.

## What's where
- `index.html` — the whole site (catalog, search, filter, multilingual player)
- `data.js` content block — currently inside `index.html`, marked
  "editable content". This is the only thing you edit to add a video or language.
- `captions/` — the small `.vtt` subtitle files (one per language per video).
  Pattern: `{video-id}.{srclang}.vtt` (e.g. `cell-membrane-potential.ar.vtt`).
- `maps/` — the **Mechanism Map** PowerPoint decks (the BUILD IT files), one per
  video plus the capstone. Pattern: `{video-id}-mechanism-map.pptx`. These are
  the *student* versions. **Answer keys never go in this repo** — once a key is
  public the exercise stops working everywhere it is used.
- Video `.mp4` files do **not** live here. They live on **cdn.shehadehlab.com**
  (Cloudflare R2) — big files, zero egress. `index.html` points at them via `cdnBase`.

## To make THIS video live
1. Upload the final MP4 to R2 as `videos/cell-membrane-potential.mp4`
   (so its URL is `https://cdn.shehadehlab.com/videos/cell-membrane-potential.mp4`).
2. Replace the 8 placeholder files in `captions/` with the real `.vtt` files
   from Cowork. Keep the exact filenames.
3. Push to the repo → Cloudflare Pages redeploys automatically.

## To add a NEW video (the PR workflow)
1. Upload its MP4 to R2 under `videos/{id}.mp4`.
2. Add its `.vtt` caption files to `captions/`.
3. Add one entry to the `videos` array in the content block (copy the existing
   one and edit — TEMPLATE below).
4. Open a pull request. On merge, it's live. The PR is the review gate.

## To add a LANGUAGE to an existing video
1. Add the `.vtt` file to `captions/`.
2. Add one language entry to that video's `langs` object.
3. Open a PR.

## Deploy (one time)
- Create a GitHub repo, push these files.
- Cloudflare Pages → Connect to Git → pick the repo → no build command (static).
- Add custom domain `videos.shehadehlab.com`.
- Set up the `cdn.shehadehlab.com` R2 bucket for the video files.

## Caption files & RTL
Captions are WebVTT. Arabic (`ar`) is right-to-left — the browser handles the
RTL rendering natively from the VTT, no special player code. Always have a
native speaker who knows the science review a translation before it's merged.

## Mechanism Maps
Each video card carries a download button for its Mechanism Map — a PowerPoint
containing every object from that animation at one shared scale, plus three
empty canvases the students assemble on. To add or replace one:

1. Drop the `.pptx` in `maps/` as `{video-id}-mechanism-map.pptx`.
2. Add (or edit) the `maps:` array on that video in `index.html`.
3. Push. The button appears automatically; a video with no `maps:` entry simply
   shows no button and no badge.

Bump `version` in the `maps:` entry whenever you replace a file, so students can
tell which copy they are holding.

## Languages currently wired
EN (original audio) · AR · ES · PT · FR · HT · TL · MS — captions.
