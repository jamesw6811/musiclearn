const fs = require('fs');
const https = require('https');
const path = require('path');
const { execFileSync } = require('child_process');
const CourseUtils = require('./course-utils');

const VOICE_ID = 'cjVigY5qzO86Huf0OWal'; // Eric, as used in House as Continuation
const MODEL_ID = 'eleven_multilingual_v2';
const ROOT = __dirname;
const METADATA_FILE = path.join(ROOT, 'audio-durations.js');

function loadCourses() {
    const sources = ['sessions.js', 'pitch-sessions.js', 'house-sessions.js', 'courses.js'];
    return new Function(sources.map(file => fs.readFileSync(path.join(ROOT, file), 'utf8')).join('\n') + '\nreturn COURSES;')();
}

function collectJobs(course, sessionNumber) {
    return course.sessions.flatMap((session, si) => {
        if (sessionNumber && si + 1 !== sessionNumber) return [];
        return CourseUtils.segments(session).filter(segment => segment.type === 'narration').map(segment => ({
            filename: CourseUtils.audioPath(course, si, segment._narIdx),
            title: segment.title, text: segment.speechText || segment.text
        }));
    });
}

function measure(filename) {
    const seconds = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', filename], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim());
    if (!Number.isFinite(seconds) || seconds <= 0) throw new Error('Invalid MP3 duration');
    return seconds;
}

function synthesize(text, apiKey) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ text, model_id: MODEL_ID, voice_settings: {
            stability: 0.5, similarity_boost: 0.7, style: 0.35, use_speaker_boost: true
        }});
        const request = https.request({
            hostname: 'api.elevenlabs.io', path: `/v1/text-to-speech/${VOICE_ID}`, method: 'POST',
            headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg', 'Content-Length': Buffer.byteLength(body) }
        }, response => {
            const chunks = [];
            response.on('data', chunk => chunks.push(chunk));
            response.on('error', reject);
            response.on('end', () => {
                if (response.statusCode !== 200) {
                    const error = new Error(`ElevenLabs returned HTTP ${response.statusCode}`);
                    error.statusCode = response.statusCode;
                    reject(error);
                } else resolve(Buffer.concat(chunks));
            });
        });
        request.setTimeout(120000, () => request.destroy(new Error('ElevenLabs request timed out')));
        request.on('error', reject);
        request.end(body);
    });
}

async function main(args) {
    const options = {};
    for (let i = 0; i < args.length; i++) {
        if (['--course', '--session'].includes(args[i])) options[args[i].slice(2)] = args[++i];
        else if (['--dry-run', '--measure', '--force'].includes(args[i])) options[args[i].slice(2)] = true;
        else throw new Error(`Unknown argument: ${args[i]}`);
    }
    const course = loadCourses().find(item => item.id === options.course);
    if (!course) throw new Error('Usage: node generate-audio.js --course rhythm|house|pitch [--session N] [--dry-run | --measure] [--force]');
    const sessionNumber = options.session == null ? null : Number(options.session);
    if (sessionNumber !== null && (!Number.isInteger(sessionNumber) || sessionNumber < 1 || sessionNumber > course.sessions.length)) throw new Error('Session number is outside this course.');
    const jobs = collectJobs(course, sessionNumber);
    console.log(`${course.title}: ${jobs.length} narrations, ${jobs.reduce((sum, job) => sum + job.text.length, 0)} characters`);
    if (options['dry-run']) {
        jobs.forEach(job => console.log(`${fs.existsSync(path.join(ROOT, job.filename)) ? 'EXISTS' : 'NEW'} ${job.filename} · ${job.title}`));
        return;
    }
    // ffprobe is checked before rendering so credits cannot be spent without duration verification.
    execFileSync('ffprobe', ['-version'], { stdio: 'ignore' });
    let metadata = {};
    if (fs.existsSync(METADATA_FILE)) metadata = new Function(fs.readFileSync(METADATA_FILE, 'utf8') + ';return AUDIO_DURATIONS;')();
    const saveMetadata = () => {
        const temp = METADATA_FILE + '.tmp';
        fs.writeFileSync(temp, '/* Measured MP3 lengths in seconds, keyed by course audio path. */\nconst AUDIO_DURATIONS = ' + JSON.stringify(metadata, null, 2) + ';\n');
        fs.renameSync(temp, METADATA_FILE);
    };
    for (const job of jobs) {
        const output = path.join(ROOT, job.filename);
        if (fs.existsSync(output) && (!options.force || options.measure)) {
            metadata[job.filename] = measure(output);
            saveMetadata();
            console.log(`MEASURED ${job.filename}: ${metadata[job.filename].toFixed(2)} seconds`);
            continue;
        }
        if (options.measure) { console.log(`MISSING ${job.filename}`); continue; }
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) throw new Error('Set ELEVENLABS_API_KEY before rendering. Use --dry-run to inspect jobs without an API call.');
        fs.mkdirSync(path.dirname(output), { recursive: true });
        let buffer;
        for (let attempt = 0; ; attempt++) {
            try { buffer = await synthesize(job.text, apiKey); break; }
            catch (error) {
                if (error.statusCode !== 429 || attempt >= 2) throw error;
                await new Promise(resolve => setTimeout(resolve, 10000 * (attempt + 1)));
            }
        }
        const temporary = output + '.tmp.mp3';
        try {
            fs.writeFileSync(temporary, buffer);
            const seconds = measure(temporary);
            fs.renameSync(temporary, output);
            metadata[job.filename] = seconds;
            saveMetadata();
            console.log(`RENDERED ${job.filename}: ${seconds.toFixed(2)} seconds`);
        } finally {
            if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
        }
    }
}

module.exports = { loadCourses, collectJobs, measure };
if (require.main === module) main(process.argv.slice(2)).catch(error => {
    console.error(error.message); process.exitCode = 1;
});
