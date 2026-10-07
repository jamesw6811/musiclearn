const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadCourses, collectJobs } = require('../generate-audio');
const CourseUtils = require('../course-utils');
const COURSES = loadCourses();
const root = path.resolve(__dirname, '..');
const AUDIO_DURATIONS = new Function(fs.readFileSync(path.join(root, 'audio-durations.js'), 'utf8') + ';return AUDIO_DURATIONS;')();

test('all three courses preserve authored order and have collision-free renderer paths', () => {
    assert.deepEqual(COURSES.map(c => [c.id, c.sessions.length]), [['rhythm',5], ['house',6], ['pitch',6]]);
    const paths = [];
    for (const course of COURSES) {
        const expected = [];
        course.sessions.forEach((session, index) => {
            const segments = CourseUtils.segments(session);
            assert.deepEqual(segments.slice(0, session.segments.length).map(s => [s.type, s.title]), session.segments.map(s => [s.type, s.title]));
            segments.filter(s => s.type === 'narration').forEach((segment, narIdx) => {
                assert.equal(segment._narIdx, narIdx);
                expected.push(CourseUtils.audioPath(course, index, narIdx));
            });
        });
        assert.deepEqual(collectJobs(course).map(j => j.filename), expected);
        paths.push(...expected);
    }
    assert.equal(new Set(paths).size, paths.length);
    const pitch = collectJobs(COURSES.find(c => c.id === 'pitch'));
    assert.equal(pitch.length,25);
    assert.ok(pitch.some(j => j.filename === 'audio/pitch-v2/s2_03.mp3'));
    assert.ok(pitch.some(j => j.filename === 'audio/pitch-v2/s5_03.mp3'));
});

test('all house recordings exist and timing metadata covers them', () => {
    const jobs = collectJobs(COURSES.find(c => c.id === 'house'));
    assert.equal(jobs.length,39);
    for (const job of jobs) {
        assert.ok(fs.statSync(path.join(root,job.filename)).size > 1000);
        assert.ok(AUDIO_DURATIONS[job.filename] > 0);
    }
});

test('duration totals include measured audio, missing-audio estimates, excerpt windows and lead-ins', () => {
    const course = {audioDir:'audio/test', sessions:[{segments:[
        {type:'narration',text:'one two three four five',audioSeconds:9},
        {type:'music',duration:600,listenMinutes:2},
        {type:'narration',text:'one two three four five'},
        {type:'music',startSeconds:10,endSeconds:40}
    ]}]};
    assert.equal(CourseUtils.stats(course,0,{'audio/test/s1_00.mp3':10}).seconds,166);
});

function playerHarness() {
    const elements = new Map(), documentEvents = {}, timers = new Map(), audio = [], spoken = [], players = [];
    let timerIndex = 0;
    function element(selector) {
        if (!elements.has(selector)) elements.set(selector, {
            innerHTML:'', textContent:'', value:'', events:{},
            classList:{ contains:()=>false, add(){}, remove(){}, toggle(){} },
            addEventListener(name, callback) { this.events[name]=callback; },
            append(){}, setAttribute(){}, insertAdjacentElement(){}, querySelector(){return null;}
        });
        return elements.get(selector);
    }
    const document = {
        readyState:'loading', title:'', head:{appendChild(){}},
        querySelector:element, querySelectorAll:()=>[], getElementById:()=>null,
        addEventListener(name, callback) { documentEvents[name]=callback; }, createElement:()=>element('created')
    };
    class Audio {
        constructor(src) { this.src=src; this.paused=true; this.currentTime=0; this.plays=0; audio.push(this); }
        load(){} play(){ this.paused=false; this.plays++; return Promise.resolve(); }
        pause(){ this.paused=true; } removeAttribute(){}
    }
    const YT = {PlayerState:{ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3},Player:class {
        constructor(id,options){this.events=options.events;this.loads=[];this.time=0;players.push(this);}
        loadVideoById(options){this.loads.push(options);this.videoId=options.videoId;this.time=options.startSeconds;}
        getVideoData(){return {video_id:this.videoId};}
        getCurrentTime(){return this.time;}
        pauseVideo(){} playVideo(){this.events.onStateChange({data:1});} stopVideo(){}
    }};
    const context = { document, Audio, COURSES: COURSES.map(course=>({...course,sessions:course.sessions.map(session=>({...session,
            segments:session.segments.map(({visualId,...segment})=>segment)
        }))})), CourseUtils, AUDIO_DURATIONS, YT,
        window:{YT,location:{origin:'http://localhost:8765'}}, localStorage:{getItem:()=>null,setItem(){}},
        speechSynthesis:{getVoices:()=>[],addEventListener(){},cancel(){},speak(utterance){spoken.push(utterance);},resume(){},pause(){}},
        SpeechSynthesisUtterance:class {constructor(text){this.text=text;}},
        setTimeout(callback){timers.set(++timerIndex,callback);return timerIndex;},
        clearTimeout(id){timers.delete(id);}
    };
    vm.runInNewContext(fs.readFileSync(path.join(root,'app.js'),'utf8'), context);
    documentEvents.DOMContentLoaded();
    return {
        audio, spoken, timers, element, players,
        jump(index) { element('#timeline-segments').onclick({target:{closest:()=>({dataset:{idx:String(index)}})}}); },
        select(id) { element('#course-select').events.change({target:{value:id}}); },
        open(index=0) { element('#session-grid').events.click({target:{closest:()=>({dataset:{idx:String(index)}})}}); },
        click(selector) { element(selector).events.click(); },
        tick() { const callbacks=[...timers.values()];timers.clear();callbacks.forEach(callback=>callback()); }
    };
}

