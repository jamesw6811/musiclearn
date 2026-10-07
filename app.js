/* ============================================
   Rhythm as Architecture - App Controller
   ============================================ */

(function () {
    'use strict';

    let courseId = 'pitch';
    const activeCourse = () => COURSES.find(course => course.id === courseId);
    const formatMinutes = seconds => `~${Math.round(seconds / 60)} min`;
    const statsFor = index => CourseUtils.stats(activeCourse(), index, AUDIO_DURATIONS);
    const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));

    // --- State ---
    let currentSessionIdx = null;
    let currentSegIdx = -1;
    let isPlaying = false;
    let speechRate = 1.0;
    let selectedVoice = null;
    let speakingUtterance = null;
    let narrationAudio = null; // HTML5 Audio element for MP3 narration
    let currentSegments = []; // Authored order for every course
    let narrationStartTimer = null;
    let narrationGeneration = 0;
    let narrationFallback = null;
    let narrationVisualStop = null; // teardown fn for active narration visual


    // --- DOM refs ---
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const homeView = $('#home-view');
    const sessionView = $('#session-view');
    const sessionGrid = $('#session-grid');
    const sessionLabel = $('#session-label');
    const timelineSegments = $('#timeline-segments');
    const narrationDisplay = $('#narration-display');
    const musicDisplay = $('#music-display');
    const idleDisplay = $('#idle-display');
    const narrationTitle = $('#narration-title');
    const narrationText = $('#narration-text');
    const trackTitle = $('#track-title');
    const trackArtist = $('#track-artist');
    const trackAlbum = $('#track-album');
    const trackContext = $('#track-context');
    const playerWrapper = $('#player-wrapper');
    const segmentName = $('#segment-name');
    const segTypeIcon = $('#segment-type-icon');
    const segCounter = $('#seg-counter');
    const playPauseBtn = $('#play-pause');
    const iconPlay = $('#icon-play');
    const iconPause = $('#icon-pause');
    const voiceModal = $('#voice-modal');
    const voiceSelect = $('#voice-select');
    const rateSlider = $('#rate-slider');
    const rateValue = $('#rate-value');

    // --- Init ---
    function init() {
        try {
            const savedCourse = localStorage.getItem('musiclearn-course');
            if (COURSES.some(course => course.id === savedCourse)) courseId = savedCourse;
        } catch (_) {}
        $('#course-select').innerHTML = COURSES.map(course => `<option value="${course.id}">${course.title}</option>`).join('');
        renderCourse();
        bindEvents();
        loadVoices();
        loadPrefs();
    }

    function renderCourse() {
        const course = activeCourse();
        $('#course-select').value = course.id;
        $('#course-title').textContent = course.title;
        $('#course-tagline').textContent = course.tagline;
        $('#course-intro').textContent = course.intro;
        document.title = course.title + ' · Music Learn';
        renderSessionGrid();
    }

    // --- Render home grid ---
    function renderSessionGrid() {
        const colors = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--s5)', 'var(--s6)'];
        sessionGrid.innerHTML = activeCourse().sessions.map((s, i) => `
            <button class="session-card" data-idx="${i}" style="--card-accent: ${colors[i]}">
                <div class="session-num">${i + 1}</div>
                <div class="session-card-body">
                    <h2>${s.title}</h2>
                    <p>${s.subtitle}</p>
                </div>
                <div class="session-meta">${statsFor(i).tracks} tracks &middot; ${formatMinutes(statsFor(i).seconds)}</div>
            </button>
        `).join('');
    }

    // --- Events ---
    function bindEvents() {
        $('#course-select').addEventListener('change', (event) => {
            stopAll();
            courseId = event.target.value;
            try { localStorage.setItem('musiclearn-course', courseId); } catch (_) {}
            renderCourse();
        });
        sessionGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.session-card');
            if (card) openSession(parseInt(card.dataset.idx));
        });

        $('#back-btn').addEventListener('click', closeSession);
        playPauseBtn.addEventListener('click', togglePlayPause);
        $('#prev-seg').addEventListener('click', prevSegment);
        $('#next-seg').addEventListener('click', nextSegment);

        // Voice modal
        $('#voice-settings-btn').addEventListener('click', openVoiceModal);
        $('#close-modal').addEventListener('click', closeVoiceModal);
        $('.modal-backdrop').addEventListener('click', closeVoiceModal);
        $('#test-voice').addEventListener('click', testVoice);
        rateSlider.addEventListener('input', () => {
            speechRate = parseFloat(rateSlider.value);
            rateValue.textContent = speechRate.toFixed(1) + 'x';
            savePrefs();
        });
        voiceSelect.addEventListener('change', () => {
            const voices = speechSynthesis.getVoices();
            selectedVoice = voices.find(v => v.voiceURI === voiceSelect.value) || null;
            savePrefs();
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (voiceModal.classList.contains('open')) return;
            if (!sessionView.classList.contains('active')) return;
            if (e.code === 'Space') { e.preventDefault(); togglePlayPause(); }
            if (e.code === 'ArrowRight') nextSegment();
            if (e.code === 'ArrowLeft') prevSegment();
            if (e.code === 'Escape') closeSession();
        });
    }

    // --- Session navigation ---
    function openSession(idx) {
        currentSessionIdx = idx;
        currentSegIdx = -1;
        isPlaying = false;

        const session = activeCourse().sessions[idx];
        sessionLabel.textContent = `${activeCourse().title} · Session ${idx + 1}: ${session.title} · ${formatMinutes(statsFor(idx).seconds)}`;
        currentSegments = CourseUtils.segments(session);

        renderTimeline();
        showPanel('idle');
        updateTransport();
        updatePlayIcon();

        homeView.classList.remove('active');
        sessionView.classList.add('active');
    }

    function closeSession() {
        stopAll();
        currentSessionIdx = null;
        currentSegIdx = -1;
        currentSegments = [];
        isPlaying = false;
        sessionView.classList.remove('active');
        homeView.classList.add('active');
    }

    // --- Timeline ---
    function renderTimeline() {
        timelineSegments.innerHTML = currentSegments.map((seg, i) => {
            const type = seg.type === 'narration' ? 'narration' : 'music';
            return `<button class="tl-seg ${type}" data-idx="${i}" title="${escapeHTML(seg.title)}" aria-label="${type === 'narration' ? 'Read' : 'Listen'}: ${escapeHTML(seg.title)}"></button>`;
        }).join('');

        timelineSegments.onclick = (e) => {
            const el = e.target.closest('.tl-seg');
            if (el) goToSegment(parseInt(el.dataset.idx));
        };
    }

    function updateTimelineHighlight() {
        $$('.tl-seg').forEach((el, i) => {
            el.classList.toggle('active', i === currentSegIdx);
            el.classList.toggle('done', i < currentSegIdx);
        });
    }

    // --- Segment playback ---
    function goToSegment(idx) {
        if (idx < 0 || idx >= currentSegments.length) return;

        stopAll();
        currentSegIdx = idx;
        const seg = currentSegments[idx];

        updateTimelineHighlight();
        updateTransport();

        if (seg.type === 'narration') {
            showNarration(seg);
            if (isPlaying) speakNarration(seg);
        } else {
            showMusic(seg);
            if (isPlaying) playMusicTrack(seg);
        }
    }

    function advanceSegment() {
        if (currentSegIdx + 1 < currentSegments.length) {
            goToSegment(currentSegIdx + 1);
        } else {
            isPlaying = false;
            updatePlayIcon();
            segmentName.textContent = 'Session complete';
        }
    }

    function nextSegment() {
        if (currentSegIdx + 1 < currentSegments.length) {
            goToSegment(currentSegIdx + 1);
        }
    }

    function prevSegment() {
        if (currentSegIdx > 0) {
            goToSegment(currentSegIdx - 1);
        }
    }

    function togglePlayPause() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function play() {
        isPlaying = true;
        updatePlayIcon();

        if (currentSegIdx === -1) {
            goToSegment(0);
        } else {
            const seg = currentSegments[currentSegIdx];
            if (seg.type === 'narration') {
                resumeOrStartNarration(seg);
            } else {
                if (loadedVideoId === musicVideoId(seg)) resumeYouTube();
                else playMusicTrack(seg);
            }
        }
    }

    function pause() {
        isPlaying = false;
        updatePlayIcon();
        pauseSpeech();
        pauseYouTube();
    }

    function stopAll() {
        stopNarrationAudio();
        cancelSpeech();
        stopYouTube();
    }

    // --- UI updates ---
    function showPanel(which) {
        if (which !== 'narration') stopNarrationVisual();
        narrationDisplay.classList.toggle('hidden', which !== 'narration');
        musicDisplay.classList.toggle('hidden', which !== 'music');
        idleDisplay.classList.toggle('hidden', which !== 'idle');
    }

    function showNarration(seg) {
        showPanel('narration');
        narrationTitle.textContent = seg.title;
        const paras = seg.text.split('\n\n').filter(p => p.trim());
        narrationText.innerHTML = paras.map(p => `<p>${p.trim()}</p>`).join('');
        if (seg.sources?.length) {
            const refs = document.createElement('p');
            refs.className = 'source-links';
            refs.append('Sources: ');
            seg.sources.forEach((source, index) => {
                if (index) refs.append(' · ');
                const link = document.createElement('a');
                link.href = source.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = source.title;
                refs.append(link);
            });
            narrationText.append(refs);
        }
        mountNarrationVisual(seg.visualId);
    }

    function stopNarrationVisual() {
        if (narrationVisualStop) {
            narrationVisualStop();
            narrationVisualStop = null;
        }
        const host = document.getElementById('narration-visual');
        if (host) host.innerHTML = '';
    }

    function mountNarrationVisual(visualId) {
        stopNarrationVisual();
        if (!visualId) return;
        let host = document.getElementById('narration-visual');
        if (!host) {
            host = document.createElement('div');
            host.id = 'narration-visual';
            narrationText.insertAdjacentElement('afterend', host);
        }
        if (visualId === 'phase-beating') {
            narrationVisualStop = renderPhaseBeatingVisual(host);
        }
    }

    // --- Narration visual: Phase & Beat Frequencies ---
    function renderPhaseBeatingVisual(host) {
        host.innerHTML = `
            <div class="nv-wrap">
                <canvas class="nv-canvas"></canvas>
                <div class="nv-legend">
                    <span><i class="sw sw-a"></i>Pattern A &middot; tempo T</span>
                    <span><i class="sw sw-b"></i>Pattern B &middot; tempo T + &epsilon;</span>
                    <span><i class="sw sw-sum"></i>Sum (beat envelope)</span>
                </div>
                <div class="nv-caption">
                    Phase difference = &epsilon;&middot;t (mod 1) &nbsp;&middot;&nbsp;
                    Time to unison = 1 / &epsilon; &asymp; <span class="nv-tu">12.0s</span>
                </div>
            </div>
        `;
        const canvas = host.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        // Parameters
        const beatsPerLoop = 8;
        const tempoA = 0.42;           // loops per second
        const epsilon = 1 / 12;        // so time-to-unison = 12s
        const tempoB = tempoA + epsilon;
        host.querySelector('.nv-tu').textContent = (1 / epsilon).toFixed(1) + 's';

        // Visual-layer sizing
        let W = 0, H = 0, dpr = 1;
        function resize() {
            dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            W = Math.max(320, Math.floor(rect.width));
            H = 300;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.height = H + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        const onResize = () => resize();
        window.addEventListener('resize', onResize);

        const colorA = '#c9a96e';
        const colorB = '#6e9ec9';
        const colorSum = '#e4e2df';
        const colorText = '#8888a0';
        const colorGrid = 'rgba(136, 136, 160, 0.18)';

        const start = performance.now();
        let rafId = null;

        function draw(now) {
            const t = (now - start) / 1000;
            ctx.clearRect(0, 0, W, H);

            // ====== SECTION 1: Rhythm pulses (drifting) ======
            const padX = 16;
            const trackAY = 46;
            const trackBY = 96;
            const trackLeft = padX;
            const trackRight = W - padX;
            const trackWidth = trackRight - trackLeft;

            // Section heading
            ctx.fillStyle = colorText;
            ctx.font = '11px "DM Sans", system-ui, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Rhythm view — two looped patterns drift relative to each other', padX, 18);

            // Track rules
            ctx.strokeStyle = colorGrid;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(trackLeft, trackAY);
            ctx.lineTo(trackRight, trackAY);
            ctx.moveTo(trackLeft, trackBY);
            ctx.lineTo(trackRight, trackBY);
            ctx.stroke();

            // Row labels
            ctx.fillStyle = colorA;
            ctx.fillText('A', trackLeft, trackAY - 8);
            ctx.fillStyle = colorB;
            ctx.fillText('B', trackLeft, trackBY - 8);

            // Compute phases
            const phaseA = (t * tempoA) % 1;
            const phaseB = (t * tempoB) % 1;
            const phaseDiff = ((phaseB - phaseA) % 1 + 1) % 1;

            // Draw pulses: A at fixed grid, B offset by phaseDiff
            const gridLeftPad = 22;
            const usable = trackWidth - gridLeftPad - 12;
            for (let i = 0; i < beatsPerLoop; i++) {
                const frac = i / beatsPerLoop;
                const xA = trackLeft + gridLeftPad + frac * usable;
                const xB = trackLeft + gridLeftPad + ((frac + phaseDiff) % 1) * usable;

                // A pulse
                ctx.fillStyle = colorA;
                ctx.beginPath();
                ctx.arc(xA, trackAY, 5.5, 0, Math.PI * 2);
                ctx.fill();

                // B pulse
                ctx.fillStyle = colorB;
                ctx.beginPath();
                ctx.arc(xB, trackBY, 5.5, 0, Math.PI * 2);
                ctx.fill();

                // Connector when close
                const dx = Math.abs(xA - xB);
                const closeness = Math.max(0, 1 - dx / 28);
                if (closeness > 0.05) {
                    ctx.strokeStyle = `rgba(228, 226, 223, ${closeness * 0.55})`;
                    ctx.lineWidth = 1 + closeness * 1.5;
                    ctx.beginPath();
                    ctx.moveTo(xA, trackAY);
                    ctx.lineTo(xB, trackBY);
                    ctx.stroke();

                    // Soft glow on both pulses
                    const g = closeness * 0.6;
                    ctx.fillStyle = `rgba(228, 226, 223, ${g})`;
                    ctx.beginPath();
                    ctx.arc(xA, trackAY, 9, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(xB, trackBY, 9, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Phase indicator bar (progress 0..1)
            const pbY = 126;
            const pbW = W - padX * 2;
            ctx.strokeStyle = colorGrid;
            ctx.strokeRect(padX, pbY, pbW, 4);
            ctx.fillStyle = 'rgba(201, 169, 110, 0.85)';
            ctx.fillRect(padX, pbY, pbW * phaseDiff, 4);
            ctx.fillStyle = colorText;
            ctx.font = '10px "DM Sans", system-ui, sans-serif';
            ctx.fillText('phase drift ε·t (mod 1)', padX, pbY - 4);

            // ====== SECTION 2: Sine waves + sum (acoustic beating) ======
            const waveTop = 150;
            ctx.fillStyle = colorText;
            ctx.font = '11px "DM Sans", system-ui, sans-serif';
            ctx.fillText('Wave view — the identical math of two tones beating', padX, waveTop);

            const wLeft = padX;
            const wRight = W - padX;
            const wWidth = wRight - wLeft;
            const samples = Math.max(160, Math.floor(wWidth / 3));

            const f1 = 3.0;   // visual cycles across view
            const f2 = 3.35;
            const scroll = t * 0.35;

            // Upper strip: two waves overlaid
            const topBand = waveTop + 14;
            const topMid = topBand + 26;
            const topAmp = 20;

            // Wave A
            ctx.strokeStyle = colorA;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            for (let i = 0; i <= samples; i++) {
                const x = wLeft + (i / samples) * wWidth;
                const u = (i / samples) * 4 - scroll;
                const y = topMid + Math.sin(2 * Math.PI * f1 * u) * topAmp;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Wave B
            ctx.strokeStyle = colorB;
            ctx.beginPath();
            for (let i = 0; i <= samples; i++) {
                const x = wLeft + (i / samples) * wWidth;
                const u = (i / samples) * 4 - scroll;
                const y = topMid + Math.sin(2 * Math.PI * f2 * u) * topAmp;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Lower strip: sum with visible envelope
            const sumMid = topMid + 74;
            const sumAmp = 18;

            // Envelope (dashed)
            ctx.strokeStyle = 'rgba(228, 226, 223, 0.28)';
            ctx.setLineDash([3, 4]);
            ctx.lineWidth = 1;
            for (const sign of [1, -1]) {
                ctx.beginPath();
                for (let i = 0; i <= samples; i++) {
                    const x = wLeft + (i / samples) * wWidth;
                    const u = (i / samples) * 4 - scroll;
                    const env = Math.abs(Math.cos(Math.PI * (f1 - f2) * u));
                    const y = sumMid + sign * env * sumAmp * 2;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            ctx.setLineDash([]);

            // Sum wave
            ctx.strokeStyle = colorSum;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            for (let i = 0; i <= samples; i++) {
                const x = wLeft + (i / samples) * wWidth;
                const u = (i / samples) * 4 - scroll;
                const y1 = Math.sin(2 * Math.PI * f1 * u);
                const y2 = Math.sin(2 * Math.PI * f2 * u);
                const y = sumMid + (y1 + y2) * sumAmp;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Center reference line
            ctx.strokeStyle = colorGrid;
            ctx.beginPath();
            ctx.moveTo(wLeft, sumMid);
            ctx.lineTo(wRight, sumMid);
            ctx.stroke();

            rafId = requestAnimationFrame(draw);
        }

        rafId = requestAnimationFrame(draw);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
        };
    }

    function showMusic(seg) {
        showPanel('music');
        trackTitle.textContent = seg.title;
        trackArtist.textContent = seg.artist || '';
        trackAlbum.textContent = seg.album || '';
        trackContext.textContent = seg.context || '';
        if (!musicVideoId(seg)) showFallback(seg);
        else if (playerWrapper.querySelector('.spotify-fallback')) {
            playerWrapper.innerHTML = '<div id="youtube-player"></div>';
        }
    }

    function updateTransport() {
        if (currentSegIdx >= 0 && currentSegIdx < currentSegments.length) {
            const seg = currentSegments[currentSegIdx];
            segTypeIcon.className = seg.type;
            segmentName.textContent = seg.title;
            segCounter.textContent = `${currentSegIdx + 1} / ${currentSegments.length}`;
        } else {
            segTypeIcon.className = '';
            segmentName.textContent = 'Ready';
            segCounter.textContent = `0 / ${currentSegments.length}`;
        }
    }

    function updatePlayIcon() {
        iconPlay.classList.toggle('hidden', isPlaying);
        iconPause.classList.toggle('hidden', !isPlaying);
        playPauseBtn.title = isPlaying ? 'Pause' : 'Play';
        playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    }

    // --- Narration Audio ---
    // Get the MP3 filename for a narration segment (using original narration index)
    function getAudioFile(sessionIdx, segIdx) {
        return CourseUtils.audioPath(activeCourse(), sessionIdx, currentSegments[segIdx]._narIdx);
    }

    function clearNarrationStartTimer() {
        if (narrationStartTimer !== null) clearTimeout(narrationStartTimer);
        narrationStartTimer = null;
    }

    function playNarrationAudio(audio) {
        const attempt = audio.play();
        if (attempt?.catch) attempt.catch(() => {
            if (narrationAudio === audio && isPlaying) {
                isPlaying = false;
                updatePlayIcon();
                segmentName.textContent = 'Press play to start narration';
            }
        });
    }

    function speakNarration(seg) {
        stopNarrationAudio();
        cancelSpeech();
        const generation = narrationGeneration;
        const audio = new Audio(getAudioFile(currentSessionIdx, currentSegIdx));
        narrationAudio = audio;
        const start = () => {
            if (generation !== narrationGeneration || !isPlaying) return;
            if (narrationFallback) {
                narrationFallback = null;
                speakNarrationTTS(seg);
            } else if (narrationAudio === audio) playNarrationAudio(audio);
        };
        audio.onended = () => {
            if (generation !== narrationGeneration || narrationAudio !== audio) return;
            narrationAudio = null;
            if (isPlaying) advanceSegment();
        };
        audio.onerror = () => {
            if (generation !== narrationGeneration || narrationAudio !== audio) return;
            narrationAudio = null;
            narrationFallback = seg;
            // Preserve the opening pause even when a recording is missing.
            if (narrationStartTimer === null) start();
        };
        narrationStartTimer = setTimeout(() => {
            narrationStartTimer = null;
            start();
        }, CourseUtils.leadPauseSeconds * 1000);
        audio.load();
    }

    function speakNarrationTTS(seg) {
        cancelSpeech();
        const chunks = splitTextForTTS(seg.speechText || seg.text);
        speakChunks(chunks, 0);
    }

    function splitTextForTTS(text) {
        const paragraphs = text.split('\n\n').filter(p => p.trim());
        const chunks = [];
        for (const para of paragraphs) {
            if (para.length < 300) {
                chunks.push(para.trim());
            } else {
                const sentences = para.match(/[^.!?]+(?:[.!?]+|$)/g) || [para];
                let current = '';
                for (const s of sentences) {
                    if ((current + s).length > 400 && current) {
                        chunks.push(current.trim());
                        current = s;
                    } else {
                        current += s;
                    }
                }
                if (current.trim()) chunks.push(current.trim());
            }
        }
        return chunks;
    }

    function speakChunks(chunks, idx) {
        if (idx >= chunks.length) {
            speakingUtterance = null;
            if (isPlaying) advanceSegment();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[idx]);
        utterance.rate = speechRate;
        utterance.pitch = 1.0;
        if (selectedVoice) utterance.voice = selectedVoice;
        const generation = narrationGeneration;
        utterance.onend = () => {
            if (generation !== narrationGeneration) return;
            speakChunks(chunks, idx + 1);
        };
        utterance.onerror = (e) => {
            if (generation === narrationGeneration && e.error !== 'canceled' && e.error !== 'interrupted') {
                speakChunks(chunks, idx + 1);
            }
        };
        speakingUtterance = utterance;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    function resumeOrStartNarration(seg) {
        // Resume MP3 if paused
        if (narrationAudio && narrationAudio.paused) {
            clearNarrationStartTimer();
            playNarrationAudio(narrationAudio);
            return;
        }
        if (narrationFallback) {
            clearNarrationStartTimer();
            narrationFallback = null;
            speakNarrationTTS(seg);
            return;
        }
        // Resume browser TTS if paused
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
            return;
        }
        // Otherwise start fresh
        if (!narrationAudio && (!speakingUtterance || !speechSynthesis.speaking)) {
            speakNarration(seg);
        }
    }

    function pauseSpeech() {
        clearNarrationStartTimer();
        if (narrationAudio && !narrationAudio.paused) {
            narrationAudio.pause();
        }
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
    }

    function cancelSpeech() {
        speechSynthesis.cancel();
        speakingUtterance = null;
    }

    function stopNarrationAudio() {
        narrationGeneration++;
        clearNarrationStartTimer();
        narrationFallback = null;
        if (narrationAudio) {
            narrationAudio.onended = null;
            narrationAudio.onerror = null;
            narrationAudio.pause();
            narrationAudio.removeAttribute('src');
            narrationAudio = null;
        }
    }

    // --- YouTube Playback ---
    let ytPlayer = null;
    let ytReady = false;
    let ytAPILoaded = false;
    let pendingVideo = null;
    let loadedVideoId = null;

    function ensureYouTubeAPI() {
        if (ytAPILoaded) return;
        ytAPILoaded = true;
        if (window.YT?.Player) {
            window.onYouTubeIframeAPIReady();
            return;
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = function () {
        ytPlayer = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                fs: 1,
            },
            events: {
                onReady: () => {
                    ytReady = true;
                    if (pendingVideo && isPlaying) {
                        loadAndPlayYT(pendingVideo.id, pendingVideo.start, pendingVideo.end);
                        pendingVideo = null;
                    }
                },
                onError: () => {
                    const seg = currentSegments[currentSegIdx];
                    if (seg?.type === 'music') showFallback(seg);
                },
                onStateChange: (e) => {
                    if (e.data === YT.PlayerState.ENDED && isPlaying) {
                        advanceSegment();
                    }
                },
            },
        });
    };

    function musicVideoId(seg) {
        return activeCourse().youtubeIds[seg.title] || seg.youtubeId;
    }

    function playMusicTrack(seg) {

        const ytId = musicVideoId(seg);
        if (!ytId) {
            showFallback(seg);
            return;
        }

        ensureYouTubeAPI();
        if (!ytReady) {
            pendingVideo = { id: ytId, start: seg.startSeconds || 0, end: seg.endSeconds };
            return;
        }

        loadAndPlayYT(ytId, seg.startSeconds || 0, seg.endSeconds);
    }

    function loadAndPlayYT(videoId, startSeconds, endSeconds) {
        if (!ytPlayer || !ytReady) return;
        const opts = { videoId, startSeconds: startSeconds || 0 };
        if (endSeconds) opts.endSeconds = endSeconds;
        loadedVideoId = videoId;
        ytPlayer.loadVideoById(opts);
    }

    function pauseYouTube() {
        if (ytPlayer && ytReady && typeof ytPlayer.pauseVideo === 'function') {
            ytPlayer.pauseVideo();
        }
    }

    function resumeYouTube() {
        if (ytPlayer && ytReady && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
        }
    }

    function stopYouTube() {
        pendingVideo = null;
        loadedVideoId = null;
        if (ytPlayer && ytReady && typeof ytPlayer.stopVideo === 'function') {
            ytPlayer.stopVideo();
        }
    }

    function showFallback(seg) {
        const searchQ = encodeURIComponent(`${seg.title} ${seg.artist || ''}`);
        const wrapper = $('#player-wrapper');
        if (ytPlayer?.destroy) ytPlayer.destroy();
        pendingVideo = null;
        wrapper.innerHTML = `
            <div class="spotify-fallback">
                <p style="color:var(--text-secondary);">This track needs to be played manually.</p>
                ${seg.sourceUrl ? `<a href="${seg.sourceUrl}" target="_blank" rel="noopener noreferrer">Open recording / reference</a>` : ''}
                <a href="https://www.youtube.com/results?search_query=${searchQ}" target="_blank" rel="noopener noreferrer">Search on YouTube</a>
                <button class="skip-btn" onclick="window.__skipSegment()">Skip to next &rarr;</button>
            </div>
            <div id="youtube-player"></div>
        `;
        // Recreate the YT player div for next use
        ytPlayer = null;
        ytReady = false;
        ytAPILoaded = false;
    }

    window.__skipSegment = function () {
        if (isPlaying) advanceSegment();
        else nextSegment();
    };

    // --- Voice modal ---
    function loadVoices() {
        const populateVoices = () => {
            const voices = speechSynthesis.getVoices();
            const english = voices.filter(v => v.lang.startsWith('en'));
            const toShow = english.length ? english : voices;
            voiceSelect.innerHTML = toShow.map(v =>
                `<option value="${v.voiceURI}" ${v.default ? 'selected' : ''}>${v.name} (${v.lang})</option>`
            ).join('');
            const saved = localStorage.getItem('raa-voice');
            if (saved) {
                const match = voices.find(v => v.voiceURI === saved);
                if (match) {
                    selectedVoice = match;
                    voiceSelect.value = saved;
                }
            }
        };

        populateVoices();
        speechSynthesis.addEventListener('voiceschanged', populateVoices);
    }

    function openVoiceModal() { voiceModal.classList.add('open'); }
    function closeVoiceModal() { voiceModal.classList.remove('open'); }

    function testVoice() {
        cancelSpeech();
        const utt = new SpeechSynthesisUtterance('The three-two cross-rhythm is the foundation of all West African polyrhythmic texture.');
        utt.rate = speechRate;
        if (selectedVoice) utt.voice = selectedVoice;
        speechSynthesis.speak(utt);
    }

    // --- Preferences ---
    function savePrefs() {
        localStorage.setItem('raa-rate', speechRate);
        if (selectedVoice) localStorage.setItem('raa-voice', selectedVoice.voiceURI);
    }

    function loadPrefs() {
        const rate = localStorage.getItem('raa-rate');
        if (rate) {
            speechRate = parseFloat(rate);
            rateSlider.value = speechRate;
            rateValue.textContent = speechRate.toFixed(1) + 'x';
        }
    }

    // --- Boot ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
