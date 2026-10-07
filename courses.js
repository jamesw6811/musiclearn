/* Shared course registry used by the browser and the audio renderer. */
const COURSES = [
    {
        id: 'rhythm', title: 'Rhythm as Architecture',
        tagline: 'Polyrhythm, Odd Meters & the Mathematics of Feel',
        intro: 'Five guided sessions. Narration and listening follow the authored sequence. Existing recordings play automatically, with browser narration available for unrendered pages.',
        sessions: SESSIONS, youtubeIds: YOUTUBE_IDS, audioDir: 'audio'
    },
    {
        id: 'house', title: 'House as Continuation',
        tagline: 'Gospel, Machines & the Making of House',
        intro: 'Six guided sessions tracing the music, people, and machines behind house. All 39 narration pages use the recorded Eric voice, with a short pause before each page.',
        sessions: HOUSE_SESSIONS, youtubeIds: HOUSE_YOUTUBE_IDS, audioDir: 'audio/house'
    },
    {
        id: 'pitch', title: 'The Inside of a Note',
        tagline: 'Pitch, Tuning & Timbre',
        intro: 'Six sessions on harmonics, tuning, and timbre. Read one page, listen, then continue. Listening windows are suggested excerpts; some recordings open manually. Narration currently uses the browser voice.',
        sessions: PITCH_SESSIONS, youtubeIds: {}, audioDir: 'audio/pitch'
    }
];
