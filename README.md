# Music Learn

One static app for three guided listening courses, using the newer House as Continuation playback format. No build step is required.

## Run

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765 and choose Rhythm as Architecture (five sessions), House as Continuation (six), or The Inside of a Note (six). The browser remembers the selected course.

Every course plays in authored order, with narration and music interleaved. Each new narration page has a two-second silent lead-in. Existing MP3s play first; missing recordings fall back to browser speech. Pause, resume, skipping, and returning to the course list cancel pending narration starts.

## Content and recordings

- `sessions.js`: original rhythm course, using its existing `audio/sN_XX.mp3` files. Seven MP3s are currently available.
- `house-sessions.js`: imported house course. All 39 existing MP3s were copied to `audio/house/`; the separate `musiclearn-house` folder was not modified.
- `pitch-sessions.js` and `pitch-curriculum.md`: pitch/tuning course, with 18 main reads and two optional album notes. Its reserved audio location is `audio/pitch/`; no ElevenLabs recordings have been generated yet.
- `courses.js`: course titles, data, video lookups, and audio directories.
- `course-utils.js`: shared authored-order indexing, filenames, and duration calculations used by both the player and generator.
- `audio-durations.js`: measured MP3 durations. Session estimates prefer these values, then the segment's `audioSeconds`, then a 150-word-per-minute estimate. Totals include two seconds per narration page and track durations or specified excerpt windows.
- `STYLE.md`: the house course's narration style and pre-render accuracy requirements, retained as the editorial baseline for future revisions. Consolidation does not mean every older script has been re-audited against it.

Pitch listening windows remain excerpt budgets, not verified release durations. Some tracks open via manual links. The house course retains its existing video IDs; merging has not reverified regional availability or embedding. Use the timeline or Next button to read without starting narration.

## ElevenLabs workflow

The shared generator retains the house course's Eric voice, `eleven_multilingual_v2`, and voice settings. The API key is read from `ELEVENLABS_API_KEY` rather than stored in the served script. Set that environment variable in your terminal before rendering. Rendering also requires `ffprobe` to validate and measure the MP3s.

Inspect the jobs without making API calls:

```sh
node generate-audio.js --course pitch --dry-run
node generate-audio.js --course house --session 1 --dry-run
```

After the narration script is approved, render a course or one session:

```sh
node generate-audio.js --course pitch --session 1
```

Use `rhythm`, `house`, or `pitch`. Existing files are skipped and measured. To replace recordings after editing their text, select the intended course/session and add `--force`. The generator does not automatically detect changed narration text. A `speechText` field can supply a pronunciation-friendly version while leaving the displayed `text` intact.

Measure existing audio without rendering:

```sh
node generate-audio.js --course house --measure
```

Successful renders update `audio-durations.js`. Reload the app to pick up new recordings and timings. The two optional pitch album notes use narration index 03 in sessions 2 and 5, matching the player.

## Listening labs

- **Build a note:** mix twelve harmonics, compare sine/saw/square recipes, and isolate a partial.
- **Tuning & beating:** compare pure ratios with piano tuning, or tune two nearby sine tones until their beats stop.
- **Polyrhythm visualizer:** the original rhythm tool remains available.

The pitch toys synthesize audio locally and stop on leaving the lab or hiding the tab. Their diagrams remain usable without audio support.

## Checks

```sh
node --test tests/course-integration.test.js
```

`create-playlist.js` remains the original rhythm-only Spotify helper; it is not part of the shared player or narration pipeline. It requires `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in the environment. Keep API credentials out of source control.
