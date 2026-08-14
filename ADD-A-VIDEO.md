# How to add a new video

This library keeps the deployed site tiny by storing the large `.mp4` files
in a **GitHub Release** (tag `media`) instead of in the repository. Only small
files live in the repo: `index.html`, poster images (`videos/*.jpg`), and
caption files (`captions/*.vtt`). Adding a video therefore has two parts:
upload the MP4 to the Release, then register the video in `index.html`.

Repository: `github.com/LinaShehadeh/shehadeh-video-library`
Live site: `videos.shehadehlab.com`

---

## What you need per video

Pick a short **id** in kebab-case (e.g. `action-potential`). Every filename is
built from it. Then prepare:

1. **The video** — `action-potential.mp4` (any size; it goes to the Release, not the repo).
2. **A poster image** — `action-potential.jpg`, a clean still frame with no
   burned-in caption (used for the card thumbnail and the paused player).
3. **Caption files** — one `.vtt` per language you have, named
   `action-potential.<lang>.vtt` (e.g. `action-potential.en.vtt`,
   `action-potential.ar.vtt`). Each cue must use `line:10%` so captions sit at
   the top of the frame. You do not need all ten languages at once; add more later.

---

## Step 1 — Upload the MP4 to the `media` Release

1. Go to `github.com/LinaShehadeh/shehadeh-video-library/releases/tag/media`
2. Click **Edit** (pencil icon).
3. Drag `action-potential.mp4` into the **Attach binaries** box. Wait for 100%.
4. Click **Update release**.

The file is now served at:
`https://github.com/LinaShehadeh/shehadeh-video-library/releases/download/media/action-potential.mp4`

The filename here must match `videoFile` in Step 3 exactly.

## Step 2 — Add the small files to the repo

- Put the poster in `videos/` (e.g. `videos/action-potential.jpg`).
- Put every caption file in `captions/` (e.g. `captions/action-potential.en.vtt`).

Do **not** put the `.mp4` in the repo. `.gitignore` already blocks `videos/*.mp4`.

## Step 3 — Register the video in `index.html`

Open `index.html`, find the `videos: [` array inside `window.SITE`, and add a
new block. Copy the template below and edit the values. Keep the existing
videos as reference.

```js
{
  id: "action-potential",
  plate: "PHYS-003",
  system: "Cell & General Physiology",
  discipline: "Physiology",
  duration: "0:52",
  status: "published",
  thumb: "membrane",                       // fallback icon key; poster below overrides it
  poster: "videos/action-potential.jpg",   // repo path
  videoFile: "action-potential.mp4",       // bare filename -> served from the media Release
  tags: ["action potential", "Na⁺ channel", "depolarization"],
  objectives: [
    "Describe the phases of the action potential.",
    "Link each phase to its ion channel."
  ],
  usmle: ["Step 1 · Cardiovascular — membrane potentials"],

  // Optional practice questions. answer is a 0-based index into choices.
  questions: [
    {
      step: "Step 1",
      stem: "Question text…",
      choices: ["A", "B", "C", "D", "E"],
      answer: 1,
      explanation: "Why B is correct…"
    }
  ],

  // One entry per language you have a caption file for. EN uses mode "audio"
  // (native narration + captions); all others use mode "captions".
  langs: {
    EN: { mode:"audio",    vtt:"captions/action-potential.en.vtt",
          title:"The Cardiac Action Potential",
          desc:"One-sentence summary in English." },
    ES: { mode:"captions", vtt:"captions/action-potential.es.vtt",
          title:"Title in Spanish",
          desc:"Summary in Spanish." }
    // add AR, PT, FR, HT, TL, MS, TR, IT the same way as you translate them
  }
}
```

## Step 4 — Publish

In Git CMD:

```
cd C:\Users\lsheh\Cowork\UM\outputs\shehadeh-video-library
git add -A
git commit -m "Add action-potential video"
git push
```

The deploy stays small and finishes in under a minute. Hard-refresh the live
site (Ctrl+Shift+R) to see the new card.

---

## Replacing or updating an existing video

- **New cut of the same video:** upload the new `.mp4` to the `media` Release
  under the **same filename** (it overwrites), then hard-refresh. No repo push needed.
- **New caption language:** add the `.vtt` to `captions/`, add a `langs` entry,
  then commit and push.
- **Fix a caption:** edit the `.vtt` in `captions/`, commit and push.

## Rules and reminders

- Filenames are case-sensitive and must match between the Release asset and
  `videoFile`.
- MP4s never go in the repo; they live only on the `media` Release.
- Caption cues use `line:10%` for top placement.
- `answer` in a question is a 0-based index (0 = first choice).
- Keep the existing videos in place as working examples.
