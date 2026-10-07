/* ============================================
   Polyrhythm Visualizer
   ============================================ */

(function () {
    'use strict';

    // --- Constants ---
    const LAYER_COLORS = ['#c9a96e', '#6ea5c9', '#7ec96e', '#c96ea5', '#c97a6e', '#9e6ec9', '#c9c26e', '#6ec9b8'];
    const MAX_LAYERS = 8;
    const SOUNDS = ['click', 'kick', 'snare', 'hihat', 'tone'];
    const PRESETS = {
        '3:2':   [3, 2],
        '4:3':   [4, 3],
        '5:4':   [5, 4],
        '5:3':   [5, 3],
        '7:4':   [7, 4],
        '7:8':   [7, 8],
        '3:4:5': [3, 4, 5],
        '2:3:4': [2, 3, 4],
        '3:4:5:7': [3, 4, 5, 7],
    };
    const TONE_FREQS = [261.6, 329.6, 392.0, 523.3, 659.3, 784.0, 1047, 1319]; // C4, E4, G4, C5...

    // --- State ---
    const state = {
        playing: false,
        bpm: 120,
        swing: 0,
        masterVol: 0.8,
        layers: [
            { beats: 3, sound: 'click', volume: 80, muted: false, accent: true },
            { beats: 2, sound: 'kick',  volume: 80, muted: false, accent: true },
        ],
        // Audio
        audioCtx: null,
        masterGain: null,
        schedulerTimer: null,
        nextCycleTime: 0,
        // Rendering
        animFrameId: null,
        beatFlashes: [],
        noiseBuffer: null,
    };

    // --- DOM refs ---
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // --- Math helpers ---
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    function lcm(a, b) { return (a * b) / gcd(a, b); }
    function lcmArray(arr) { return arr.reduce((a, b) => lcm(a, b)); }

    function getCycleDuration() {
        // Cycle = time for the first layer to complete all its beats
        return (60 / state.bpm) * state.layers[0].beats;
    }

    function getRatioString() {
        return state.layers.map(l => l.beats).join(' : ');
    }

    // =============================================
    // AUDIO ENGINE
    // =============================================

    function initAudio() {
        if (state.audioCtx) return;
        state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        state.masterGain = state.audioCtx.createGain();
        state.masterGain.gain.value = state.masterVol;
        state.masterGain.connect(state.audioCtx.destination);

        // Pre-generate noise buffer for snare/hihat
        const sr = state.audioCtx.sampleRate;
        state.noiseBuffer = state.audioCtx.createBuffer(1, sr * 0.5, sr);
        const data = state.noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }

    function playKick(time, vol) {
        const ctx = state.audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        osc.connect(gain);
        gain.connect(state.masterGain);
        osc.start(time);
        osc.stop(time + 0.35);
    }

    function playSnare(time, vol) {
        const ctx = state.audioCtx;
        // Tone component
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.1);
        oscGain.gain.setValueAtTime(vol * 0.6, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
        osc.connect(oscGain);
        oscGain.connect(state.masterGain);
        osc.start(time);
        osc.stop(time + 0.15);

        // Noise component
        const noise = ctx.createBufferSource();
        noise.buffer = state.noiseBuffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 3000;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(vol * 0.8, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(state.masterGain);
        noise.start(time);
        noise.stop(time + 0.2);
    }

    function playHihat(time, vol) {
        const ctx = state.audioCtx;
        const noise = ctx.createBufferSource();
        noise.buffer = state.noiseBuffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 8000;
        filter.Q.value = 1;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(vol * 0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(state.masterGain);
        noise.start(time);
        noise.stop(time + 0.08);
    }

    function playClick(time, vol, isAccent) {
        const ctx = state.audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = isAccent ? 1000 : 800;
        gain.gain.setValueAtTime(vol * (isAccent ? 1 : 0.6), time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
        osc.connect(gain);
        gain.connect(state.masterGain);
        osc.start(time);
        osc.stop(time + 0.05);
    }

    function playTone(time, vol, layerIdx, isAccent) {
        const ctx = state.audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = TONE_FREQS[layerIdx % TONE_FREQS.length];
        const v = vol * (isAccent ? 1 : 0.7);
        gain.gain.setValueAtTime(v, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        osc.connect(gain);
        gain.connect(state.masterGain);
        osc.start(time);
        osc.stop(time + 0.18);
    }

    function scheduleBeat(layer, layerIdx, beatIdx, time) {
        const vol = layer.volume / 100;
        const isAccent = layer.accent && beatIdx === 0;

        switch (layer.sound) {
            case 'kick':  playKick(time, vol); break;
            case 'snare': playSnare(time, vol); break;
            case 'hihat': playHihat(time, vol); break;
            case 'click': playClick(time, vol, isAccent); break;
            case 'tone':  playTone(time, vol, layerIdx, isAccent); break;
        }

        // Record flash for canvas
        state.beatFlashes.push({ layerIdx, beatIdx, time });
    }

    function scheduler() {
        if (!state.playing) return;
        const ctx = state.audioCtx;
        const cycleDuration = getCycleDuration();
        const lookaheadEnd = ctx.currentTime + 0.1;

        while (state.nextCycleTime < lookaheadEnd) {
            for (let li = 0; li < state.layers.length; li++) {
                const layer = state.layers[li];
                if (layer.muted) continue;
                const beatInterval = cycleDuration / layer.beats;
                for (let bi = 0; bi < layer.beats; bi++) {
                    let beatTime = state.nextCycleTime + bi * beatInterval;
                    // Swing: shift odd-indexed beats
                    if (state.swing > 0 && bi % 2 === 1) {
                        beatTime += beatInterval * (state.swing / 100) * 0.5;
                    }
                    if (beatTime >= ctx.currentTime && beatTime < lookaheadEnd) {
                        scheduleBeat(layer, li, bi, beatTime);
                    }
                }
            }
            state.nextCycleTime += cycleDuration;
        }

        state.schedulerTimer = setTimeout(scheduler, 25);
    }

    function startPlayback() {
        initAudio();
        if (state.audioCtx.state === 'suspended') {
            state.audioCtx.resume();
        }
        state.playing = true;
        state.nextCycleTime = state.audioCtx.currentTime;
        state.beatFlashes = [];
        scheduler();
        startRendering();
        updatePlayButton();
    }

    function stopPlayback() {
        state.playing = false;
        clearTimeout(state.schedulerTimer);
        updatePlayButton();
    }

    function resetScheduler() {
        if (state.playing) {
            clearTimeout(state.schedulerTimer);
            state.nextCycleTime = state.audioCtx.currentTime;
            state.beatFlashes = [];
            scheduler();
        }
    }

    // =============================================
    // CANVAS RENDERER
    // =============================================

    let canvas, canvasCtx, dpr;

    function initCanvas() {
        canvas = $('#viz-canvas');
        canvasCtx = canvas.getContext('2d');
        dpr = window.devicePixelRatio || 1;
        resizeCanvas();
        new ResizeObserver(resizeCanvas).observe(canvas.parentElement);
    }

    function resizeCanvas() {
        const wrap = canvas.parentElement;
        const size = Math.min(wrap.clientWidth, wrap.clientHeight);
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        canvas.width = size * dpr;
        canvas.height = size * dpr;
    }

    function startRendering() {
        if (state.animFrameId) return;
        drawFrame();
    }

    function stopRendering() {
        if (state.animFrameId) {
            cancelAnimationFrame(state.animFrameId);
            state.animFrameId = null;
        }
    }

    function drawFrame() {
        state.animFrameId = requestAnimationFrame(drawFrame);

        const ctx = canvasCtx;
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.min(cx, cy) * 0.85;
        const now = state.audioCtx ? state.audioCtx.currentTime : 0;

        // Clear with trail
        ctx.fillStyle = 'rgba(8, 8, 15, 0.25)';
        ctx.fillRect(0, 0, w, h);

        // Prune old flashes
        state.beatFlashes = state.beatFlashes.filter(f => now - f.time < 0.5);

        // Cycle progress
        const cycleDuration = getCycleDuration();
        let cycleProgress = 0;
        if (state.playing && state.audioCtx) {
            cycleProgress = ((now - state.nextCycleTime + cycleDuration) % cycleDuration) / cycleDuration;
        }

        const numLayers = state.layers.length;
        const ringSpacing = maxR / (numLayers + 0.5);

        for (let li = 0; li < numLayers; li++) {
            const layer = state.layers[li];
            const color = LAYER_COLORS[li % LAYER_COLORS.length];
            const radius = ringSpacing * (li + 1);
            const alpha = layer.muted ? 0.15 : 1;

            // Draw orbit ring
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = hexAlpha(color, 0.15 * alpha);
            ctx.lineWidth = 1.5 * dpr;
            ctx.stroke();

            // Draw beat dots
            for (let bi = 0; bi < layer.beats; bi++) {
                const angle = (bi / layer.beats) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;

                // Flash intensity
                const flash = getFlashIntensity(li, bi, now);
                const dotR = (4 + flash * 6) * dpr;

                ctx.save();
                if (flash > 0.05) {
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 20 * flash * dpr;
                }
                ctx.beginPath();
                ctx.arc(x, y, dotR, 0, Math.PI * 2);
                ctx.fillStyle = hexAlpha(color, (0.3 + flash * 0.7) * alpha);
                ctx.fill();
                ctx.restore();

                // Accent ring on beat 0
                if (bi === 0 && layer.accent) {
                    ctx.beginPath();
                    ctx.arc(x, y, (dotR + 3 * dpr), 0, Math.PI * 2);
                    ctx.strokeStyle = hexAlpha(color, 0.3 * alpha);
                    ctx.lineWidth = 1 * dpr;
                    ctx.stroke();
                }
            }

            // Orbiting playhead
            if (state.playing && !layer.muted) {
                const phAngle = cycleProgress * Math.PI * 2 - Math.PI / 2;
                const px = cx + Math.cos(phAngle) * radius;
                const py = cy + Math.sin(phAngle) * radius;
                ctx.beginPath();
                ctx.arc(px, py, 3 * dpr, 0, Math.PI * 2);
                ctx.fillStyle = hexAlpha(color, 0.7);
                ctx.fill();
            }
        }

        // Center text
        ctx.fillStyle = '#e4e2df';
        ctx.font = `600 ${16 * dpr}px 'DM Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(getRatioString(), cx, cy - 10 * dpr);
        ctx.font = `${13 * dpr}px 'DM Sans', sans-serif`;
        ctx.fillStyle = '#8888a0';
        ctx.fillText(`${state.bpm} BPM`, cx, cy + 10 * dpr);
    }

    function getFlashIntensity(layerIdx, beatIdx, now) {
        let max = 0;
        for (const f of state.beatFlashes) {
            if (f.layerIdx === layerIdx && f.beatIdx === beatIdx) {
                const elapsed = now - f.time;
                if (elapsed >= 0 && elapsed < 0.3) {
                    max = Math.max(max, 1 - elapsed / 0.3);
                }
            }
        }
        return max;
    }

    function hexAlpha(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // Draw a static frame when not playing
    function drawStaticFrame() {
        const ctx = canvasCtx;
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.min(cx, cy) * 0.85;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#08080f';
        ctx.fillRect(0, 0, w, h);

        const numLayers = state.layers.length;
        const ringSpacing = maxR / (numLayers + 0.5);

        for (let li = 0; li < numLayers; li++) {
            const layer = state.layers[li];
            const color = LAYER_COLORS[li % LAYER_COLORS.length];
            const radius = ringSpacing * (li + 1);
            const alpha = layer.muted ? 0.15 : 1;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = hexAlpha(color, 0.15 * alpha);
            ctx.lineWidth = 1.5 * dpr;
            ctx.stroke();

            for (let bi = 0; bi < layer.beats; bi++) {
                const angle = (bi / layer.beats) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                const dotR = 4 * dpr;

                ctx.beginPath();
                ctx.arc(x, y, dotR, 0, Math.PI * 2);
                ctx.fillStyle = hexAlpha(color, 0.35 * alpha);
                ctx.fill();

                if (bi === 0 && layer.accent) {
                    ctx.beginPath();
                    ctx.arc(x, y, dotR + 3 * dpr, 0, Math.PI * 2);
                    ctx.strokeStyle = hexAlpha(color, 0.3 * alpha);
                    ctx.lineWidth = 1 * dpr;
                    ctx.stroke();
                }
            }
        }

        ctx.fillStyle = '#e4e2df';
        ctx.font = `600 ${16 * dpr}px 'DM Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(getRatioString(), cx, cy - 10 * dpr);
        ctx.font = `${13 * dpr}px 'DM Sans', sans-serif`;
        ctx.fillStyle = '#8888a0';
        ctx.fillText(`${state.bpm} BPM`, cx, cy + 10 * dpr);
    }

    // =============================================
    // UI CONTROLLER
    // =============================================

    function renderLayers() {
        const container = $('#viz-layers');
        container.innerHTML = state.layers.map((layer, i) => {
            const color = LAYER_COLORS[i % LAYER_COLORS.length];
            const soundOptions = SOUNDS.map(s =>
                `<option value="${s}" ${layer.sound === s ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
            ).join('');
            return `
                <div class="viz-layer" style="--layer-color: ${color}" data-idx="${i}">
                    <div class="viz-layer-header">
                        <span class="viz-layer-dot"></span>
                        <span class="viz-layer-label">Layer ${i + 1}</span>
                        <button class="viz-layer-mute ${layer.muted ? 'active' : ''}" title="Mute">M</button>
                        ${state.layers.length > 1 ? `<button class="viz-layer-remove" title="Remove">&times;</button>` : ''}
                    </div>
                    <div class="viz-layer-controls">
                        <div class="viz-setting-row">
                            <label>Beats: <strong>${layer.beats}</strong></label>
                            <input type="range" class="viz-beats-slider" min="2" max="16" value="${layer.beats}">
                        </div>
                        <div class="viz-setting-row">
                            <label>Sound</label>
                            <select class="viz-sound-select">${soundOptions}</select>
                        </div>
                        <div class="viz-setting-row">
                            <label>Vol: ${layer.volume}%</label>
                            <input type="range" class="viz-vol-slider" min="0" max="100" value="${layer.volume}">
                        </div>
                        <label class="viz-checkbox">
                            <input type="checkbox" class="viz-accent-check" ${layer.accent ? 'checked' : ''}> Accent 1st
                        </label>
                    </div>
                </div>
            `;
        }).join('');

        // Bind layer events
        container.querySelectorAll('.viz-layer').forEach(el => {
            const idx = parseInt(el.dataset.idx);

            el.querySelector('.viz-beats-slider').addEventListener('input', e => {
                state.layers[idx].beats = parseInt(e.target.value);
                $('#viz-preset').value = 'custom';
                onLayerChange();
            });

            el.querySelector('.viz-sound-select').addEventListener('change', e => {
                state.layers[idx].sound = e.target.value;
            });

            el.querySelector('.viz-vol-slider').addEventListener('input', e => {
                state.layers[idx].volume = parseInt(e.target.value);
                renderLayers();
            });

            el.querySelector('.viz-accent-check').addEventListener('change', e => {
                state.layers[idx].accent = e.target.checked;
            });

            el.querySelector('.viz-layer-mute').addEventListener('click', () => {
                state.layers[idx].muted = !state.layers[idx].muted;
                renderLayers();
                if (!state.playing) drawStaticFrame();
            });

            const removeBtn = el.querySelector('.viz-layer-remove');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    state.layers.splice(idx, 1);
                    $('#viz-preset').value = 'custom';
                    onLayerChange();
                });
            }
        });

        updateAddButton();
    }

    function onLayerChange() {
        renderLayers();
        updateCycleInfo();
        resetScheduler();
        if (!state.playing) drawStaticFrame();
    }

    function updateCycleInfo() {
        const beats = state.layers.map(l => l.beats);
        const l = lcmArray(beats);
        const ratio = beats.join(':');
        const cycleSec = getCycleDuration().toFixed(2);
        $('#viz-cycle-info').textContent = `${ratio} polyrhythm \u00b7 LCM = ${l} \u00b7 Cycle: ${cycleSec}s`;
    }

    function updateAddButton() {
        const btn = $('#viz-add-layer');
        btn.disabled = state.layers.length >= MAX_LAYERS;
        btn.style.opacity = state.layers.length >= MAX_LAYERS ? '0.4' : '1';
    }

    function updatePlayButton() {
        $('#viz-icon-play').classList.toggle('hidden', state.playing);
        $('#viz-icon-pause').classList.toggle('hidden', !state.playing);
    }

    function applyPreset(key) {
        const beats = PRESETS[key];
        if (!beats) return;
        state.layers = beats.map((b, i) => ({
            beats: b,
            sound: i === 0 ? 'click' : (i === 1 ? 'kick' : SOUNDS[i % SOUNDS.length]),
            volume: 80,
            muted: false,
            accent: true,
        }));
        onLayerChange();
    }

    // Tap tempo
    let tapTimes = [];
    function handleTap() {
        const now = performance.now();
        tapTimes.push(now);
        if (tapTimes.length > 5) tapTimes.shift();
        if (tapTimes.length >= 2) {
            const intervals = [];
            for (let i = 1; i < tapTimes.length; i++) {
                intervals.push(tapTimes[i] - tapTimes[i - 1]);
            }
            const avg = intervals.reduce((a, b) => a + b) / intervals.length;
            const bpm = Math.round(60000 / avg);
            state.bpm = Math.max(30, Math.min(300, bpm));
            $('#viz-bpm').value = state.bpm;
            $('#viz-bpm-val').textContent = state.bpm;
            updateCycleInfo();
            resetScheduler();
        }
        // Reset if gap > 2s
        if (tapTimes.length >= 2 && tapTimes[tapTimes.length - 1] - tapTimes[tapTimes.length - 2] > 2000) {
            tapTimes = [now];
        }
    }

    // =============================================
    // NAVIGATION & EVENTS
    // =============================================

    function openVisualizer() {
        $('#home-view').classList.remove('active');
        $('#visualizer-view').classList.add('active');
        initCanvas();
        drawStaticFrame();
        renderLayers();
        updateCycleInfo();
    }

    function closeVisualizer() {
        stopPlayback();
        stopRendering();
        $('#visualizer-view').classList.remove('active');
        $('#home-view').classList.add('active');
    }

    function bindEvents() {
        $('#open-visualizer').addEventListener('click', openVisualizer);
        $('#viz-back-btn').addEventListener('click', closeVisualizer);

        $('#viz-play').addEventListener('click', () => {
            if (state.playing) stopPlayback();
            else startPlayback();
        });

        $('#viz-bpm').addEventListener('input', e => {
            state.bpm = parseInt(e.target.value);
            $('#viz-bpm-val').textContent = state.bpm;
            updateCycleInfo();
            resetScheduler();
            if (!state.playing) drawStaticFrame();
        });

        $('#viz-swing').addEventListener('input', e => {
            state.swing = parseInt(e.target.value);
            $('#viz-swing-val').textContent = state.swing + '%';
        });

        $('#viz-master-vol').addEventListener('input', e => {
            state.masterVol = parseInt(e.target.value) / 100;
            $('#viz-master-vol-val').textContent = parseInt(e.target.value) + '%';
            if (state.masterGain) state.masterGain.gain.value = state.masterVol;
        });

        $('#viz-preset').addEventListener('change', e => {
            if (e.target.value !== 'custom') applyPreset(e.target.value);
        });

        $('#viz-add-layer').addEventListener('click', () => {
            if (state.layers.length >= MAX_LAYERS) return;
            const nextBeats = [2, 3, 4, 5, 7, 6, 8, 9];
            const used = new Set(state.layers.map(l => l.beats));
            const beats = nextBeats.find(b => !used.has(b)) || 3;
            state.layers.push({
                beats,
                sound: SOUNDS[state.layers.length % SOUNDS.length],
                volume: 80,
                muted: false,
                accent: true,
            });
            $('#viz-preset').value = 'custom';
            onLayerChange();
        });

        $('#viz-tap-tempo').addEventListener('click', handleTap);

        // Keyboard shortcuts when visualizer is active
        document.addEventListener('keydown', e => {
            if (!$('#visualizer-view').classList.contains('active')) return;
            if (e.code === 'Space') {
                e.preventDefault();
                if (state.playing) stopPlayback();
                else startPlayback();
            }
            if (e.code === 'Escape') closeVisualizer();
        });
    }

    // --- Boot ---
    function boot() {
        bindEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
