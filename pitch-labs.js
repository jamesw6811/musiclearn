/* Two local listening labs. All audio is synthesized in the browser. */
(() => {
    'use strict';
    const $ = selector => document.querySelector(selector);
    const view = $('#pitch-lab-view');
    const canvas = $('#lab-canvas');
    const controls = $('#lab-controls');
    const playButton = $('#lab-play');
    const harmonicCount = 12;
    const intervals = {
        fifth: { name: 'Fifth · 3:2', ratio: 3 / 2, semitones: 7, lower: 3, upper: 2 },
        third: { name: 'Major third · 5:4', ratio: 5 / 4, semitones: 4, lower: 5, upper: 4 },
        seventh: { name: 'Harmonic seventh · 7:4', ratio: 7 / 4, semitones: 10, lower: 7, upper: 4 },
        eleventh: { name: 'Eleventh harmonic · 11:8', ratio: 11 / 8, semitones: 6, lower: 11, upper: 8 }
    };
    let lab = 'harmonics';
    let fundamental = 110;
    let amplitudes = Array.from({ length: harmonicCount }, (_, i) => 1 / (i + 1));
    let solo = 0;
    let mode = 'interval';
    let intervalKey = 'third';
    let tuning = 'pure';
    let cents = 0;
    let difference = 2;
    let rich = true;
    let context, master, voiceGain;
    let oscillators = [];
    let playing = false;
    let generation = 0;

    const range = (id, label, min, max, value, step = 1) => `<label class="lab-control" for="${id}">${label}<input id="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}"></label>`;
    function openLab(kind) {
        stop();
        lab = kind;
        fundamental = Math.max(lab === 'tuning' ? 80 : 55, Math.min(lab === 'tuning' ? 260 : 330, fundamental));
        window.scrollTo(0, 0);
        $('#home-view').classList.remove('active');
        view.classList.add('active');
        $('#lab-title').textContent = lab === 'harmonics' ? 'Build a note' : 'Tuning & beating';
        $('#lab-intro').textContent = lab === 'harmonics'
            ? 'A note can contain many sine waves. Change the recipe, then isolate an upper harmonic to hear a pitch hidden inside the timbre.'
            : 'Hold a drone and compare interval relationships. Harmonic-rich tones reveal beating between upper partials; nearby sine tones make the beat rate easy to count.';
        $('#lab-experiment').textContent = lab === 'harmonics'
            ? 'Try this: play the saw recipe, remove the even harmonics with Square, then select harmonic 7 in the isolate menu. Return to the full note and try to hear that pitch inside it. These recipes stop at harmonic 12, so they are approximations of ideal waveforms.'
            : 'Try this: choose Major third, play Pure ratio, then Piano tuning. The lower note’s fifth partial and the upper note’s fourth drift apart. Next choose Nearby sine tones: move 2 Hz slowly toward 0 Hz and count the pulses as they stop.';
        renderControls();
        redraw();
    }
    function renderControls() {
        if (lab === 'harmonics') {
            controls.innerHTML = `${range('lab-root', 'Fundamental', 55, 330, fundamental)}<p id="lab-root-value" class="lab-value"></p>
                <div class="lab-presets" role="group" aria-label="Harmonic recipes"><button class="btn secondary" data-recipe="sine">Sine</button><button class="btn secondary" data-recipe="saw">Saw</button><button class="btn secondary" data-recipe="square">Square</button></div>
                <label class="lab-control" for="lab-solo">Isolate a harmonic<select id="lab-solo"><option value="0">Full note</option>${amplitudes.map((_, i) => `<option value="${i + 1}" ${solo === i + 1 ? 'selected' : ''}>Harmonic ${i + 1} · ${(i + 1) * fundamental} Hz</option>`).join('')}</select></label>
                <div class="harmonic-sliders">${amplitudes.map((a, i) => range(`partial-${i}`, `H${i + 1} <output id="partial-value-${i}">${Math.round(a * 100)}%</output>`, 0, 100, Math.round(a * 100))).join('')}</div>`;
            $('#lab-root').oninput = event => { fundamental = Number(event.target.value); update(); };
            $('#lab-solo').onchange = event => { solo = Number(event.target.value); update(); };
            controls.querySelectorAll('[data-recipe]').forEach(button => button.onclick = () => {
                solo = 0;
                amplitudes = amplitudes.map((_, i) => button.dataset.recipe === 'sine' ? Number(i === 0) : button.dataset.recipe === 'square' && i % 2 ? 0 : 1 / (i + 1));
                renderControls(); update();
            });
            amplitudes.forEach((_, i) => $(`#partial-${i}`).oninput = event => {
                amplitudes[i] = Number(event.target.value) / 100;
                $(`#partial-value-${i}`).textContent = `${event.target.value}%`;
                update();
            });
        } else {
            controls.innerHTML = `<label class="lab-control" for="lab-mode">Experiment<select id="lab-mode"><option value="interval" ${mode === 'interval' ? 'selected' : ''}>Drone + interval</option><option value="nearby" ${mode === 'nearby' ? 'selected' : ''}>Nearby sine tones</option></select></label>
                ${range('lab-root', 'Drone / first tone', 80, 260, fundamental)}<p id="lab-root-value" class="lab-value"></p>
                ${mode === 'interval' ? `<label class="lab-control" for="lab-interval">Interval<select id="lab-interval">${Object.entries(intervals).map(([key, value]) => `<option value="${key}" ${key === intervalKey ? 'selected' : ''}>${value.name}</option>`).join('')}</select></label>
                <label class="lab-control" for="lab-tuning">Tuning<select id="lab-tuning"><option value="pure" ${tuning === 'pure' ? 'selected' : ''}>Pure ratio</option><option value="equal" ${tuning === 'equal' ? 'selected' : ''}>Piano · 12-TET</option></select></label>
                ${range('lab-cents', 'Fine adjustment of upper note (cents)', -40, 40, cents, 0.1)}<p id="lab-adjustment" class="lab-value"></p>
                <button id="lab-reset" class="btn secondary">Reset adjustment</button>
                <label class="lab-checkbox"><input id="lab-rich" type="checkbox" ${rich ? 'checked' : ''}> Harmonic-rich tones</label>`
                : `${range('lab-difference', 'Difference between tones (Hz)', 0, 8, difference, 0.1)}<p id="lab-adjustment" class="lab-value"></p>`}
                <div id="lab-readout" class="lab-readout" aria-live="polite"></div>`;
            $('#lab-mode').onchange = event => { mode = event.target.value; renderControls(); update(); };
            $('#lab-root').oninput = event => { fundamental = Number(event.target.value); update(); };
            if (mode === 'interval') {
                $('#lab-interval').onchange = event => { intervalKey = event.target.value; cents = 0; renderControls(); update(); };
                $('#lab-tuning').onchange = event => { tuning = event.target.value; update(); };
                $('#lab-cents').oninput = event => { cents = Number(event.target.value); update(); };
                $('#lab-reset').onclick = () => { cents = 0; $('#lab-cents').value = 0; update(); };
                $('#lab-rich').onchange = event => { rich = event.target.checked; update(); };
            } else $('#lab-difference').oninput = event => { difference = Number(event.target.value); update(); };
        }
    }
    function frequencies() {
        const interval = intervals[intervalKey];
        const ratio = (tuning === 'pure' ? interval.ratio : 2 ** (interval.semitones / 12)) * 2 ** (cents / 1200);
        return [fundamental, mode === 'nearby' ? fundamental + difference : fundamental * ratio];
    }
    function beatRate() {
        const [low, high] = frequencies();
        return mode === 'nearby' ? high - low : Math.abs(low * intervals[intervalKey].lower - high * intervals[intervalKey].upper);
    }
    function update() { if (playing) buildVoices(); redraw(); }
    function redraw() {
        $('#lab-root-value').textContent = `${fundamental.toFixed(0)} Hz`;
        if (lab === 'harmonics') {
            Array.from($('#lab-solo').options).slice(1).forEach((option, i) => { option.textContent = `Harmonic ${i + 1} · ${((i + 1) * fundamental).toFixed(0)} Hz`; });
        } else {
            $('#lab-adjustment').textContent = mode === 'nearby' ? `${difference.toFixed(1)} Hz difference` : `${cents > 0 ? '+' : ''}${cents.toFixed(1)} cents`;
            const [low, high] = frequencies();
            const beat = beatRate();
            const detail = mode === 'nearby' ? 'Fundamentals' : `Lower partial ${intervals[intervalKey].lower} vs upper partial ${intervals[intervalKey].upper}`;
            $('#lab-readout').textContent = `${low.toFixed(2)} Hz + ${high.toFixed(2)} Hz · ${ (1200 * Math.log2(high / low)).toFixed(2)} cents apart. ${detail}: ${beat.toFixed(2)} beats/second.${mode === 'interval' && !rich ? ' These upper partials are absent in sine mode; this pair’s beating will not sound.' : ''}`;
        }
        draw();
    }
    function draw() {
        const width = Math.max(280, canvas.clientWidth), height = 300;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr; canvas.height = height * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.fillStyle = '#111120'; ctx.fillRect(0, 0, width, height);
        const pad = 24, usable = width - pad * 2;
        ctx.strokeStyle = '#2a2a3e'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad, 145); ctx.lineTo(width - pad, 145); ctx.stroke();
        const line = (fn, color, scale = 90, center = 145) => {
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
            for (let x = 0; x <= usable; x++) {
                const y = center - scale * fn(x / usable);
                if (x === 0) ctx.moveTo(pad + x, y); else ctx.lineTo(pad + x, y);
            }
            ctx.stroke();
        };
        if (lab === 'harmonics') {
            const weights = amplitudes.map((a, i) => solo ? Number(i + 1 === solo) : a);
            const norm = weights.reduce((a, b) => a + b, 0) || 1;
            line(t => weights.reduce((sum, a, i) => sum + a * Math.sin(t * Math.PI * 4 * (i + 1)), 0) / norm, '#c9a96e');
            const max = Math.max(...weights, 1);
            weights.forEach((a, i) => {
                ctx.fillStyle = solo ? '#6ea5c9' : '#c9a96e';
                ctx.fillRect(pad + i * usable / harmonicCount, 265 - a / max * 45, usable / harmonicCount - 5, a / max * 45);
                ctx.fillStyle = '#aaaabd'; ctx.font = '10px system-ui'; ctx.fillText(i + 1, pad + i * usable / harmonicCount, 284);
            });
            $('#lab-caption').textContent = solo ? `Isolated H${solo}: ${(solo * fundamental).toFixed(0)} Hz. The isolate control auditions the partial at a consistent level, even if its recipe slider is zero.` : 'Two periods of the summed wave, normalized to fit. Bars show harmonic amplitudes 1–12. Changing the fundamental changes frequency; the shape stays the same.';
            canvas.setAttribute('aria-label', solo ? `Isolated sine wave at harmonic ${solo}` : `Sum of twelve adjustable harmonics, with amplitude bars. ${amplitudes.map((a, i) => `H${i + 1}: ${Math.round(a * 100)} percent`).join(', ')}`);
        } else {
            const rate = beatRate();
            line(t => Math.abs(Math.cos(Math.PI * rate * t * 4)), '#6ea5c9', 100, 220);
            ctx.fillStyle = '#aaaabd'; ctx.font = '12px system-ui'; ctx.fillText('0 seconds', pad, 275); ctx.fillText('4 seconds', width - pad - 60, 275);
            $('#lab-caption').textContent = `Four-second amplitude envelope of ${mode === 'nearby' ? 'the two fundamentals' : 'the selected partial pair'}. ${rate.toFixed(2)} pulses per second. This graph isolates one pair; the complete harmonic-rich sound contains other interactions.`;
            canvas.setAttribute('aria-label', `${rate.toFixed(2)} beats per second, amplitude envelope over four seconds`);
        }
    }
    function clearVoices() {
        const old = oscillators, oldGain = voiceGain;
        oscillators = []; voiceGain = null;
        if (!oldGain) return;
        const now = context.currentTime;
        oldGain.gain.cancelScheduledValues(now);
        oldGain.gain.setTargetAtTime(0, now, 0.008);
        old.forEach(osc => { try { osc.stop(now + 0.05); } catch (_) {} });
        setTimeout(() => { old.forEach(osc => osc.disconnect()); oldGain.disconnect(); }, 80);
    }
    function buildVoices() {
        clearVoices();
        voiceGain = context.createGain();
        voiceGain.gain.value = 0; voiceGain.connect(master);
        voiceGain.gain.setTargetAtTime(1, context.currentTime, 0.015);
        const add = (frequency, amplitude) => {
            if (!amplitude || frequency >= context.sampleRate / 2) return;
            const osc = context.createOscillator(), gain = context.createGain();
            osc.type = 'sine'; osc.frequency.value = frequency; gain.gain.value = amplitude;
            osc.connect(gain); gain.connect(voiceGain); osc.start(); oscillators.push(osc);
            osc.onended = () => gain.disconnect();
        };
        if (lab === 'harmonics') {
            if (solo) add(fundamental * solo, 1);
            else {
                const total = amplitudes.reduce((a, b) => a + b, 0) || 1;
                amplitudes.forEach((a, i) => add(fundamental * (i + 1), a / total));
            }
        } else {
            const count = mode === 'interval' && rich ? 12 : 1;
            const total = Array.from({ length: count }, (_, i) => 1 / (i + 1)).reduce((a, b) => a + b, 0);
            frequencies().forEach(freq => { for (let n = 1; n <= count; n++) add(freq * n, 1 / (2 * n * total)); });
        }
    }
    async function start() {
        const attempt = ++generation;
        try {
            if (!context) {
                context = new (window.AudioContext || window.webkitAudioContext)();
                master = context.createGain(); master.connect(context.destination);
            }
            await context.resume();
            if (attempt !== generation || !view.classList.contains('active')) return;
            master.gain.setValueAtTime(Number($('#lab-volume').value), context.currentTime);
            playing = true; buildVoices();
            playButton.textContent = 'Stop sound'; playButton.setAttribute('aria-pressed', 'true');
            $('#lab-status').textContent = 'Playing locally synthesized audio.';
        } catch (_) { $('#lab-status').textContent = 'Audio could not start in this browser. The controls and diagrams still work.'; }
    }
    function stop() {
        generation++; playing = false; clearVoices();
        if (context?.state === 'running') context.suspend().catch(() => {});
        playButton.textContent = 'Play sound'; playButton.setAttribute('aria-pressed', 'false');
        $('#lab-status').textContent = 'Sound stopped.';
    }
    document.querySelectorAll('[data-lab]').forEach(button => button.onclick = () => openLab(button.dataset.lab));
    playButton.onclick = () => playing ? stop() : start();
    $('#lab-volume').oninput = event => { if (master) master.gain.setTargetAtTime(Number(event.target.value), context.currentTime, 0.02); };
    $('#lab-back').onclick = () => { stop(); view.classList.remove('active'); $('#home-view').classList.add('active'); };
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && view.classList.contains('active')) $('#lab-back').click(); });
    window.addEventListener('pagehide', stop);
    window.addEventListener('resize', () => { if (view.classList.contains('active')) draw(); });
})();