test('recorded narration waits, pauses during lead-in, then resumes without stalling', () => {
    const player=playerHarness();player.select('house');player.open();player.click('#play-pause');
    const audio=player.audio.at(-1);
    assert.equal(audio.src,'audio/house/s1_00.mp3');assert.equal(audio.plays,0);
    player.click('#play-pause');player.tick();assert.equal(audio.plays,0);
    player.click('#play-pause');assert.equal(audio.plays,1);
    player.click('#back-btn');assert.equal(audio.paused,true);
});

test('missing recording falls back after the pause; stale callbacks cannot start another course', () => {
    const player=playerHarness();player.select('pitch');player.open();player.click('#play-pause');
    const missing=player.audio.at(-1);assert.equal(missing.src,'audio/pitch-v2/s1_00.mp3');
    missing.onerror();assert.equal(player.spoken.length,0);player.tick();assert.equal(player.spoken.length,1);
    const staleEnd=player.spoken[0].onend;
    player.click('#back-btn');player.select('house');player.open();player.click('#play-pause');
    staleEnd();assert.equal(player.spoken.length,1);
    player.tick();assert.equal(player.audio.at(-1).plays,1);
});

test('leaving before the lead-in ends cancels playback', () => {
    const player=playerHarness();player.select('house');player.open();player.click('#play-pause');
    player.click('#back-btn');player.tick();assert.equal(player.audio[0].plays,0);
});


test('every required recording has a bounded automatic playback source', () => {
    let count=0;
    for (const course of COURSES) for (const session of course.sessions) {
        for (const seg of session.segments.filter(s=>s.type==='music')) {
            count++;
            assert.match(seg.youtubeId,/^[\w-]{11}$/);
            assert.equal(course.youtubeIds[seg.title],seg.youtubeId);
            assert.ok(seg.startSeconds>=0 && seg.endSeconds>seg.startSeconds);
            assert.ok(seg.endSeconds<=seg.videoSeconds);
        }
    }
    assert.equal(count,97);
});

test('all 17 sessions progress from one Play through narration and music to completion', () => {
    for (const course of COURSES) course.sessions.forEach((session,index)=>{
        const p=playerHarness();p.select(course.id);p.open(index);p.click('#play-pause');
        for(const seg of CourseUtils.segments(session)) {
            assert.equal(p.element('#segment-name').textContent,seg.title);
            if(seg.type==='narration') {p.tick();p.audio.at(-1).onended();}
            else {
                const yt=p.players.at(-1);
                yt.events.onReady();
                assert.equal(yt.loads.at(-1).videoId,seg.youtubeId);
                assert.equal(yt.loads.at(-1).endSeconds,seg.endSeconds);
                yt.events.onStateChange({data:1});yt.events.onStateChange({data:0});
            }
        }
        assert.equal(p.element('#segment-name').textContent,'Session complete');
        assert.equal(p.timers.size,0);
    });
});

test('excerpt cutoff advances automatically and leaving cancels a queued video skip', () => {
    const p=playerHarness();p.open();p.jump(2);p.click('#play-pause');
    const yt=p.players.at(-1);yt.events.onReady();yt.events.onStateChange({data:1});
    yt.time=240;p.tick();assert.equal(p.element('#segment-name').textContent,"Orphan's Lament");
    yt.events.onError({data:150});assert.match(p.element('#playback-status').textContent,/Continuing/);
    p.click('#back-btn');p.tick();assert.equal(p.timers.size,0);
});

test('failed music advances once; pause and resume recover without a manual link', () => {
    const p=playerHarness();p.open();p.jump(2);p.click('#play-pause');
    const yt=p.players.at(-1);yt.events.onReady();yt.events.onError({data:150});
    p.click('#play-pause');p.tick();assert.equal(p.element('#segment-name').textContent,'Polyphonic overtone singing');
    p.click('#play-pause');p.tick();assert.equal(p.element('#segment-name').textContent,"Orphan's Lament");
});

test('browser autoplay denial pauses instead of silently skipping a playable recording', () => {
    const p=playerHarness();p.open();p.jump(2);p.click('#play-pause');
    const yt=p.players.at(-1);yt.events.onReady();yt.events.onAutoplayBlocked();
    p.tick();assert.equal(p.element('#segment-name').textContent,'Polyphonic overtone singing');
    assert.match(p.element('#playback-status').textContent,/browser blocked/);
    p.click('#play-pause');assert.equal(yt.loads.length,1);
});


test('live Pitch narration matches the approved copy exactly and every session has a closing', () => {
    const approved=JSON.parse(fs.readFileSync(path.join(root,'reviews/pitch-approved-2026-10-07/pitch-review.json'),'utf8'));
    const pitch=COURSES.find(c=>c.id==='pitch');
    for(const [i,session] of pitch.sessions.entries()) {
        const actual=CourseUtils.segments(session).filter(s=>s.type==='narration').map(s=>s.text);
        const expected=approved.sessions[i].segments.filter(s=>s.type==='narration').map(s=>s.text);
        if(i===0)expected.unshift(approved.courseWelcome);
        expected.push(approved.sessions[i].reviewClosing);
        assert.deepEqual(actual,expected);
        assert.match(session.segments.at(-1).title,/closing/);
    }
    assert.equal(pitch.sessions[0].segments[2].artist,'Anna-Maria Hefele');
});
