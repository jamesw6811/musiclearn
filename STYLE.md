# House as Continuation — Narration Style Guide

Authoritative tone/prose rules for all narration in `sessions.js`. Set with the
user on 2026-07-09. Apply to new writing (Sessions 5–6) and when revising
existing sessions. Overall aim (user's words): **less pithy, more to the point** —
write like a historian, teach mechanics, don't perform.

## The ten decisions

1. **No pithy rhetorical asides.** Eliminate the whole family entirely: "that's
   not an accident," "that's the point," "here's the thing," "and that's no
   coincidence," "make no mistake." State the substantive point directly.
   - ✗ "The two poles appeared within two years. That's not an accident."
   - ✓ "The two poles appeared within two years, both produced by the same scene working with the same machines."

2. **Register: measured historian.** Authoritative, plain, explanatory;
   confident without performing. Not NPR-chatty, not flat textbook.
   - ✓ "The Roland TR-808's drum sounds were obviously synthetic. That quality, dismissed as a defect in 1980, became central to its importance a few years later."

3. **Mostly complete sentences.** Full, well-formed sentences. An occasional
   short sentence for emphasis is fine; avoid the punchy-fragment style.
   - ✗ "It's church. And it's about to become a club."
   - ✓ "The record is gospel in its structure, and within a few years it would become the basis of club music."

4. **Keep direct address freely.** This is audio, so address the listener for
   both concrete listening cues and rapport: "Listen for the open hi-hat,"
   "Notice how the chords float," "you'll hear this again." This is the one
   conversational element we keep.

5. **Rhetorical questions: sparingly.** At most one genuine question to open a
   topic occasionally; not a recurring device. Usually state the point directly.
   - ✗ "So what did the dance floor become? A congregation."
   - ✓ "The dance floor became a congregation."

6. **Signposting: light touch.** A brief orientation at the start of each session
   and a brief handoff to the next at the end. Cut mid-session scaffolding like
   "take stock of what we have" and "remember this, because." Keep the
   cross-session callbacks that hold the course together, but state them once and
   plainly.

7. **Intensifiers: sparingly, prefer plain claims.** Cut most of "the single most
   important," "literally," "exactly," "precisely," "aggressively." Let the fact
   carry the weight; keep an intensifier only when literally true and load-bearing.
   - ✗ "This is the single most important object in the story, and it literally defined the sound."
   - ✓ "This machine shaped the sound of house more than any other."

8. **Em-dashes: keep.** Em-dashes for asides and appositives are fine and may be
   used freely for rhythm. (This is the user's explicit preference.)

9. **Value judgments: include with explicit moral framing.** Do not flatten the
   social and political context to neutral facts. Name injustice as injustice —
   uncredited/unpaid sampling, the racial dynamics of Disco Demolition Night, the
   exclusion of Black and queer communities — and say so plainly.
   - ✓ "A Black gospel-trained woman's labor became the raw material for other people's hits — an injustice worth naming plainly."

10. **Metaphor: sparingly, kept grounded.** Introduce a comparison once when it
    genuinely clarifies a mechanism (e.g. the drum machine taking the organ's
    role), then return to concrete description. Don't sustain or repeat an
    extended metaphor across a whole session.

## Accuracy (non-negotiable)

**Review and cross-check every fact and reference for accuracy before rendering.**
This narration makes specific historical claims — names, dates, places, labels,
studios, chart positions, catalogue numbers, who made what and when, and how a
machine works — and every one of them must be verified, not recalled from
memory. Concretely:

- Cross-check each factual claim against reliable sources; where sources
  disagree or a "first/invented by" claim is contested, hedge honestly
  ("usually credited as," "widely regarded as") rather than asserting a single
  disputed fact as settled.
- Verify every track's artist, title, year, and label, and that the YouTube ID
  in `YOUTUBE_IDS` is the correct recording (and embeddable).
- Get technical mechanics right (e.g. how the TB-303, TR-808, sequencer, or
  sampler actually work); do not simplify to the point of error.
- Prefer omitting a shaky detail to stating it confidently and wrongly.

## Quick checklist before rendering a session

- [ ] No banned pithy asides (rule 1)
- [ ] No punchy fragments doing emphasis work (rule 3)
- [ ] Rhetorical questions ≤ ~1 per session (rule 5)
- [ ] Removed "take stock / remember this" scaffolding (rule 6)
- [ ] Stripped intensifiers that aren't load-bearing (rule 7)
- [ ] Social/political facts stated with their moral weight intact (rule 9)
- [ ] Each metaphor used once, then grounded (rule 10)
- [ ] Every fact, date, name, label, and track reference cross-checked against sources; contested claims hedged (Accuracy)
- [ ] Every segment teaches distinct, concrete, mechanical content (the standing project note)

## Pitch course voice

For `pitch-sessions.js` and `pitch-curriculum.md`, the user's October 2026 direction
is conversational, story-led public-radio narration. Begin with an audible detail,
a performer's action, or a practical experiment, then explain it. Use natural
spoken sentences and specific listening cues. Do not invent scenes, dialogue, or
reporting to create a story. Preserve technical qualifications and source links.
This course-specific direction takes precedence over the house course's
“measured historian” register above; the house script keeps its existing voice.

Treat the user's broader prose guidance as editorial judgment, not a mechanical
word filter. Cut empty intensifiers, throat-clearing, binary reveals, faux-insight
setups, dramatic fragments, interpretive asides, and clever closing lines. Avoid
stock promotional verbs and metaphors, repeated sentence patterns, decorative em
dashes, and unnecessary recaps. Prefer concrete explanations and ordinary verbs.
Keep useful direct address, factual distinctions, and technical terms such as
“just intonation.” End each read with a specific listening action.


### Pitch course guidance and recording approval

Establish what the course and each session will teach before introducing its
first recording. Connect each new block to the preceding listening, introduce
technical terms before relying on them, and identify upcoming recordings in
playback order. Listening cues must work during a single hands-free pass; labs
and replays are optional. Do not assume that the listener has already heard an
upcoming example or completed an optional experiment.

The user explicitly requires copy review before rerecording because generation
costs money. Keep proposed changes in `pitch-review.json` and `pitch-review.html`
until approved. Do not call ElevenLabs for revisions before the user approves
the revised copy. The existing live script and recordings should stay matched
while a new draft is being reviewed.
