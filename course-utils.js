/* Shared indexing prevents browser/renderer drift and cross-course audio collisions. */
(function (root) {
    'use strict';
    const leadPauseSeconds = 2;
    function segments(session) {
        let narrationIndex = 0;
        const result = session.segments.map(segment => segment.type === 'narration'
            ? { ...segment, _narIdx: narrationIndex++ } : { ...segment });
        if (session.extra) result.push({ type: 'narration', title: 'Keep listening', text: session.extra, _narIdx: narrationIndex });
        return result;
    }
    function audioPath(course, sessionIndex, narrationIndex) {
        return `${course.audioDir}/s${sessionIndex + 1}_${String(narrationIndex).padStart(2, '0')}.mp3`;
    }
    function stats(course, sessionIndex, metadata = {}) {
        let seconds = 0, tracks = 0, narrations = 0, measuredNarrations = 0;
        for (const segment of segments(course.sessions[sessionIndex])) {
            if (segment.type === 'narration') {
                narrations++;
                const recorded = metadata[audioPath(course, sessionIndex, segment._narIdx)] || segment.audioSeconds;
                if (recorded) measuredNarrations++;
                seconds += (recorded || segment.text.trim().split(/\s+/).length / 2.5) + leadPauseSeconds;
            } else {
                tracks++;
                seconds += segment.listenMinutes != null ? segment.listenMinutes * 60
                    : segment.endSeconds != null ? segment.endSeconds - (segment.startSeconds || 0)
                    : segment.duration || 0;
            }
        }
        return { seconds, tracks, narrations, measuredNarrations };
    }
    const api = { segments, audioPath, stats, leadPauseSeconds };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CourseUtils = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
