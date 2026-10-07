/* Pitch, tuning, and the inside of a note. Listening windows are budgets, not verified track lengths. */
const PITCH_SESSIONS = [
  {
    "title": "What a note is",
    "subtitle": "Folk and throat singing · acid house · synth-classical · classical",
    "duration": "~26 min",
    "sequence": "interleaved",
    "segments": [
      {
        "type": "narration",
        "title": "1A · A sound with an inside",
        "text": "Sing a comfortable note and hold it. It feels like one thing: one pitch, one breath, one sound. Yet a steady musical tone can contain many frequencies at once. A sine wave is the simplest ingredient, a smooth oscillation at a single frequency. Fourier analysis lets us describe a periodic wave as a sum of sine waves. This is a way to understand the sound, not a claim that your throat contains a bank of tiny synthesizers.\n\nFor a harmonic tone, the frequencies are integer multiples of a fundamental: f, 2f, 3f, 4f, and onward. At a fundamental of 100 hertz, that means 100, 200, 300, 400 hertz. We usually fuse them into a single note. Their relative strengths help give a voice, a violin, and a trumpet different timbres. The attack, noise, and changes over time matter too. Bells and other inharmonic sounds need a more complicated recipe.\n\nThe fundamental is the first harmonic. The first overtone is the second harmonic. That small counting distinction will matter later. An overtone singer shapes the vocal tract so that selected upper harmonics stand out. You can follow an upper melody while still hearing the lower vocal pitch. Some techniques also move that lower pitch; do not assume every example uses an absolutely fixed drone.\n\nWhat to listen for: first follow the low voice in Huun-Huur-Tu, then shift your attention upward. Use Hefele's demonstration to hear individual harmonics emerge. The apparent second voice is already inside the first sound.",
        "sources": [
          {
            "title": "Hefele: demonstrations",
            "url": "https://overtone.academy/videos/"
          }
        ]
      },
      {
        "type": "music",
        "title": "Orphan's Lament",
        "artist": "Huun-Huur-Tu",
        "album": "The Orphan’s Lament",
        "context": "Separate the low sung line from the bright upper resonance. Instrumental accompaniment can also make pitches, so compare with the solo demonstration. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": "https://music.apple.com/us/album/the-orphans-lament/1565051268",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Polyphonic overtone singing",
        "artist": "Anna-Maria Hefele",
        "album": "Solo demonstration (2014)",
        "context": "Follow the whistle-like upper line and notice when the lower voice stays put or moves. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": "https://overtone.academy/videos/",
        "youtubeId": "vC9Qh709gas",
        "endSeconds": 240
      },
      {
        "type": "narration",
        "title": "1B · A synthesizer’s harmonic recipe",
        "text": "Imagine controlling the strength of each harmonic independently. That is additive synthesis. You can assemble a bright or dark sound by choosing ingredients. Another approach starts with a harmonically rich waveform and removes ingredients with a filter: subtractive synthesis. Both approaches make the inside of a note available as a musical material.\n\nAn ideal sawtooth contains every integer harmonic, with amplitudes falling roughly as one over the harmonic number. An ideal symmetric square wave contains only odd harmonics: first, third, fifth, seventh. Change its pulse width and the pattern changes. Real instruments, distortion, and filters modify these ideal recipes. Knowing the starting waveform helps you hear the difference between changing a melody and changing its color.\n\nA low-pass filter reduces frequencies above its cutoff. Open it and more upper energy comes through; close it and the tone darkens. Resonance emphasizes a region near the cutoff. A resonant sweep can make harmonics conspicuous, but it does not necessarily climb them one at a time. In acid house, the bass pattern and the filter's movement work together. The pitches in “Acid Tracks” do move; the useful comparison is a repeating phrase whose brightness changes much more dramatically.\n\nCarlos offers another angle: Bach's distinct musical lines become distinct electronic colors. Listen to the attack and sustain as well as brightness. A convincing instrument is a changing recipe, not just a fixed spectrum.\n\nWhat to listen for: in Phuture, keep humming the repeating bass figure while the filter transforms it. In Carlos, follow one contrapuntal line and identify the sonic features that keep it separate from its neighbors.",
        "sources": [
          {
            "title": "Carlos: recording and track listing",
            "url": "https://www.wendycarlos.com/+sobox.html"
          }
        ]
      },
      {
        "type": "music",
        "title": "Acid Tracks",
        "artist": "Phuture",
        "album": "Acid Tracks",
        "context": "Hold the bass pattern in memory while its brightness and resonant emphasis change. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.youtube.com/watch?v=yKHGv6Es610",
        "youtubeId": "yKHGv6Es610",
        "endSeconds": 300
      },
      {
        "type": "music",
        "title": "Brandenburg Concerto No. 3, first movement",
        "artist": "Wendy Carlos",
        "album": "Switched-On Bach (1968)",
        "context": "Hear each contrapuntal line as a different combination of harmonic balance, attack, and decay. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.wendycarlos.com/+sobox.html",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "1C · The horn’s built-in pitches",
        "text": "An air column supports resonant modes. On a brass instrument, the player's lips interact with that column, and changes in embouchure can select different resonances. With one effective tube length, the available resonances approximate a harmonic series. Valves change the tube length and offer other series; hand-stopping and lip adjustments can also alter pitch. Natural brass is therefore constrained by its resonances without being a perfectly rigid frequency ladder.\n\nDivide a harmonic's frequency by powers of two to bring it into the fundamental's octave. The third harmonic gives a fifth at 3:2. The fifth gives a major third at 5:4. The seventh gives 7:4, a seventh noticeably lower than the equal-tempered minor seventh. The eleventh reduces to 11:8, falling between the equal-tempered fourth and tritone. These pitches are not mistakes in arithmetic. They are mismatches between two systems.\n\nA cent is one hundredth of an equal-tempered semitone. The 7:4 seventh is about 31 cents below the piano's minor seventh; 11:8 is about 49 cents above its fourth. Those numbers describe relative intervals, not absolute notes. Change the fundamental and the whole family moves.\n\nBritten asks the horn to use its unadjusted natural harmonics in the Prologue and Epilogue of his Serenade. The unusual intonation belongs to the composition. Hear it as an invitation to a different pitch landscape.\n\nWhat to listen for: notice the short solo's familiar horn-call shape, then the pitches that resist piano expectations. Let those notes establish their own relationships instead of mentally correcting them.",
        "sources": [
          {
            "title": "Britten’s publisher: natural harmonics",
            "url": "https://www.boosey.com/pages/cr/catalogue/cat_detail?=&langid=1&musicid=3880"
          }
        ]
      },
      {
        "type": "music",
        "title": "Prologue from Serenade for Tenor, Horn and Strings",
        "artist": "Benjamin Britten",
        "album": "Serenade, op. 31 · choose Dennis Brain or Barry Tuckwell",
        "context": "Listen to the unadjusted natural harmonics; the seventh and eleventh help explain the unfamiliar intonation. Suggested listening window: 3 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 3,
        "sourceUrl": "https://www.boosey.com/pages/cr/catalogue/cat_detail?=&langid=1&musicid=3880",
        "youtubeId": null,
        "endSeconds": null
      }
    ],
    "extra": ""
  },
  {
    "title": "Drone and just intonation",
    "subtitle": "Indian classical · psych rock · jazz · organ drone",
    "duration": "~31 min",
    "sequence": "interleaved",
    "segments": [
      {
        "type": "narration",
        "title": "2A · A reference that keeps sounding",
        "text": "A drone gives you a pitch to remember without needing memory: it keeps sounding. In Hindustani music, Sa is the tonal reference, chosen for the performer rather than tied to a universal concert pitch. A common tanpura arrangement includes Sa and Pa, the fifth, with octave repetitions. Other tunings replace Pa depending on the raga. The drone is an active field of resonance under the melodic performance.\n\nThe tanpura's characteristic jivari comes from the string's interaction with its shaped bridge. A plucked string has a changing spectrum, so this drone is textured and alive. It is not simply two laboratory sine waves. Listen first to that continuous buzzing halo, then to the singer's relationship to it.\n\nJust intonation describes intervals through ratios of integers. A fifth at 3:2 aligns the third harmonic of the lower note with the second of the upper. If those partials are close but unequal, their interference produces beats. At exact alignment that particular beating stops. Other partials, vibrato, noise, and room acoustics may keep the complete sound moving. A pure ratio does not promise total silence inside a real recording.\n\nPran Nath's slow unfolding gives you time to hear pitch as a relationship. Raga has melodic rules, ornament, and direction; reducing the whole tradition to a table of fixed ratios would miss the music. Use the drone as a reference for listening, not as a substitute for that musical language.\n\nWhat to listen for: hear a solo tanpura first. In the opening of Raga Darbari, follow departures from and returns toward the tonal center. Notice which sustained moments feel settled without assuming every arrival must be the fifth.",
        "sources": [
          {
            "title": "MELA: Pran Nath discography",
            "url": "https://www.melafoundation.org/JARE_Pgm_PPN%20JULY%202018%20R1.pdf"
          }
        ]
      },
      {
        "type": "music",
        "title": "Solo tanpura demonstration",
        "artist": "Tanpura player",
        "album": "Choose an acoustic Sa–Pa demonstration",
        "context": "Listen for the bridge buzz and the changing upper spectrum after each pluck. Suggested listening window: 2 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 2,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Raga Darbari (opening)",
        "artist": "Pandit Pran Nath",
        "album": "Ragas of Morning and Night",
        "context": "Track the singer against the tanpura. Start with the first five minutes; performance versions differ. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.melafoundation.org/JARE_Pgm_PPN%20JULY%202018%20R1.pdf",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "2B · Still harmony, moving surfaces",
        "text": "A familiar pop arrangement moves from chord to chord. A drone-centered arrangement can leave its harmonic foundation relatively still and make everything above it change: rhythm, register, distortion, ornament, and density. The absence of a conventional chord sequence does not mean nothing is happening. It changes where you put your attention.\n\n“Tomorrow Never Knows” places a vocal line inside a looping, layered sound world. Listen for recurring percussion and the changing sounds around the voice. A sustained tonal center can make each new texture feel unusually vivid because it does not need to announce a new chord at the same time. This is a listening comparison with Indian drone practice, not a claim that the two traditions share identical tuning rules.\n\nIn “Venus in Furs,” the abrasive viola helps hold the music in place while the song moves around it. Focus on the bow's texture: pressure, noise, and roughness can carry as much information as a melody. The track still has musical motion and harmonic detail. “Static” here is relative to a song organized around a strongly contrasting chord progression.\n\nJohn Cale's involvement in the Theatre of Eternal Music provides a historical bridge to Session 5. That connection is more specific than calling all long held notes minimalist. The same technique can serve very different purposes: ritual continuity, a rock song's tension, or close attention to acoustic interference.\n\nWhat to listen for: try marking each moment you think the underlying harmony changes. Then replay and attend only to the changing surface. In both recordings, ask how much momentum comes from timbre and repetition rather than chord travel.",
        "sources": [
          {
            "title": "Young and Zazeela: Theatre of Eternal Music notes",
            "url": "https://www.melafoundation.org/theatre.pdf"
          }
        ]
      },
      {
        "type": "music",
        "title": "Tomorrow Never Knows",
        "artist": "The Beatles",
        "album": "Revolver",
        "context": "Follow the persistent tonal center, then the changing tape-loop textures and percussion. Suggested listening window: 3 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 3,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Venus in Furs",
        "artist": "The Velvet Underground",
        "album": "The Velvet Underground & Nico",
        "context": "Follow Cale’s viola through the song. Hear sustained texture alongside the actual harmonic movement. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "2C · Beating becomes something to follow",
        "text": "Play 200 hertz beside 202 hertz and their combined loudness swells and recedes about twice each second. The beat rate equals the difference in frequency. Very slow beating can sound like a gentle pulse; faster differences become flutter and eventually other perceptual textures. You are hearing interaction rather than a third player adding a rhythm.\n\nFor an interval, compare partials as well as fundamentals. If a lower tone is 200 hertz and its partner is 301, the lower tone's third harmonic is 600 while the upper's second is 602. That pair beats twice per second even though the two fundamentals are far apart. Move the upper note to 300 and those partials align. This is the link between tuning and the shimmer inside a chord.\n\nAlice Coltrane's title track combines a drone foundation with bass, percussion, harp, and saxophone. It opens the jazz side of this session. Listen for an enduring reference underneath active improvisation. It is not a controlled demonstration of pure-tone beating.\n\nMalone's sustained organ music slows your attention to the interior of held combinations. The 2025 edition's notes identify “Spectacle of Ritual” as recorded on an organ in Kirnberger III temperament. That is an unequal temperament, not a blanket claim of just intonation. Different keys and intervals can have different amounts of beating.\n\nWhat to listen for: in Coltrane, keep the drone in your ear while following the improvisers. In Malone, choose one held chord and listen for slow amplitude motion. Describe what you hear before trying to name its exact tuning.",
        "sources": [
          {
            "title": "Impulse: Coltrane album",
            "url": "https://www.impulserecords.com/releases-archive/journey-satchidananda/"
          },
          {
            "title": "Malone: edition and tuning notes",
            "url": "https://kalimalone.bandcamp.com/album/the-sacrificial-code-2025-edition"
          }
        ]
      },
      {
        "type": "music",
        "title": "Journey in Satchidananda",
        "artist": "Alice Coltrane",
        "album": "Journey in Satchidananda",
        "context": "Hold attention on the drone beneath the bass ostinato and improvisation. Suggested listening window: 6 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 6,
        "sourceUrl": "https://www.youtube.com/watch?v=azORE4Hff94",
        "youtubeId": "azORE4Hff94",
        "endSeconds": 360
      },
      {
        "type": "music",
        "title": "Spectacle of Ritual",
        "artist": "Kali Malone",
        "album": "The Sacrificial Code · 2025 edition",
        "context": "Listen to the interior of the organ chords. This recording uses Kirnberger III temperament; do not label it pure JI. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://kalimalone.bandcamp.com/album/the-sacrificial-code-2025-edition",
        "youtubeId": null,
        "endSeconds": null
      }
    ],
    "extra": "Whole album option: Alice Coltrane, Journey in Satchidananda."
  },
  {
    "title": "The compromise",
    "subtitle": "Baroque · barbershop · pop",
    "duration": "~25 min",
    "sequence": "interleaved",
    "segments": [
      {
        "type": "narration",
        "title": "3A · Why the fifths will not close",
        "text": "Start on C and climb twelve perfectly pure fifths. Reduce by octaves as needed. You expect to return to a C, but you arrive slightly higher. Twelve factors of 3:2 do not equal seven factors of 2:1. Their mismatch, about 23.46 cents, is the Pythagorean comma. The circle of fifths is a useful diagram, but acoustically it does not close without adjustment.\n\nMeantone temperaments narrow fifths to improve thirds. In quarter-comma meantone, selected major thirds become pure 5:4 intervals, while a conventional twelve-note layout leaves an unusably wide closing fifth, the wolf. Extra keys can extend the usable region. This is a practical tradeoff between lovely local relationships and freedom to move to distant keys.\n\nCirculating well temperaments distribute adjustment so that all keys become usable, with different interval colors from key to key. Twelve-tone equal temperament divides the octave into twelve equal logarithmic steps: each multiplies frequency by the twelfth root of two. Its fifth is about two cents narrow and its major third about fourteen cents wide compared with pure ratios. Transposition becomes uniform at the cost of those interval adjustments.\n\nThe title The Well-Tempered Clavier does not settle which exact temperament Bach intended. For a meaningful comparison, use the same generated performance and instrument sound with only its tuning changed. Two unrelated piano recordings also differ in tempo, touch, and instrument.\n\nWhat to listen for: compare BWV 846 in equal temperament and Kirnberger III or Werckmeister III using the linked demonstrations. Attend to thirds, sustained resonance, and changes of harmonic color. Avoid assigning every performance difference to temperament.",
        "sources": [
          {
            "title": "Bol Processor: same-piece temperament comparisons",
            "url": "https://bolprocessor.org/comparing-temperaments/"
          }
        ]
      },
      {
        "type": "music",
        "title": "Prelude in C, BWV 846 · tuning comparison",
        "artist": "J. S. Bach",
        "album": "Equal temperament versus Kirnberger III / Werckmeister III",
        "context": "Use the same-render comparison on the linked page. Compare thirds and their beating rather than tempo or performance style. Suggested listening window: 6 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 6,
        "sourceUrl": "https://bolprocessor.org/comparing-temperaments/",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "3B · Four singers, more than four pitches",
        "text": "A choir can adjust pitch continuously. A keyboard cannot change the tuning of an individual held key to suit the chord around it. That freedom lets singers find relationships that reduce beating between important partials. It requires listening and adjustment rather than simply matching a piano before the performance.\n\nThe barbershop seventh offers a striking example. Think of four voices related approximately as 4:5:6:7. Normalize the lowest to one and the chord becomes 1, 5:4, 3:2, 7:4. The top note is the harmonic seventh you met in Session 1, around 31 cents lower than the equal-tempered minor seventh. Sing it too high by that reference and you change the alignment of the chord's harmonics.\n\n“Ringing” also depends on balanced vowels, matched timbre, steady breath, and the arrangement. When partials reinforce each other, listeners may hear an upper pitch more distinctly than they can assign to one singer. The impression can be that an extra voice has appeared. Some perceived pitches involve auditory processing too; hearing an additional pitch is not a simple count of extra physical sound sources.\n\nNot every chord in a barbershop song is a harmonic seventh, and singers must negotiate voice-leading and tonal direction. Pure ratios are a tool inside a performance. Listen to the final sustained tag of Vocal Spectrum's “Go the Distance” for the blend, then search through the arrangement for ringing seventh chords without claiming each held chord has that exact structure.\n\nWhat to listen for: track the bass, then the highest voice, then stop separating parts and hear the combined resonance. Notice whether a stable chord feels larger than four individual lines.",
        "sources": [
          {
            "title": "Barbershop Harmony Society: intonation",
            "url": "https://www.barbershop.org/music/about-our-music"
          },
          {
            "title": "BHS: recording identification",
            "url": "https://www.barbershop.org/vocal-spectrumlunch-break-albums-win-cara-awards"
          }
        ]
      },
      {
        "type": "music",
        "title": "Go the Distance",
        "artist": "Vocal Spectrum",
        "album": "Vocal Spectrum II / live performance",
        "context": "Hear the sustained final tag and the fused vowel sound; ringing alone does not identify a chord’s exact ratio. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.barbershop.org/vocal-spectrumlunch-break-albums-win-cara-awards",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "3C · When the grid becomes audible",
        "text": "Equal temperament became established through instruments and musical practice long before software. Digital production inherited it as a convenient default: numbered notes, keyboard interfaces, and reusable parts that transpose predictably. Software can also support other tunings. The interesting question is what happens when its grid becomes an audible feature of a voice.\n\nPitch correction estimates a sung pitch and moves it toward an allowed target. The selected scale determines which targets are available; response settings determine how quickly the correction acts. Slow adjustment can retain much of a singer's movement. Very fast correction can turn a glide into a conspicuous step. It does not automatically quantize every tiny movement in every setting, nor does it create harmonies by itself.\n\nCher's “Believe” makes rapid correction part of the arrangement's identity. Listen for the moments where a syllable seems to hinge mechanically between pitches. The effect is especially vivid because speech has flexible contours and a human voice carries expressive transitions. Making some of those transitions abrupt creates a new performance texture.\n\nBon Iver's “Woods” moves your attention from one treated voice to a growing vocal stack. Layering, processing, and arrangement all contribute to what you hear. Do not assume a single pitch-correction plug-in generated every harmony. Correcting a melody and building a chord from it are separate operations; Session 6 will return to that distinction.\n\nWhat to listen for: in Cher, compare the abrupt transitions with neighboring more fluid syllables. In Bon Iver, follow the accumulating layers and ask which parts share a rhythm, which separate, and how processing helps fuse them.",
        "sources": [
          {
            "title": "Antares: pitch correction and the Cher effect",
            "url": "https://www.antarestech.com/blog/the-science-behind-auto-tune"
          }
        ]
      },
      {
        "type": "music",
        "title": "Believe",
        "artist": "Cher",
        "album": "Believe",
        "context": "Listen for the abrupt, robotic transitions at selected syllables rather than assuming the entire performance is equally corrected. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Woods",
        "artist": "Bon Iver",
        "album": "Blood Bank",
        "context": "Follow the growing stack of processed vocal layers and their shared articulation. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      }
    ],
    "extra": ""
  },
  {
    "title": "Between the keys",
    "subtitle": "Blues · rock · film synth · hip-hop",
    "duration": "~31 min",
    "sequence": "interleaved",
    "segments": [
      {
        "type": "narration",
        "title": "4A · Blue notes are gestures",
        "text": "The piano offers one minor third and one major third for each root. A singer or guitarist can visit the territory between them, approach a pitch from below, or make a phrase's intonation change with its emotional weight. A blue third can therefore be a region and a gesture, not a hidden thirteenth piano key.\n\nA neutral third often means a third between the usual minor and major sizes. That label is useful for describing an impression, but it does not establish one fixed blues frequency ratio. The seventh can also vary. The harmonic seventh at 7:4 provides a revealing comparison with the piano, yet hearing a low seventh does not prove a performer has selected that exact ratio.\n\nBlues grew through African American musical practice, with deep African inheritances and many later encounters. Comparing Robert Johnson with Ali Farka Touré can sharpen your attention to vocal inflection and guitar response. It should not turn a complex history into the claim that one modern recording demonstrates the single origin of another. Similar sounding techniques need both careful listening and historical context.\n\nIn Johnson's “Cross Road Blues,” the voice and guitar can imply pitch differently while maintaining a coherent phrase. In Touré and Ry Cooder's “Ai Du,” listen for the relationship between the repeating guitar pattern and the sung line. A repeated pattern gives you a reference against which small inflections stand out.\n\nWhat to listen for: hum the root, then sing the expressive third you actually hear. Does it settle, slide, or vary between phrases? Compare the voice with the guitar without forcing either into the nearest piano key.",
        "sources": []
      },
      {
        "type": "music",
        "title": "Cross Road Blues",
        "artist": "Robert Johnson",
        "album": "1936 recording · choose take 1",
        "context": "Compare vocal thirds and sevenths with the guitar’s pitch gestures; do not infer exact ratios from the old recording. Suggested listening window: 3 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 3,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Ai Du",
        "artist": "Ali Farka Touré with Ry Cooder",
        "album": "Talking Timbuktu",
        "context": "Follow the repeating guitar figure while the voice changes its contour and emphasis. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "4B · A pitch can have a route",
        "text": "A fretted guitar usually gives discrete stopping points, but bending a string raises its tension and changes frequency continuously. A slide changes the vibrating length without being restricted to the frets. Vibrato repeatedly moves around a pitch. All three make a note's path part of its identity.\n\nA target note and the motion toward it are different things to hear. One phrase might strike a note cleanly, another start below and bend up, and another overshoot before returning. Those routes can communicate urgency, restraint, or instability even when the destination is the same. A transcription with only noteheads often hides this information.\n\nDuane Allman's slide on the Allman Brothers Band's “Statesboro Blues” lets you hear pitch arrive through motion. Listen for the shape of the approach and the sustaining vibrato. Slide playing requires accurate choices; continuous pitch does not mean aimlessness. The player can make a destination sound inevitable without striking it directly.\n\nHendrix's “Voodoo Child (Slight Return)” combines bends with a changing electric guitar timbre. Distortion adds spectral energy, and a wah pedal changes filtering. That distinction links back to acid house: brighter does not automatically mean higher. Try following pitch while disregarding the movement of the filter, then reverse your attention.\n\nWhat to listen for: choose a single arrival in each recording. Hum the destination, replay its approach, and describe whether the line slides, bends, jumps, or shakes around it. Then compare the pitch movement with the changes in brightness.",
        "sources": [
          {
            "title": "Hendrix: official performance archive",
            "url": "https://www.jimihendrix.com/es/video/the-jimi-hendrix-experience-voodoo-child-slight-return-live-in-maui-1970/"
          }
        ]
      },
      {
        "type": "music",
        "title": "Statesboro Blues",
        "artist": "The Allman Brothers Band · Duane Allman, slide guitar",
        "album": "At Fillmore East (1971)",
        "context": "Follow the slide into a target, then the vibrato after arrival. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Voodoo Child (Slight Return)",
        "artist": "The Jimi Hendrix Experience",
        "album": "Electric Ladyland",
        "context": "Separate string bends from the wah’s changing brightness. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.youtube.com/watch?v=L7UMubmfbH0",
        "youtubeId": "L7UMubmfbH0",
        "endSeconds": 300
      },
      {
        "type": "narration",
        "title": "4C · Electronic pitch beyond a keyboard",
        "text": "A synthesizer's keys are an interface, not a law of sound. A pitch wheel, ribbon, glide control, or automation lane can move an oscillator continuously between keyed notes. The same instrument can provide an equal-tempered reference and a way to leave it. The player's gestures decide how those two possibilities interact.\n\nVangelis's “Blade Runner Blues” offers a voice-like electronic line with expressive pitch movement. Listen to the beginning and ending of each long tone, where the route between destinations becomes clear. The CS-80's ribbon belongs to this vocabulary of continuous control, but an audible glide alone cannot establish which particular control produced each gesture in a finished recording.\n\nPercussion can have pitch too. A short noisy attack can obscure a tonal decay; extend the decay and you may begin to hear the drum as a bass note. A TR-808-style kick is a useful bridge between rhythm and pitched sound. Producers can alter or sample that sound to make pitched bass lines. This possibility is broader than the factory controls on the original machine.\n\nRoland identifies the TR-808 in “Love Lockdown.” Listen to the low electronic pulse separately from the larger percussion in the choruses. Calling all those drums “tuned toms in the key” would go beyond the evidence. This track illustrates pitched percussion, not a verified microtonal tuning system.\n\nWhat to listen for: in Vangelis, trace a glide with your voice. In Kanye, listen past the initial impact to the low decay. Can you hum it? Notice when a percussion sound begins to function as part of the harmonic foundation.",
        "sources": [
          {
            "title": "Roland: TR-808 in Love Lockdown",
            "url": "https://articles.roland.com/love-lockdown-kanye-west/"
          }
        ]
      },
      {
        "type": "music",
        "title": "Blade Runner Blues",
        "artist": "Vangelis",
        "album": "Blade Runner soundtrack",
        "context": "Trace the synth line’s pitch slides; the recording does not by itself identify the control used. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.youtube.com/watch?v=ECYLHiXvrBQ",
        "youtubeId": "ECYLHiXvrBQ",
        "endSeconds": 300
      },
      {
        "type": "music",
        "title": "Love Lockdown",
        "artist": "Kanye West",
        "album": "808s & Heartbreak",
        "context": "Separate the low electronic pulse from the chorus percussion. Listen for tonal decay without asserting tuned toms. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": "https://articles.roland.com/love-lockdown-kanye-west/",
        "youtubeId": null,
        "endSeconds": null
      }
    ],
    "extra": ""
  },
  {
    "title": "Leaving the twelve",
    "subtitle": "Minimalism · microtonal rock · electronic · avant-garde",
    "duration": "~28 min",
    "sequence": "interleaved",
    "segments": [
      {
        "type": "narration",
        "title": "5A · Retuning the familiar instrument",
        "text": "A piano's keyboard looks like a fixed map: twelve familiar pitch classes repeating in octaves. Retune the strings and the map's appearance stays the same while its relationships change. You do not need more keys to leave equal temperament. You need a different assignment of frequencies to the keys you already have.\n\nLa Monte Young's The Well-Tuned Piano makes just intonation the foundation for an extended musical world. Listen for how repeated figures and sustained resonance invite you inside a sonority. Some upper pitches may become perceptually distinct as harmonics reinforce each other. Rapid repeated notes can also blur into a continuous field. Avoid treating every emergent sensation as a new note that has somehow appeared from nothing.\n\nThe title invites comparison with Bach's Well-Tempered Clavier, but well-tuned and well-tempered describe different priorities here. Temperament adjusts interval relationships to make a practical system; Young chooses a specific network of ratios and composes through what it makes possible. Just intonation is a family of systems rather than one universal scale.\n\nThe Theatre of Eternal Music supplies the link back to John Cale's drone practice. Historical accounts of the ensemble also involve differing views of authorship and collaboration. The listening connection is clear enough: long duration lets small interactions between sustained tones become a large part of the experience.\n\nWhat to listen for: give one passage ten uninterrupted minutes. Attend to the residual sound after an attack and to upper pitches inside a dense repeating figure. Try describing the chord's interior rather than following a tune. The excerpt is a doorway into a much longer work.",
        "sources": [
          {
            "title": "MELA: authorized edition and performance",
            "url": "https://www.melafoundation.org/TWTP2018.html"
          },
          {
            "title": "Theatre of Eternal Music notes",
            "url": "https://www.melafoundation.org/theatre.pdf"
          }
        ]
      },
      {
        "type": "music",
        "title": "The Well-Tuned Piano (excerpt)",
        "artist": "La Monte Young",
        "album": "Choose a documented performance; start with ten minutes",
        "context": "Follow resonance and upper partials within repeated figures. Different performances are not interchangeable timestamps. Suggested listening window: 10 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 10,
        "sourceUrl": "https://www.melafoundation.org/TWTP2018.html",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "5B · More steps, or a different staircase",
        "text": "There are at least two ways to expand a pitch map. You can add positions between familiar notes, or you can redesign the interval system itself. Those choices can produce very different listening experiences. An extra fret on a guitar does not imply that its music uses every available new pitch equally.\n\nTwenty-four-tone equal temperament divides the octave into twenty-four equal steps of fifty cents each. Its quarter-tones bisect the usual semitones. It is still a temperament: more steps do not automatically make every harmonic ratio exact. A musician may use only a small selection of those positions to build a distinctive scale.\n\nKing Gizzard's microtonal guitars make selected between-key positions available while preserving the force of riffs and repetition. “Rattlesnake” is useful because a recurring pattern gives your ear repeated chances to learn its intervals. Listen for notes that initially feel unfamiliar and then become stable landmarks. Describe the chosen pattern rather than assuming a complete chromatic tour of twenty-four pitches.\n\nWendy Carlos goes further in “Beauty in the Beast.” Her own notes identify Alpha and Beta scales in the title track. These divide intervals into equal steps that do not preserve the conventional octave framework in the usual way. It is a different design problem from adding quarter-tones to a familiar octave. Her electronic timbres can make unfamiliar interval relationships feel like the native language of the piece.\n\nWhat to listen for: in King Gizzard, learn a repeated riff until its altered intervals stop feeling accidental. In Carlos, follow a melodic phrase and notice how it stays coherent while resisting the keyboard map you expect.",
        "sources": [
          {
            "title": "King Gizzard: album",
            "url": "https://kinggizzardandthelizardwizard.com/release/flying-microtonal-banana"
          },
          {
            "title": "Eastwood: microtonal guitar design",
            "url": "https://eastwoodguitars.com/products/sg2c-flying-banana-mt"
          },
          {
            "title": "Carlos: title-track scale notes",
            "url": "https://www.wendycarlos.com/+bitb.html"
          }
        ]
      },
      {
        "type": "music",
        "title": "Rattlesnake",
        "artist": "King Gizzard & the Lizard Wizard",
        "album": "Flying Microtonal Banana",
        "context": "Learn the repeated riff’s between-key positions. Additional frets do not imply every pitch of 24-TET is used. Suggested listening window: 6 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 6,
        "sourceUrl": "https://kinggizzardandthelizardwizard.com/release/flying-microtonal-banana",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Beauty in the Beast",
        "artist": "Wendy Carlos",
        "album": "Beauty in the Beast",
        "context": "The title track uses Alpha and Beta; compare its interval vocabulary with quarter-tone rock. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": "https://www.wendycarlos.com/+bitb.html",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "5C · An instrument built around speech",
        "text": "If your desired pitches do not fit an existing instrument, you can change the instrument. Harry Partch pursued that possibility through a body of custom instruments and a just-intonation system often summarized as forty-three tones per octave. Those forty-three positions are unequal: this is not forty-three-tone equal temperament.\n\nThe number alone can distract from the musical purpose. A scale is a set of resources, not an instruction to use every pitch in every phrase. Partch's instruments turn relationships into physical places a performer can reach. Different materials and playing actions also give those pitches distinctive colors. Instrument design joins tuning design.\n\nBarstow draws on inscriptions left by hitchhikers. Listen to how words become melodic shapes while retaining the timing and inflection of speech. Everyday speech moves in pitch without dividing itself into piano semitones. A composition can stylize that motion and preserve its character. The result may sound unfamiliar as a conventional song while making sense as heightened speaking.\n\nThe work exists in multiple versions with different instrumental forces. Choose a documented recording and begin with a short opening excerpt; do not compare two versions as if the tuning were their only difference. Partch's own involvement in a recording helps establish which version and performance practice you are hearing.\n\nWhat to listen for: take two or three minutes. Follow the shape of one spoken phrase into its sung contour, then listen to an instrumental response. Ask how the unfamiliar pitch helps carry the word's emphasis. Return to the phrase once its meaning is familiar.",
        "sources": [
          {
            "title": "Partch archive: versions and recordings",
            "url": "https://www.corporeal.com/7barstow.html"
          },
          {
            "title": "Schott: composer and works",
            "url": "https://schott-production.s3.eu-central-1.amazonaws.com/public_content/contributor/38574/ewve/Harry_Partch_EN.pdf"
          }
        ]
      },
      {
        "type": "music",
        "title": "Barstow (opening excerpt)",
        "artist": "Harry Partch",
        "album": "Choose a documented version · The World of Harry Partch is one option",
        "context": "Hear speech-shaped melody and custom timbre. Keep the first encounter to three minutes. Suggested listening window: 3 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 3,
        "sourceUrl": "https://www.corporeal.com/7barstow.html",
        "youtubeId": null,
        "endSeconds": null
      }
    ],
    "extra": "Optional whole album: King Gizzard & the Lizard Wizard, Flying Microtonal Banana. Allow about 40 minutes; edition timings vary."
  },
  {
    "title": "Overtones as material",
    "subtitle": "Spectral · IDM · trance · pop",
    "duration": "~27 min",
    "sequence": "interleaved",
    "segments": [
      {
        "type": "narration",
        "title": "6A · A note becomes an ensemble",
        "text": "In Session 1, several frequencies fused into a single voice. Imagine reversing the process: assign components of a harmonic spectrum to different instruments and let the ensemble behave like one changing sound. The boundary between timbre and harmony starts to blur. A chord becomes the inside of a note, spread across musicians.\n\nSpectral approaches to composition attend to frequency relationships, the behavior of sound over time, and perception. A spectrum is more than a list of pitches: partials have different strengths, attacks, and decay patterns. Orchestration can model those differences and then transform them. The ensemble need not reproduce a natural sound faithfully to make the connection audible.\n\nThe opening of Grisey's Partiels gives you a low reference and a recurring, spectrum-like bloom around it. Listen for how the higher instrumental components fuse with or separate from the bass. That perceptual movement is the lesson: several played notes can behave like one timbre, then become an unstable chord.\n\nA familiar account says Grisey measured a trombone spectrum and directly orchestrated it for this opening. IRCAM's archival research challenges that story, reporting that no trombone sound served as the model for Partiels. We can hear and discuss the harmonic-spectrum construction without treating that attractive origin story as established fact.\n\nWhat to listen for: hear the first few minutes twice. First treat the ensemble as one large instrument. Then listen for separate components inside it. Recall Hefele's upper whistle emerging from the voice: the direction of attention is similar even though the musical method is different.",
        "sources": [
          {
            "title": "IRCAM: work and instrumentation",
            "url": "https://medias.ircam.fr/fr/work/partiels"
          },
          {
            "title": "IRCAM: archival research on spectral models",
            "url": "https://brahms4.ircam.fr/en/media/xc3f6d1_francois-xavier-feron-lexploration-musi"
          }
        ]
      },
      {
        "type": "music",
        "title": "Partiels (opening)",
        "artist": "Gérard Grisey",
        "album": "For eighteen musicians · choose a documented ensemble recording",
        "context": "Hear the low reference and the spectrum-like instrumental bloom. Avoid the disputed measured-trombone origin story. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://medias.ircam.fr/fr/work/partiels",
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "6B · A little instability becomes a texture",
        "text": "Two nearly identical oscillator frequencies produce a slowly changing relationship. Their peaks sometimes reinforce each other and sometimes partially cancel. Add several oscillators with small offsets and the result has a moving interior: one played note can feel wide, animated, or shimmering. This is the beating from Session 2 used as a sound-design resource.\n\nRoland's JP-8000 Super Saw combines seven detuned sawtooth waves. Because each saw has many harmonics, the interaction happens across a rich spectrum. The effect is not merely seven sine waves beating at one rate. More detune changes the texture, and envelope, filter, effects, and stereo placement change the perceived width too.\n\nSystem F's “Out of the Blue” provides a trance listening example for a broad, animated lead. Treat “supersaw-like” as a description of what to listen for here, not a verified claim about the precise hardware or patch in the master recording. The manufacturer documents the synthesis principle; the recording gives you a musical setting in which to hear that family of textures.\n\nBoards of Canada's “Roygbiv” gives a softer comparison. Listen for the sense of unstable pitch and aged texture. Tape-speed variation can change pitch over time, but a recording's wobble can also come from deliberate synthesis or modulation. Your ears can describe the movement without proving the entire production chain.\n\nWhat to listen for: follow one sustained or repeating synth voice and listen inside it. Compare the gentle instability in Boards of Canada with the broad lead in System F. Decide whether you hear a moving center pitch, internal beating, or both.",
        "sources": [
          {
            "title": "Roland: seven detuned saws",
            "url": "https://www.roland.com/global/products/jp-8000/"
          }
        ]
      },
      {
        "type": "music",
        "title": "Roygbiv",
        "artist": "Boards of Canada",
        "album": "Music Has the Right to Children",
        "context": "Listen for small pitch fluctuations and worn texture; the exact tape or modulation process is not established here. Suggested listening window: 3 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 3,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "music",
        "title": "Out of the Blue",
        "artist": "System F · Ferry Corsten",
        "album": "Choose the original mix or official video",
        "context": "Hear the animated, broad trance lead. “Supersaw-like” describes a sound, not a confirmed patch. Suggested listening window: 4 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 4,
        "sourceUrl": null,
        "youtubeId": null,
        "endSeconds": null
      },
      {
        "type": "narration",
        "title": "6C · One voice, a chord around it",
        "text": "A harmony processor can derive additional pitches from one incoming voice. Pitch shifting changes the frequency structure of copies, while a keyboard or other control can specify the desired chord. The copies can share the original rhythm and articulation so closely that the chord sounds like one impossible throat. This returns us to the course's first question: how many pitches can live inside one apparent voice?\n\nA vocoder works differently. It analyzes spectral features of a modulator, often speech, and imposes them on a carrier, often a synthesizer. The carrier supplies its own pitches while the voice supplies an articulation pattern. A harmonizer shifts or generates related vocal pitches; a vocoder transfers spectral shape. Their musical effects can overlap, so a robotic sound alone does not identify the processor.\n\nImogen Heap's “Hide and Seek” makes the fused vocal chord the foreground. Listen for consonants opening and closing several pitches together and for the relationship between the prominent line and the surrounding stack. The useful task is hearing shared articulation, not counting imaginary backup singers.\n\nJacob Collier's “Hideaway” adds a comparison with a densely arranged, layered vocal world. The official recording confirms his authorship and performance, but this lesson does not assert a particular harmonizer or exact microtonal offset in that track. Independent vocal layers can create a different sense of space from electronically derived copies of one input.\n\nWhat to listen for: compare the synchronization of consonants, the stability of held chords, and the way individual lines emerge. End by comparing the vocal chord with Session 1's overtone singing. Existing harmonics, added voices, and pitch-shifted copies are different routes to a similar perceptual puzzle.",
        "sources": [
          {
            "title": "Heap: official recording",
            "url": "https://www.youtube.com/watch?v=UYIAfiVGluk"
          },
          {
            "title": "Collier: official recording and credits",
            "url": "https://www.youtube.com/watch?v=4v3zyPEy-Po"
          }
        ]
      },
      {
        "type": "music",
        "title": "Hide and Seek",
        "artist": "Imogen Heap",
        "album": "Speak for Yourself",
        "context": "Listen for one articulation shared across a chord of vocal pitches. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.youtube.com/watch?v=UYIAfiVGluk",
        "youtubeId": "UYIAfiVGluk",
        "endSeconds": 300
      },
      {
        "type": "music",
        "title": "Hideaway",
        "artist": "Jacob Collier",
        "album": "In My Room",
        "context": "Compare the layered arrangement with Heap’s fused vocal chords. Exact tuning offsets and processor use are not asserted. Suggested listening window: 5 minutes; this is an excerpt budget, not the release duration.",
        "listenMinutes": 5,
        "sourceUrl": "https://www.youtube.com/watch?v=4v3zyPEy-Po",
        "youtubeId": "4v3zyPEy-Po",
        "endSeconds": 300
      }
    ],
    "extra": ""
  }
];
