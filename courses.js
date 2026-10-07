/* Shared course registry used by the browser and the audio renderer. */
const COURSES = [
    {
        id: 'rhythm', labs: ['polyrhythm'], title: 'Rhythm as Architecture',
        tagline: 'Polyrhythm, Odd Meters & the Mathematics of Feel',
        intro: 'Five guided sessions. Narration and listening follow the authored sequence. Existing recordings play automatically, with browser narration available for unrendered pages.',
        sessions: SESSIONS, youtubeIds: YOUTUBE_IDS, audioDir: 'audio'
    },
    {
        id: 'house', labs: [], title: 'House as Continuation',
        tagline: 'Gospel, Machines & the Making of House',
        intro: 'Six guided sessions tracing the music, people, and machines behind house. All 39 narration pages use the recorded Eric voice, with a short pause before each page.',
        sessions: HOUSE_SESSIONS, youtubeIds: HOUSE_YOUTUBE_IDS, audioDir: 'audio/house'
    },
    {
        id: 'pitch', labs: ['harmonics', 'tuning'], title: 'The Inside of a Note',
        tagline: 'Pitch, Tuning & Timbre',
        intro: 'Six sessions on harmonics, tuning, and timbre. Press Play once and listen through the whole session. Narration and music advance automatically. The course includes a welcome, guided listening, and a closing for each session. Sessions 1–2 have recorded narration; Sessions 3–6 currently use browser narration.',
        sessions: PITCH_SESSIONS, youtubeIds: {}, audioDir: 'audio/pitch-v2'
    }
];

// Playback sources override legacy IDs and album-relative offsets in older scripts.
for (const course of COURSES) {
    course.sessions = course.sessions.map(session => ({
        ...session,
        segments: session.segments.map(segment => segment.type === 'music'
            ? { ...segment, ...PLAYBACK_CATALOG[course.id][segment.title] }
            : segment)
    }));
    course.youtubeIds = Object.fromEntries(Object.entries(PLAYBACK_CATALOG[course.id]).map(([title, source]) => [title, source.youtubeId]));
}
