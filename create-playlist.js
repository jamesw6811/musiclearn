const http = require('http');
const https = require('https');
const { URL } = require('url');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8888/callback';
const SCOPES = 'playlist-modify-public playlist-modify-private';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before creating a playlist.');
    process.exit(1);
}

const TRACKS = [
    // Session 1
    '6JzjU7eDJVGoRuslFPkDnc','23qv6hbRmfPkCPRaY4lD8V','7u90pQRJDf0mDxcYqTahzZ',
    '1QFdlNSSVAy9qElfiCwijN','1kfM9QSV3mtWwjtq23ofST','1aOANeFiD1L4VhNjxUO3AA',
    '12MMkR3waI00htxGpc5zV7',
    // Session 2
    '7CrNF9zL7tIQ2269DVxzST','1YQWosTIljIvxAgHWTp7KP','3k5O0RKO6zEqu9JJ7JqxDX',
    '2gea9NTqPWz5CzT7eYEgMs','20NKmbrtmgdnjDA9OsPC6R','0CLbmkYmQIWiEwnsbOkLpd',
    '0jHEixPAoSopOP75j2iTX9',
    // Session 3
    '3i8AigePIJ0Y2aQjpA9Kxc','1tVAblkpwlHpALeyy0RpzU','3rUnpz2qnIq9reCGA7YQEn',
    '1LWabh9wqLITaRpYe82PoD','4gdwUYVnVv8u0t6XaYob4v','4O1XVmn41lyBD5nHVpGGA8',
    // Session 4
    '28CYgB8CnubmGcdxtYYUh5','739nt7EHoiy723RNSBVWRk','4uD6wglytVWvBgp5eCL2Ar',
    '3lpDrxUkr0tIe1kmJvdK7d','7tvuLLroI0n6uYBWuFig5d','4eVH8dKkAmC5p90RvaCgUk',
    // Session 5
    '3XkYG3DP7DnnMnpTgLosGF','4JSXjhaeCWLlGuMgtqsj2p','55q3Ro66yXWi9rsEddeEN4',
    '6dsq7Nt5mIFzvm5kIYNORy','5P6vo51dtkBYWXswH1twvK','27Sb5HdiMh9k1z5oPI9r3B',
    '3QUU7ZECjXncEhUd6Aggcq','0AjQvTAlYcWQ6JpJcUdsKw','1dHpxHgXbzWiK1cQC5ImbY',
];

function apiRequest(method, path, token, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.spotify.com',
            path,
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode >= 400) {
                    reject(new Error(`${res.statusCode}: ${data}`));
                } else {
                    resolve(data ? JSON.parse(data) : {});
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function exchangeCode(code) {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
        });
        const options = {
            hostname: 'accounts.spotify.com',
            path: '/api/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode >= 400) reject(new Error(`Token error: ${data}`));
                else resolve(JSON.parse(data));
            });
        });
        req.on('error', reject);
        req.write(params.toString());
        req.end();
    });
}

async function createPlaylist(token) {
    // Get user ID
    const me = await apiRequest('GET', '/v1/me', token);
    console.log(`Logged in as: ${me.display_name}`);

    // Create playlist
    const playlist = await apiRequest('POST', `/v1/users/${me.id}/playlists`, token, {
        name: 'Rhythm as Architecture',
        description: 'Polyrhythm, Odd Meters & the Mathematics of Feel — companion playlist for all 5 sessions.',
        public: false,
    });
    console.log(`Created playlist: ${playlist.external_urls.spotify}`);

    // Add tracks (max 100 per request, we have 35)
    const uris = TRACKS.map(id => `spotify:track:${id}`);
    await apiRequest('POST', `/v1/playlists/${playlist.id}/tracks`, token, { uris });
    console.log(`Added ${uris.length} tracks. Done!`);

    return playlist.external_urls.spotify;
}

// Start OAuth flow
const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
})}`;

console.log('Opening Spotify login...');
require('child_process').exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost:8888');
    if (url.pathname !== '/callback') return;

    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error || !code) {
        res.writeHead(400);
        res.end('Authorization denied.');
        server.close();
        return;
    }

    try {
        const tokens = await exchangeCode(code);
        const playlistUrl = await createPlaylist(tokens.access_token);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Playlist created!</h1><p><a href="${playlistUrl}">Open in Spotify</a></p>`);
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end('Error: ' + err.message);
    }

    server.close();
});

server.listen(8888, () => {
    console.log('Waiting for Spotify callback on http://localhost:8888...');
});
