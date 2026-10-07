/* ============================================
   House as Continuation - Session Data
   ============================================
   A six-session history of house music: how it was built, by whom,
   on what machines, out of what older music.

   Narration follows STYLE.md (measured-historian tone, set 2026-07-09).

   Each session: { title, subtitle, duration, segments[] }
   Each segment (played IN AUTHORED ORDER — narration and music interleave):
     { type: 'narration', title, text, audioSeconds? }
     { type: 'music', title, artist, album, context, youtubeId, duration }

   `audioSeconds` on a narration = exact measured MP3 length (stamped after
   rendering). If absent, the UI estimates from word count. `duration` on a
   music segment is the track length in seconds. Every music segment needs a
   real, embeddable `youtubeId` for the hands-free run to play it.
*/

// YouTube video ID lookup. IDs here override a segment's inline youtubeId.
// Real canonical uploads found by search; confirm embeddability in-browser.
const HOUSE_YOUTUBE_IDS = {
    // Session 1 — The Soul/Gospel DNA
    "You Brought the Sunshine": "9_FGDkK-xXo", // Clark Sisters, 1981 long vocal version
    "Love Sensation": "1h6Su3t5Lqs",           // Loleatta Holloway, 1980 original
    "Let No Man Put Asunder": "gi5OHd4J2e8",   // First Choice, Salsoul 1977 original
    "Love Is the Message": "M3wpG6Rw-tE",      // MFSB, official audio ft. The Three Degrees
    "Someday": "icBCp4VfZk8",                  // CeCe Rogers, 12" club mix, 1987
    "Promised Land": "gDEpeE9HCrs",            // Joe Smooth ft. Anthony Thomas, 1987 original

    // Session 2 — The Machines
    "Trans-Europe Express": "zwkgI2dSjfA",     // Kraftwerk, official HD
    "I Feel Love": "uKcU_n_d9cI",              // Donna Summer / Giorgio Moroder, official
    "Firecracker": "OkkFST5qrLg",              // Yellow Magic Orchestra, 1978
    "Planet Rock": "9J3lwZjHenA",              // Afrika Bambaataa & Soulsonic Force, official HD
    "Clear": "zv24xpbzo5g",                    // Cybotron (Juan Atkins), 1983

    // Session 3 — Chicago
    "Your Love": "MG2l_YzXj4w",                // Frankie Knuckles & Jamie Principle, 1987
    "On and On": "VAJU6JsZRPo",                // Jesse Saunders, 1984 (first house record)
    "Jack Your Body": "ZaHUK5GnDgE",           // Steve "Silk" Hurley, 1986
    "No Way Back": "8E72B9Qaed0",              // Adonis, Trax, 1986
    "Move Your Body": "MRgcDRcic_A",           // Marshall Jefferson, 1986 (12" mix)

    // Session 4 — Acid vs. Deep
    "Acid Tracks": "9cDhpZQnNMY",              // Phuture, Trax, 1987
    "I've Lost Control": "6vK2H2Org5Y",        // Sleezy D, Trax, 1986
    "151": "1Y8l8VowkGQ",                      // Armando, 1988
    "Can You Feel It": "yn4HQmXyrM0",          // Mr. Fingers (Larry Heard), Trax, 1986
    "Mystery of Love": "EKqeABZG0Pw",          // Fingers Inc. ft. Robert Owens, DJ International, 1985

    // Session 5 — Cross-Atlantic Transformation
    "Good Life": "_8bjmTLPNFA",                // Inner City (Kevin Saunderson/Paris Grey), 1988
    "Pump Up the Volume": "w9gOQgfPW4Y",       // M/A/R/R/S, 4AD, 1987, official video
    "Theme from S'Express": "h7A_98i-INk",     // S'Express, 1988, 12" overture version
    "Voodoo Ray": "ZQk7IR7TpkU",               // A Guy Called Gerald, Rham!, 1988, original mix
    "Pacific State": "6jQ_bOP0HfY",            // 808 State, 1989
    "Chime": "HXU5Rxc3vBQ",                    // Orbital, 1989, 12" version

    // Session 6 — Where It Lives Now
    "What They Say": "z3Ns6PuDqOc",            // Maya Jane Coles, official Topic upload
    "Losing It": "u31thuMehjM",                // FISHER official audio
    "Superman": "w6-tR3PKCHA",                 // Black Coffee ft. Bucie, official Topic upload
    "Ke Star": "_WcA7WpI-9c",                  // Focalistic ft. Vigro Deep, Africori official audio
    "BREAK MY SOUL": "iz1rIp1-b-Y",            // Beyonce, BeyonceVEVO official visualizer
    "Jerusalema": "fCZVL_8D048",               // Master KG ft. Nomcebo, Open Mic Productions official
};

const HOUSE_SESSIONS = [

// =============================================
// SESSION 1: The Soul/Gospel DNA
// =============================================
{
    title: "The Soul/Gospel DNA",
    subtitle: "What house was built out of — gospel, Philadelphia soul, and the disco machinery of the 1970s",
    duration: null,
    segments: [
        {
            type: "narration",
            title: "What House Is Made Of",
            audioSeconds: 89,
            text: `House music has a birthdate and a birthplace: the early 1980s, in a Chicago club called the Warehouse, which is where the name comes from. A genre is never invented from nothing, though. House was assembled out of specific older parts, by specific people, using specific machines. This first session is an inventory of those parts. Before we reach a single drum machine, it helps to know what house is a machine-made copy of.

Start with the shape of the music. A house record runs at roughly 118 to 128 beats per minute. Its spine is a bass drum on every quarter note, four to the bar — the pattern we'll call four-on-the-floor. Over that sits an open hi-hat on the offbeats, a snare or handclap on beats two and four, a repeating bassline, and usually a vocal or keyboard figure looped rather than sung through once. It is built to be mixed by a DJ, so it runs long, and it is arranged as a series of layers added and stripped away rather than as verses and choruses.

Almost every one of those features already existed, fully formed, in Black American music of the 1960s and 70s, in the gospel church and in disco. House did not break from that music; it rebuilt it on cheaper equipment. Over the next hour we will take the parts one at a time: the gospel vocal, the Philadelphia rhythm section, the twelve-inch single, and the sampled voice. We begin in the church.`
        },
        {
            type: "narration",
            title: "The Gospel Engine: the Vamp and the Organ",
            audioSeconds: 95,
            text: `Modern gospel was, to a striking degree, the invention of one man in Chicago: Thomas A. Dorsey, a former blues pianist who in the 1930s began setting sacred lyrics to blues and jazz phrasing at Pilgrim Baptist Church. He wrote "Take My Hand, Precious Lord." He is the reason the Black gospel sound exists in the form we know, and he built it a few miles from where house would later be born.

Two features of that music carry directly into house. The first is an instrument: the Hammond organ, usually a B-3 played through a rotating Leslie speaker, which gives gospel its churning, swelling sustain. The second is a structure that gospel calls the vamp, or sometimes the drive. At the emotional peak of a gospel song the verses stop, the choir locks onto a single short phrase and repeats it while the lead singer improvises over the top and the organ climbs. That repeated, open-ended, build-toward-ecstasy section is the goal of the song rather than an ornament on it. A looped house groove with a DJ working over it is the same device, with a drum machine in the organ's chair.

The other inheritance is call-and-response: the leader states a line and the group answers it, a technique retained from West African music through the spirituals into gospel. Listen for both in this record. The Clark Sisters were a Detroit gospel family, and "You Brought the Sunshine," from 1981, is gospel that crossed onto the dance floor. Notice how much of the track is a single phrase repeating and building — that is the vamp — and how the lead voice trades against the group.`
        },
        {
            type: "music",
            title: "You Brought the Sunshine",
            artist: "The Clark Sisters",
            album: "You Brought the Sunshine (1981)",
            context: "A gospel record that became a club record. Listen for the vamp — long stretches where one phrase repeats and builds rather than moving to a new section — and the lead-versus-group call-and-response. Both carry into house.",
            youtubeId: null,
            duration: 380
        },
        {
            type: "narration",
            title: "Philadelphia and the Invention of Four-on-the-Floor",
            audioSeconds: 94,
            text: `Now the rhythm. The four-on-the-floor kick that defines house was not invented in house, or even in disco proper. It was worked out by a drummer named Earl Young in Philadelphia around 1973.

Before Young, dance rhythm sections mostly kept time on the hi-hat and snare and let the bass drum accent selectively. Young, playing on records for Gamble and Huff's Philadelphia International label, put the bass drum on all four beats, steady and insistent, and opened the hi-hat on the upbeats, the "tss" between the kicks, to keep the top end moving. An early version of it drives Harold Melvin and the Blue Notes' "The Love I Lost." That pattern became the disco beat, and it is the same pattern a drum machine would later be programmed to play in house.

Around that kick, Philadelphia International built an orchestra. Their house band, MFSB — more than thirty musicians at Sigma Sound Studios — layered strings and horns over Young's rhythm section. This is the sound of Philadelphia. The record we are about to hear, MFSB's "Love Is the Message" from 1973, became one of the most important instrumentals in dance music; David Mancuso and other early New York DJs played it as a centerpiece of the night. Listen past the strings to the engine underneath: the bass drum on all four beats, the hi-hat opening on the upbeats. That is the template house inherits.`
        },
        {
            type: "music",
            title: "Love Is the Message",
            artist: "MFSB",
            album: "Love Is the Message (Philadelphia International, 1973)",
            context: "The Philadelphia International house band. Ignore the strings for a moment and lock onto the drums: bass drum on all four beats, hi-hat opening on the upbeats. That is Earl Young's disco beat — the same rhythm a house drum machine plays a decade later.",
            youtubeId: null,
            duration: 357
        },
        {
            type: "narration",
            title: "The Twelve-Inch and the Remix",
            audioSeconds: 86,
            text: `A house track is long, six to ten minutes, and arranged as layers a DJ can ride. That format came from a technological and commercial invention of the mid-1970s: the twelve-inch single and the remix.

The central figure is Tom Moulton, a producer often called the father of the remix. Working with dance records, Moulton wanted more room on the disc for louder, longer grooves, and in 1975 an engineer cut one of his mixes onto a wide twelve-inch blank instead of a seven-inch. The extra space allowed a louder, longer cut. The first commercially released twelve-inch single, Double Exposure's "Ten Percent" on Salsoul in 1976, was remixed by a DJ named Walter Gibbons. Moulton is also credited with popularizing the breakdown, the passage where the arrangement strips back to percussion and bass before building again. The breakdown is the gospel vamp rediscovered by dance producers, and it is the point where a modern house track drops.

By the late 1970s the toolkit was in place: extended instrumental versions, DJ remixes, the breakdown, the twelve-inch. Salsoul Records in New York sat at the center of it. Here is First Choice's "Let No Man Put Asunder," a 1977 Philadelphia-soul record whose later remixes made it a foundational club and house record. Listen to how the hook is built to repeat, and how the arrangement is already shaped like a loop.`
        },
        {
            type: "music",
            title: "Let No Man Put Asunder",
            artist: "First Choice",
            album: "Delusions (Salsoul, 1977)",
            context: "A Salsoul record later remixed into a club staple. Hear how the vocal hook is written to be repeated, and how the arrangement opens into breakdown-and-build sections — the remixer's toolkit that house producers inherit wholesale.",
            youtubeId: null,
            duration: 390
        },
        {
            type: "narration",
            title: "The Voice as an Instrument — and the Sample",
            audioSeconds: 89,
            text: `The last part of the inventory is the voice, and what technology did to it. Disco and soul singers of this era were mostly trained in the church, and they brought its techniques with them: melisma, the stretching of one syllable across many notes, and the shout, the raw ad-libbed cries of the gospel climax. Loleatta Holloway is the clearest example. She sang in a gospel group before she recorded "Love Sensation" in 1980, and the track is largely a showcase for a gospel voice set loose over a disco rhythm section.

Then the technology changed. In the early 1980s the sampler arrived — the E-mu Emulator in 1981, later the cheaper Akai models — a keyboard that records a snippet of sound and plays it back at any pitch, as often as you want. A producer could now take four seconds of Loleatta Holloway and trigger it indefinitely. In 1989 the Italian group Black Box did exactly that: their hit "Ride on Time" is built on her "Love Sensation" vocal, used without permission and without initial credit, and it took a lawsuit to settle. A Black gospel-trained woman's recorded labor became the raw material for other people's hit, an injustice worth naming plainly, and the same pattern recurs repeatedly as this music travels. Hear the mechanism as well: sampling turns a sung performance into a loop. The gospel vamp, once produced by a choir repeating a line, is now produced by a machine repeating a recording. Here is the voice, before the machines got hold of it.`
        },
        {
            type: "music",
            title: "Love Sensation",
            artist: "Loleatta Holloway",
            album: "Loleatta (Salsoul, 1980)",
            context: "A gospel-trained voice over a disco rhythm section — melisma and shouts straight from church. Nine years later a four-second slice of this vocal, looped by a sampler, becomes Black Box's 'Ride on Time.' This is the raw material house learned to cut up.",
            youtubeId: null,
            duration: 366
        },
        {
            type: "narration",
            title: "When the Parts Become House",
            audioSeconds: 72,
            text: `The inventory is now complete: a four-on-the-floor kick from Philadelphia, an open hi-hat, an orchestra's worth of strings that a young DJ could no longer afford, the breakdown-and-build of the twelve-inch, and a gospel voice that a sampler could loop. Replace the Philadelphia rhythm section with a drum machine and the orchestra with a synthesizer, and the result is house. That substitution is the subject of the next session, but it is worth hearing an early house record that keeps the gospel content fully intact, so the continuity is audible.

By 1987 Chicago producers were making original tracks, and some reached deliberately back to the church. CeCe Rogers' "Someday," produced by Marshall Jefferson, is built like a gospel song: a promise of deliverance, "someday we'll all be free," sung over a drum machine and a piano playing gospel chords. Neither the sentiment nor the vocal is new. What is new is the instrumentation beneath them — the choir and the Hammond organ replaced by a Roland drum machine and a synth. Listen to how little distance separates this from the Clark Sisters record you heard at the start.`
        },
        {
            type: "music",
            title: "Someday",
            artist: "CeCe Rogers",
            album: "Someday (1987)",
            context: "Early Chicago house, produced by Marshall Jefferson. A gospel song in every respect but its instruments — the promise of deliverance, the piano's gospel chords, the churchy vocal — now carried by a drum machine instead of a choir.",
            youtubeId: null,
            duration: 420
        },
        {
            type: "narration",
            title: "Where This Leaves Us",
            audioSeconds: 81,
            text: `We have now laid out house's raw materials: the gospel vamp and voice, the Philadelphia four-on-the-floor, the strings-and-horns orchestration, and the twelve-inch remix culture that made records long and DJ-shaped. House kept every one of these rather than discarding them.

One piece has been left out, and it is the piece that makes house sound like house rather than like disco: the machines. Disco was played by musicians. House is played by drum machines and synthesizers, and it not only tolerates but foregrounds the fact that it sounds electronic. That embrace of the obviously artificial did not come from gospel or Philadelphia soul. It came from elsewhere — from a group of art-school Germans, a Japanese synth-pop trio, and a few discontinued Roland machines that almost nobody wanted.

That is the next session. We will take the drum machine apart, find out why sounds designed to be rejected became the foundation of a genre, and follow the path by which cold European electronic music reached Black musicians in Detroit and Chicago. To close, here is one more piece of gospel-shaped house: Joe Smooth's "Promised Land," from 1987.`
        },
        {
            type: "music",
            title: "Promised Land",
            artist: "Joe Smooth",
            album: "Promised Land (DJ International, 1987)",
            context: "A 1987 Chicago house record carrying openly gospel content — a promised land, brothers and sisters — over the machine rhythm. Carry the question into Session 2: where did the machine sound itself come from?",
            youtubeId: null,
            duration: 390
        }
    ]
},

// =============================================
// SESSION 2: The Machines
// =============================================
{
    title: "The Machines",
    subtitle: "The drum machines, synthesizers, and sequencers that made house sound electronic — and how they reached Chicago and Detroit",
    duration: null,
    segments: [
        {
            type: "narration",
            title: "The Problem Disco Left Behind",
            audioSeconds: 83,
            text: `Session 1 assembled the body of the music and left out its engine. House carries all of disco's and gospel's material, but disco was played by musicians — Earl Young at the drums, thirty players in MFSB — while house is played by machines. This session is about those machines: what they are, how they work, and why they sound the way they do. By the end you should be able to describe in concrete terms how a house track is built.

There was also a practical reason the machines took over, and it has a date: July 12th, 1979. At Comiskey Park in Chicago, a radio promotion called Disco Demolition Night blew up a crate of disco records between games of a baseball doubleheader; the field was stormed and the second game was canceled. Disco was Black, Latino, and gay music, and the backlash was not subtle about what it was rejecting. Commercially, the major labels fled disco within months, and the lush studio orchestras stopped being funded. A young DJ on the South Side of Chicago who still wanted that four-on-the-floor could no longer count on a steady supply of new disco records, and could certainly not hire MFSB. The music had to be made cheaply, which meant machines. The machine sound itself came from an unlikely place: Düsseldorf.`
        },
        {
            type: "narration",
            title: "Kraftwerk and the Man-Machine",
            audioSeconds: 91,
            text: `Kraftwerk were two art-school musicians from Düsseldorf, Ralf Hütter and Florian Schneider, working in their own studio, Kling Klang. Across a run of albums in the 1970s — "Autobahn" in 1974, "Trans-Europe Express" in 1977, "The Man-Machine" in 1978, "Computer World" in 1981 — they reduced popular music to sequenced synthesizer lines, robotic vocals fed through vocoders, and rigid electronic percussion. They did not hide the artifice; they made it the subject, dressing as mannequins and singing about being robots.

To much of the white American rock audience this registered as novelty: cold, stiff, foreign. To a generation of young Black musicians in Detroit and Chicago it sounded like the future, and specifically like a future they could build themselves. Juan Atkins, whom we will meet at the end of this session, later said of Kraftwerk that they were so stiff they were funky. The machine precision that rock heard as lifeless, these musicians heard as a new kind of funk, a groove built from grid and repetition rather than from human sway.

Listen to "Trans-Europe Express." The rhythm is a machine pulse, the melody is a short sequenced phrase repeating with small variations, and the whole thing rides a groove because of its stiffness rather than despite it. The metallic main riff is worth holding in memory; a New York producer samples it two tracks from now.`
        },
        {
            type: "music",
            title: "Trans-Europe Express",
            artist: "Kraftwerk",
            album: "Trans-Europe Express (1977)",
            context: "Machine rhythm, a short sequenced melodic phrase repeating, vocals through a vocoder. Hear it as Detroit heard it — not cold but funky, a groove built from grid and repetition. The metallic main riff returns, sampled, in a record two tracks from now.",
            youtubeId: null,
            duration: 395
        },
        {
            type: "narration",
            title: "The Sequencer: How 'I Feel Love' Was Built",
            audioSeconds: 76,
            text: `Kraftwerk supplied the attitude. A producer in Munich supplied the proof that a fully electronic record could hold a dance floor. In 1977 Giorgio Moroder produced Donna Summer's "I Feel Love," and its backing track contains no band at all. The pulsing bassline, those hypnotic sixteenth notes, is a Moog modular synthesizer driven by a sequencer.

The sequencer is the device to understand here, because it is the brain of this music. A sequencer stores a series of notes or triggers as a pattern and plays them back automatically, in perfect time, at whatever tempo you set. Moroder programmed a short bass pattern into the Moog's sequencer and let it run, and the machine played it more evenly and tirelessly than any bassist could. Over the top, Donna Summer's voice, gospel-derived again, floats human against the machine grid, and the contrast between the two carries the record. Brian Eno reportedly ran into the studio where he and David Bowie were working, held the single up, and announced it was the sound of the future. Strip the vocal and "I Feel Love" is a techno record made in 1977. Here the machine carries the groove on its own.`
        },
        {
            type: "music",
            title: "I Feel Love",
            artist: "Donna Summer",
            album: "I Remember Yesterday (1977)",
            context: "There is no band here. The pulsing bassline is a Moog modular synthesizer driven by a sequencer — a pattern programmed once and played back tirelessly. A gospel-derived voice floats over a machine grid. This is the blueprint for electronic dance music.",
            youtubeId: null,
            duration: 355
        },
        {
            type: "narration",
            title: "The Drum Machine: Inside the Roland TR-808",
            audioSeconds: 99,
            text: `Now the central object of this story: the drum machine, and specifically the Roland TR-808, released in 1980. It works like this. A row of buttons, usually sixteen, represents the sixteen sixteenth-notes in a bar. You choose a drum sound — kick, snare, clap, hi-hat, cowbell — and press the buttons where you want that sound to fall. The machine then loops the bar in perfect time. Program a kick on steps 1, 5, 9, and 13 and you have four-on-the-floor, instantly and indefinitely, with no drummer. That grid of steps is how nearly all house and techno is still programmed today.

The 808's sounds are not recordings of real drums. Roland generated them with analog circuitry: the kick is essentially a tuned sine wave with a long decay, the snare is filtered noise. As a result the 808 sounds nothing like an acoustic kit. Its booming, elastic kick and thin ticking hi-hats sound synthetic, and in 1980 that was treated as a defect. The 808 sold poorly, and Roland discontinued it in 1983. Its commercial failure is what put it within reach: unwanted 808s flooded the secondhand market for a couple of hundred dollars and landed with the broke young musicians who needed them. They did not hear a failed imitation of drums; they heard a new instrument. Here is an early, elegant use of it — Yellow Magic Orchestra, the Japanese trio who were among the first to build pop around the 808, in 1978.`
        },
        {
            type: "music",
            title: "Firecracker",
            artist: "Yellow Magic Orchestra",
            album: "Yellow Magic Orchestra (1978)",
            context: "Among the earliest pop records built on the Roland machines. Listen to the drum sounds themselves — synthetic, obviously electronic, nothing like an acoustic kit. The 'fakeness' that made the 808 a commercial flop is exactly the texture that house would embrace.",
            youtubeId: null,
            duration: 284
        },
        {
            type: "narration",
            title: "Electro: the 808 Meets the Break",
            audioSeconds: 73,
            text: `The 808 joined two worlds in a single record: Afrika Bambaataa and the Soulsonic Force's "Planet Rock," from 1982, produced by Arthur Baker and John Robie. Bambaataa was a Bronx hip-hop DJ, and hip-hop until then was built on breakbeats, the drum passages of funk records looped by hand. For "Planet Rock" the team programmed the beat on a Roland TR-808 and took the melody directly from Kraftwerk's "Trans-Europe Express," the track heard a moment ago, along with a rhythmic figure from Kraftwerk's "Numbers."

The result fused hip-hop's breakbeat culture with European synth-pop and created a genre, electro. It also broadcast the 808's booming kick and hissing hi-hats to every young producer in America. With "Planet Rock," Black American dance music absorbed the machine aesthetic as a foundation rather than a novelty, and the 808 became part of the standard vocabulary. Listen for the two elements fused here: the Kraftwerk melody, now inside a Black American dance record, and the 808 drums that define the next thirty years of the music.`
        },
        {
            type: "music",
            title: "Planet Rock",
            artist: "Afrika Bambaataa & The Soulsonic Force",
            album: "Planet Rock (Tommy Boy, 1982)",
            context: "The hinge of the whole session. The melody is Kraftwerk's 'Trans-Europe Express'; the beat is a Roland TR-808. European synth-pop and hip-hop breakbeat culture fuse into electro, and the 808 kick enters the DNA of American dance music for good.",
            youtubeId: null,
            duration: 384
        },
        {
            type: "narration",
            title: "The 909, the 303, and Detroit's Answer",
            audioSeconds: 87,
            text: `Two more Roland machines complete the palette. In 1983 Roland replaced the 808 with the TR-909. The 909 used a hybrid design, with sampled cymbals and hi-hats but an analog kick, and that kick is punchier and harder than the 808's. It became the standard kick drum of house and techno; the four-on-the-floor that thumps you in the chest on a modern record is usually a 909. The 909 also had built-in sync, so it could lock to other machines. A year earlier, in 1982, Roland had released the TB-303, a small silver box meant to fake a bass guitar for guitarists practicing alone. It did that job badly, sounding rubbery and alien, and it too was discontinued. In Session 4 that failure becomes the squelching sound of acid house.

The foundational palette of house and techno is therefore three discontinued, commercially unsuccessful Roland machines — the 808, the 909, and the 303 — bought secondhand by people the record industry had stopped serving. To close, here is what happened when a Black musician in Detroit took this machine language and made it his own. Juan Atkins, recording with Rick Davis as Cybotron, cut "Clear" in 1983: Kraftwerk's electronics joined to the funk of Parliament, built on drum machines. This is the machine aesthetic fully absorbed and repurposed, and it is the doorway to Detroit techno.`
        },
        {
            type: "music",
            title: "Clear",
            artist: "Cybotron",
            album: "Clear (Fantasy, 1983)",
            context: "Juan Atkins and Rick Davis in Detroit: Kraftwerk's machine precision welded to Parliament's funk, entirely on drum machines and synths. The European aesthetic of Session 2 is now fully in Black American hands. Next stop, the machines meet the disco DJ in Chicago.",
            youtubeId: null,
            duration: 296
        },
        {
            type: "narration",
            title: "The Room Is Set",
            audioSeconds: 66,
            text: `At the end of this session the pieces stand as follows. From Session 1 comes the body of the music: the four-on-the-floor, the gospel voice, the breakdown, the long DJ-shaped record. From Session 2 comes the engine: the sequencer that runs a pattern indefinitely, and the Roland drum machines whose deliberately artificial sounds became a virtue. There is also a cultural fact underneath it — that Black musicians in Detroit and Chicago heard funk and futurism in machines white audiences had dismissed as cold.

What remains is the moment of convergence. Someone has to stand in a particular club, in front of a particular crowd, and fuse a disco DJ's instincts with these cheap machines into original records. That happens in Chicago, at the Warehouse, in the hands of a DJ named Frankie Knuckles and the producers around him, and it begins not with making tracks but with editing records, splicing tape to rebuild disco. That is Session 3, the point where everything in these first two sessions comes together and becomes a genre with a name.`
        }
    ]
},

// =============================================
// SESSION 3: Chicago — Where It Converges
// =============================================
{
    title: "Chicago — Where It Converges",
    subtitle: "How a genre got made: tape edits at the Warehouse, drum machines under disco records, and the first original house tracks",
    duration: null,
    segments: [
        {
            type: "narration",
            title: "The Warehouse and the Name",
            audioSeconds: 88,
            text: `The first two sessions were preparation. Here the parts combine into a genre with a name, in one city and largely in one building. The city is Chicago. The building is a club at 206 South Jefferson Street called the Warehouse, and it is the source of the word "house."

The Warehouse opened in 1977. Its members were mostly Black and Latino gay men, and the night ran as one long dance, from midnight Saturday into Sunday afternoon, with no alcohol license — a sound system and a floor. To play it, the club's co-founder Robert Williams recruited a young DJ from New York named Frankie Knuckles, who had come up in the same downtown scene as the Loft and the Paradise Garage. The New York discotheque tradition — the long, guided, gospel-inflected all-nighter of Session 1 — was transplanted to Chicago in the person of one DJ.

The name came out of retail. Records that got played at the Warehouse began selling at Chicago shops, and the shorthand for the kind of music played there shortened to "house." For a while it meant only a DJ's sensibility, a way of playing records, not a way of making them. Turning it into a way of making records is the story of this session, and it starts with Frankie Knuckles doing something other than producing. It starts with editing.`
        },
        {
            type: "narration",
            title: "Frankie Knuckles, Editor",
            audioSeconds: 90,
            text: `House began as a way of playing and rebuilding records before it became a way of writing them, and Frankie Knuckles was, first, an editor.

Two pressures pushed him toward that. After the disco backlash of 1979 the major labels stopped supplying fresh dance records, so a DJ who wanted to keep a floor moving had to extend and rework what he already owned. Knuckles also wanted the records tougher and longer than they came. So he worked with reel-to-reel tape, physically cutting and splicing it to lengthen the drum breaks, loop the strong sections, and build new arrangements out of existing disco records. The DJ set became an act of composition, prepared in advance with a razor blade.

Then he added a machine. Knuckles acquired a Roland drum machine and ran it underneath the records he played, laying an extra, harder kick over the disco so the beat hit with more force. A drum machine reinforcing a played record is house in embryo — the seam where Session 1's disco body meets Session 2's machine. The sound of that period is clearest in the records Knuckles made with a singer named Jamie Principle, whose home-recorded demos circulated on cassette in the clubs for years before release. "Your Love" is built from a drum machine, a synthesizer, and a voice, with no band and no disco source. Listen to how much space it leaves open.`
        },
        {
            type: "music",
            title: "Your Love",
            artist: "Frankie Knuckles feat. Jamie Principle",
            album: "Your Love (Trax, 1987)",
            context: "Written by Jamie Principle, circulated on cassette in Chicago clubs for years before its 1987 release. No band and no disco sample — just a drum machine, a synthesizer, and a voice. This is the Knuckles sound: the machine and the song, with room to breathe.",
            youtubeId: null,
            duration: 420
        },
        {
            type: "narration",
            title: "The First Record: 'On and On'",
            audioSeconds: 71,
            text: `Editing and reinforcing existing records is one thing; pressing an original track built from scratch on machines is the step that gives house its own discography. The record usually credited as the first is Jesse Saunders' "On and On," from 1984.

Its origin is worth knowing. Saunders, a young Chicago DJ, used to spin a bootleg medley he loved, and when his copy was stolen he decided to build his own version from the ground up. With Vince Lawrence he assembled "On and On" from a drum machine, a simple synthesized bassline, and a Roland TB-303, with no live musicians, no disco record underneath, and no budget, and he pressed it himself. The track is crude, and its crudeness carries the significance: it proved that a young person with a couple of cheap machines could manufacture a dance record and put it in shops. Once "On and On" showed this was possible, Chicago produced hundreds of tracks within a few years. The barrier to making house was now the price of a used drum machine, which is why the music emerged from a poor, young, Black and brown scene rather than from a professional studio system. The discography starts here.`
        },
        {
            type: "music",
            title: "On and On",
            artist: "Jesse Saunders",
            album: "On and On (Jes Say, 1984)",
            context: "Widely cited as the first house record pressed: a drum machine, a synth bassline, and a TB-303, built from scratch by a young DJ with no budget. Listen past the crudeness to the proof of concept — a danceable record made with no band, no studio, and no permission.",
            youtubeId: null,
            duration: 300
        },
        {
            type: "narration",
            title: "Jack: the Stripped-Down Track",
            audioSeconds: 72,
            text: `The earliest house had a name for its own physical effect. To "jack" was the convulsive, machine-driven dance the music demanded, and a "jack track" was a record stripped down to little more than the machine groove: kick, hi-hat, clap, a bassline, perhaps one shouted phrase. These were not songs but functional DJ tools, and their minimalism followed directly from how they were made — one person, a drum machine, a few hours.

The reach of these spare records was considerable. Steve "Silk" Hurley's "Jack Your Body," built on little more than a programmed beat and a synth bassline, reached number one on the United Kingdom singles chart in January 1987, the first house record to top a national chart, and it did so abroad before house was established at home. Most of these records came out on two Chicago labels, Trax Records and DJ International. Trax in particular pressed on cheap, often recycled vinyl, so the records sounded thin and noisy, but they were cheap to make and cheap to buy, and they filled the city. Listen to how little is in this record, and how much it accomplishes with it.`
        },
        {
            type: "music",
            title: "Jack Your Body",
            artist: "Steve \"Silk\" Hurley",
            album: "Jack Your Body (DJ International, 1986)",
            context: "A near-instrumental — programmed beat, synth bassline, a repeated phrase — that reached number one in the UK in January 1987, the first house record to top a national chart. This is the 'jack track': maximum floor impact from minimum material.",
            youtubeId: null,
            duration: 280
        },
        {
            type: "narration",
            title: "Raw Machines: the Trax Sound",
            audioSeconds: 65,
            text: `Adonis's "No Way Back," released on Trax in 1986, shows how far the stripped-down approach could go. There is almost nothing in it: a heavy, rubbery synthesized bassline, a hard machine kick, sparse percussion, and a menacing repeated vocal. There are no chords to speak of and no melody in the ordinary sense. The record is a groove and a texture.

This is worth dwelling on as a production fact, because it inverts everything the Philadelphia orchestra of Session 1 stood for. MFSB was thirty players and a string section; "No Way Back" is one man and a couple of machines, and it is deliberately spare. Notice what survives the reduction: the four-on-the-floor kick, the insistent bassline, and an arrangement still built for a DJ to mix and a body to move to. Everything inessential to the dance has been removed, leaving the machine and the pulse. The producers treated that minimalism as the aesthetic rather than as a limitation to apologize for.`
        },
        {
            type: "music",
            title: "No Way Back",
            artist: "Adonis",
            album: "No Way Back (Trax, 1986)",
            context: "A groove and a texture, almost nothing else: rubbery synth bass, a hard kick, a menacing vocal. Hold it against MFSB from Session 1 — thirty players reduced to one man and two machines — and hear what house keeps when it strips everything away: the kick and the pulse.",
            youtubeId: null,
            duration: 360
        },
        {
            type: "narration",
            title: "Putting the Piano Back: 'Move Your Body'",
            audioSeconds: 73,
            text: `If the jack track was house subtracting, Marshall Jefferson's "Move Your Body," from 1986, was house adding something back, and it drew objections for it. Jefferson put a piano on the record: a rolling, chordal, gospel-derived riff of the kind that sits behind a church choir. Its subtitle states the ambition — "The House Music Anthem."

This was a real risk at the time. House had defined itself against the lush musicality of disco, and the jack tracks took pride in having no chords. Placing a large, emotional piano in the middle of a house record ran against that grain, and Jefferson had to push to get it released. But it tied the machine music back to the gospel and soul of Session 1, with the piano taking the role the Hammond organ held in church, and it became one of the most influential house records ever made; most later piano-house anthems descend from it. Within two years, from 1984 to 1986, Chicago had produced both poles the music would move between for decades: the stripped machine track and the euphoric, chord-driven anthem. Here is the anthem.`
        },
        {
            type: "music",
            title: "Move Your Body",
            artist: "Marshall Jefferson",
            album: "Move Your Body — The House Music Anthem (Trax, 1986)",
            context: "The record that put the piano into house — a rolling, gospel-derived riff that runs straight back to Session 1's church. A gamble at the time, since jack tracks prided themselves on having no chords. Every piano-house anthem since descends from this.",
            youtubeId: null,
            duration: 430
        },
        {
            type: "narration",
            title: "A Genre, and a Coming Split",
            audioSeconds: 80,
            text: `In roughly five years, Chicago took the disco body and gospel voice of Session 1, the drum machines and sequencers of Session 2, and a DJ-editing sensibility, and combined them into a self-sustaining genre: original records, made cheaply by the people who danced to them, released on local labels, with a name, a dance, and by 1987 a number-one single abroad. House was no longer a way of playing other people's records. It was something you made.

A tension has already appeared within this one session, between Adonis's stripped, raw machine track and Marshall Jefferson's lush piano anthem. It is structural rather than incidental: the same scene, working with the same cheap machines, pulled in two directions at once, toward the coldest and most abrasive possibilities of the technology and toward the warmest and most musical ones. The next session follows that split as it hardens into two named subgenres, acid house on one side and deep house on the other, and it examines the specific machine, the Roland TB-303, whose accidental misuse created an entire sound. The same city, the same years, and opposite instincts — that is Session 4.`
        }
    ]
},

// =============================================
// SESSION 4: Subgenre Fork — Acid vs. Deep
// =============================================
{
    title: "Subgenre Fork — Acid vs. Deep",
    subtitle: "One machine, two directions: the TB-303's acid squelch versus Larry Heard's jazz chords",
    duration: null,
    segments: [
        {
            type: "narration",
            title: "One Scene, Two Instincts",
            audioSeconds: 67,
            text: `Session 3 ended on a tension already visible inside Chicago house: Adonis's cold, stripped machine track pulling one way and Marshall Jefferson's warm gospel piano pulling the other. In this session that tension hardens into two named subgenres that appear at nearly the same moment, in the same city, made by people who knew one another: acid house and deep house.

The split matters beyond the labels. A genre is never a single thing; it is a bundle of contradictory impulses held together for a time. Chicago house in the mid-1980s contained both a drive toward the harshest, most alien sounds the cheap machines could make and a drive toward the richest, most emotional musicianship those same machines could support. Acid house is the first impulse followed to its end, and deep house is the second. Neither is more authentic than the other; they are two answers to the same question of what to do with a drum machine and a synthesizer. We will take acid first, because it comes down to one piece of hardware being used against its design, and that machine appeared already in Session 2.`
        },
        {
            type: "narration",
            title: "The TB-303, Used Wrong",
            audioSeconds: 83,
            text: `Recall the Roland TB-303 from Session 2, the silver box Roland built in 1982 to fake a bass guitar for practicing musicians, which failed at the task and was discontinued. The controls are where acid house lives, so they are worth describing. The 303 has a step sequencer that plays a looping bassline and a set of knobs that shape the sound as it runs: a filter cutoff, a resonance control, an envelope, and per-note accent and slide settings. Turn the cutoff and resonance while the sequence plays and the tone morphs, from a round bass to a nasal honk to a screaming, liquid squelch. No bass guitar makes that sound; it is what the machine does when its controls are pushed past their intended use.

Around 1985 a Chicago group called Phuture — DJ Pierre, Spanky, and Herb J — got hold of a used 303 and, without knowing the conventional way to program it, turned the knobs while a pattern looped. They recorded a long, hypnotic, twisting track of little else. The DJ Ron Hardy played it at his club, the Music Box, reportedly several times in one night until a floor that first rejected it was won over. It was released on Trax in 1987 as "Acid Tracks." Listen to the 303 as an instrument played through its knobs: the pitch of the notes barely changes while the timbre is in constant motion, and that motion is the substance of the genre.`
        },
        {
            type: "music",
            title: "Acid Tracks",
            artist: "Phuture",
            album: "Acid Tracks (Trax, 1987)",
            context: "The founding document of acid house — and essentially one Roland TB-303 with its filter and resonance knobs being turned for eleven minutes. The notes barely move; the timbre never stops moving. That squelch is a machine being used the way it wasn't designed for.",
            youtubeId: null,
            duration: 660
        },
        {
            type: "narration",
            title: "Acid Turns Dark",
            audioSeconds: 63,
            text: `Once the 303 squelch existed, producers found that it could carry a mood the piano anthems never reached: menace. One of the earliest and starkest examples predates the Phuture release. Sleezy D's "I've Lost Control," from 1986, was produced by Marshall Jefferson, the same man who wrote the sunny "Move Your Body," which indicates the range a single producer worked across inside this scene.

"I've Lost Control" sets the acid bassline against a distorted, echoing vocal that repeats the title like a man coming apart. The effect is claustrophobic and strange, closer to a horror soundtrack than to disco. Because the sounds are synthetic and cold to begin with, they reach emotional places that warm live instruments do not easily reach; the unstable, inhuman acid line suits unease. Where the music of Session 1 was built for communal uplift, acid opened a door onto the interior and the disturbed, using the same technology to an opposite end.`
        },
        {
            type: "music",
            title: "I've Lost Control",
            artist: "Sleezy D",
            album: "I've Lost Control (Trax, 1986)",
            context: "Produced by Marshall Jefferson — the man who wrote 'Move Your Body' — which shows the range inside one scene. The acid bassline plus a distorted, unraveling vocal makes something claustrophobic and eerie. Synthetic sounds reaching a feeling warm instruments can't.",
            youtubeId: null,
            duration: 360
        },
        {
            type: "narration",
            title: "The Counter-Response: Larry Heard's Chords",
            audioSeconds: 68,
            text: `The other branch runs in nearly the opposite direction. While the acid producers were torturing a bassline synth, a young Chicagoan named Larry Heard was doing something almost no one else in house was doing: playing real, sophisticated jazz chords.

Heard was a trained musician. He had played drums in bands and understood harmony, and when he acquired a couple of synthesizers, a Roland Juno and a drum machine, he built music up rather than stripping it down. Recording as Mr. Fingers, he voiced extended chords — sevenths and ninths, the lush, slightly unresolved harmonies of jazz and soul — on warm analog synth pads laid over the machine rhythm. The result had space, melancholy, and depth, and people began calling it deep house. His 1986 instrumental "Can You Feel It" is the template: a simple, profound bassline, those floating chords, and an almost ambient patience. Acid works at the abrasive surface; this works in the harmonic interior. The underlying machine is the same, a drum machine keeping four-on-the-floor, but the feeling is entirely different, and it was the musician rather than the machine that determined it.`
        },
        {
            type: "music",
            title: "Can You Feel It",
            artist: "Mr. Fingers",
            album: "Can You Feel It (Trax, 1986)",
            context: "The template for deep house, made by a trained musician. Same machine underneath — a drum machine on four-on-the-floor — but now with extended seventh and ninth chords on warm synth pads. Acid is all surface; this is all harmonic interior. The player, not the machine, chose the feeling.",
            youtubeId: null,
            duration: 300
        },
        {
            type: "narration",
            title: "Deep House Finds Its Voice",
            audioSeconds: 75,
            text: `Deep house was completed when Larry Heard's harmony met a singer. Recording as Fingers Inc., Heard worked with the vocalist Robert Owens, whose high, aching, gospel-rooted voice sat inside those chords. Their 1985 record "Mystery of Love" is a fully realized song, with verses, a real melody, and an emotional arc, built on the deep-house foundation. This is the strain of house that reconnects most directly to Session 1: it keeps the machine rhythm but restores the singer, the chords, and the songcraft that the jack tracks had discarded.

The fork now stands complete. Acid house is one person, one 303, timbre in motion, cold and psychedelic and abrasive. Deep house is a trained musician, jazz chords, and a gospel voice, warm and song-shaped. The same city, the same few years, and the same cheap equipment produced opposite instincts, and both are house, because both keep the four-on-the-floor and the DJ-shaped arrangement underneath. This deep-house branch is the one that travels furthest; when we reach the present day in Session 6, the warm, chord-driven, vocal deep-house lineage that Larry Heard started here is the one that keeps resurfacing. Here that lineage begins to sing.`
        },
        {
            type: "music",
            title: "Mystery of Love",
            artist: "Fingers Inc.",
            album: "Mystery of Love (DJ International, 1985)",
            context: "Larry Heard's deep-house harmony meets Robert Owens' gospel-rooted voice: a fully realized song, not a jack track. This is the branch of house that reconnects to Session 1 — machine rhythm, but with the singer and the chords restored. It's also the strain that will travel furthest.",
            youtubeId: null,
            duration: 430
        },
        {
            type: "narration",
            title: "Two Branches, One Root",
            audioSeconds: 67,
            text: `The family tree of Chicago house is now in place. From a single scene and a shared box of cheap machines, two temperaments crystallized: the acid branch, defined by the misused TB-303 and drawn toward the cold, the strange, and the abrasive, and the deep branch, defined by Larry Heard's jazz harmony and drawn toward warmth, melancholy, and song. Both rest on the same four-on-the-floor foundation, and both are house.

Everything so far has happened in the United States — New York, Philadelphia, Detroit, and above all Chicago. The music was already leaving the country, though, and what happened when it landed abroad was not a simple export. In Britain, house met a very different social setting, not a small Black and gay club membership but eventually tens of thousands of young people in fields, and it was re-functioned into something of a different scale and purpose. The records were often the same Chicago records we have been hearing; their meaning changed completely. That transformation, and what was gained and lost in it, is Session 5.`
        }
    ]
},

// =============================================
// SESSION 5: Cross-Atlantic Transformation  (OUTLINE)
// =============================================
{
    title: "Cross-Atlantic Transformation",
    subtitle: "How Britain re-engineered house: from small clubs to open-field raves, via Ibiza and the twelve-inch import",
    duration: null,
    segments: [
        {
            type: "narration",
            title: "The Records Travel",
            audioSeconds: 93,
            text: `Everything so far has happened in the United States. This session follows the music across the Atlantic and examines what Britain did with it — because Britain did not simply consume house, it re-engineered it, changing its scale, its audience, and its social meaning while often playing the very same records.

Britain was prepared for house in a way the American mainstream was not. There was an existing infrastructure for importing Black American dance music: specialist record shops stocked American twelve-inches, club DJs competed over imports, and the northern soul scene had spent the 1970s building weekend-long dance rituals around obscure American soul singles. There was also a national pop chart that dance records could actually enter. Steve "Silk" Hurley's "Jack Your Body" reaching number one in January 1987, which we noted in Session 3, was the clearest early signal: a raw Chicago track, made for almost nothing, sitting at the top of the British chart while house remained a regional scene at home.

Detroit felt the same pull. Kevin Saunderson, one of the Detroit techno founders, formed Inner City with the Chicago-born singer Paris Grey, and their 1988 single "Good Life" became a top-five pop hit in Britain — a bigger commercial success there than in the United States. Listen to it as a transitional object: Detroit machine production, a gospel-schooled vocal in the Session 1 lineage, and an arrangement polished for a pop chart an ocean away.`
        },
        {
            type: "music",
            title: "Good Life",
            artist: "Inner City",
            album: "Paradise (1988)",
            context: "Kevin Saunderson's Detroit production with Paris Grey's vocal — an American record whose biggest audience was British. Machine rhythm underneath, a gospel-schooled voice on top, and a pop polish aimed at a chart that would actually let it in.",
            youtubeId: null,
            duration: 270
        },
        {
            type: "narration",
            title: "The Sample-Collage Response",
            audioSeconds: 71,
            text: `Britain's first original contribution to house was made in the studio rather than the club, and it used the sampler — the technology from Session 1 — as its main instrument. In the autumn of 1987, "Pump Up the Volume" by M/A/R/R/S reached number one in Britain. The record came out of a one-off collaboration between two groups on the independent label 4AD, and it is essentially a collage: a house rhythm section supporting a dense weave of samples, including the Eric B. & Rakim vocal fragment that gives the record its title.

The significance is in the method. Chicago's producers had used machines to replace a band; the British response used the sampler to replace the song, assembling a hit out of pieces of other records. This approach — the DJ's crate of records treated as raw material for a new composition — became a distinctly British specialty, and it put house-derived music at the top of the pop chart within months of house arriving. It also carried forward, without resolving, the question of credit and permission that Session 1 raised with Loleatta Holloway: collage records were built from other people's labor, and the law and the industry spent the next decade catching up with that fact. Listen for how many different records you can hear inside this one.`
        },
        {
            type: "music",
            title: "Pump Up the Volume",
            artist: "M/A/R/R/S",
            album: "Pump Up the Volume (4AD, 1987)",
            context: "Britain's first house-derived number one, and a sampler collage rather than a band or a single songwriter — a house rhythm section carrying fragments of other records. Count the sources you can hear; the method itself is the point of the record.",
            youtubeId: null,
            duration: 250
        },
        {
            type: "narration",
            title: "Ibiza and the Balearic Detour",
            audioSeconds: 95,
            text: `The transformation of British club culture itself is usually traced through a specific detour: the Spanish island of Ibiza. In the standard account, four London DJs — Paul Oakenfold, Danny Rampling, Nicky Holloway, and Johnny Walker — visited in the summer of 1987 and heard the Argentine DJ Alfredo playing at a club called Amnesia. Alfredo's sets were eclectic in a way London's were not: Chicago house next to pop, rock, and European oddities, played to an open-air floor. The style became known as Balearic. Many of the dancers were also taking MDMA — ecstasy — a drug that produces hours of euphoria, empathy, and a strong compulsion to keep moving.

The Londoners brought all of it home. Rampling opened a small club night called Shoom in late 1987; Oakenfold followed with Spectrum; Holloway with the Trip. These rooms fused three elements — house records, the Balearic anything-goes sensibility, and ecstasy — and demand outgrew the venues almost immediately. The drug shaped the music's reception in a specific way: on MDMA, repetition reads as hypnotic rather than monotonous, and the long build-and-release structures from Session 1 land with physical force. Britain's dance floors, in other words, rediscovered chemically what the gospel church had built liturgically. The pop records that came out of this moment wear it openly — here is "Theme from S'Express," a sample-collage record by the London DJ Mark Moore, and Britain's first acid-house-era number one made by a working club DJ.`
        },
        {
            type: "music",
            title: "Theme from S'Express",
            artist: "S'Express",
            album: "Original Soundtrack (Rhythm King, 1988)",
            context: "A London club DJ's sample collage at number one — disco fragments (the spine is Rose Royce's 'Is It Love You're After') stitched over a house pulse. The sound of the Balearic moment crossing into the pop chart.",
            youtubeId: null,
            duration: 345
        },
        {
            type: "narration",
            title: "Manchester: the Haçienda and 'Voodoo Ray'",
            audioSeconds: 83,
            text: `London was only half the story. The other capital of British house was Manchester, and its center was the Haçienda, a converted warehouse opened in 1982 and funded by Factory Records and the band New Order — a venue that lost money for years until house music filled it. The DJ Mike Pickering, later joined by Graeme Park, made the Haçienda's Friday night a house night as early as 1986, drawing directly on Chicago and Detroit imports, and by 1988 the club was the center of the phenomenon the press called "Madchester."

Manchester also produced the record often called the first great British acid house track. Gerald Simpson, a young Black Mancunian recording as A Guy Called Gerald, built "Voodoo Ray" in 1988 on the same discontinued Roland machines as his Chicago counterparts — an 808 for the drums and a 303 for the acid line — with a wordless, pitched-up vocal fragment floating over the top. It is worth pausing on who made it: British house was not only white Britons imitating Black Americans; Black British musicians, children of Caribbean immigrants in cities like Manchester and London, heard Chicago and Detroit as kin and answered in their own accent. "Voodoo Ray" is that answer — an acid record with a softness and eeriness that is nothing like Phuture's Chicago menace.`
        },
        {
            type: "music",
            title: "Voodoo Ray",
            artist: "A Guy Called Gerald",
            album: "Voodoo Ray (Rham!, 1988)",
            context: "Often called the first great British acid house record: an 808, a 303, and a pitched vocal fragment, made in Manchester by Gerald Simpson. Compare its dreamy, eerie softness with Phuture's menace in Session 4 — the same machines, a different accent.",
            youtubeId: null,
            duration: 264
        },
        {
            type: "narration",
            title: "From Club to Field",
            audioSeconds: 82,
            text: `Then the scale changed. Chicago house lived in clubs holding a few hundred people; British acid house outgrew its venues within a year. Promoters began staging unlicensed parties in warehouses, aircraft hangars, and open fields — raves — with crowds in the thousands and then the tens of thousands, organized by phone lines and secret meeting points, often just off the M25, the orbital motorway that rings London. The press called 1988 and 1989 the Second Summer of Love, and the yellow smiley face became its emblem.

Scale rewrote the music's function. A record now had to work outdoors, on a huge sound system, for a crowd of strangers peaking together — which favored bigger builds, longer breakdowns, and broader emotional gestures than the intimate club records of Chicago. It also pushed the music onto the radio. 808 State, a Manchester group that Gerald Simpson passed through, reached the top ten in late 1989 with "Pacific State," an instrumental built around a saxophone loop and birdsong, after BBC radio picked it up. An underground machine record with no verse, no chorus, and no singer was now British pop. Listen to it with the field in mind rather than the club — the wash of pads, the wide-open arrangement, the record aiming at a horizon rather than a wall.`
        },
        {
            type: "music",
            title: "Pacific State",
            artist: "808 State",
            album: "Ninety (ZTT, 1989)",
            context: "Rave-era house built for the open air: a saxophone loop, birdsong, wide synth pads. A machine instrumental with no verse or chorus that BBC radio carried into the top ten — the underground record re-scaled for a field and a horizon.",
            youtubeId: null,
            duration: 320
        },
        {
            type: "narration",
            title: "The Law, and the Ledger",
            audioSeconds: 108,
            text: `The state answered the raves. Tabloids ran ecstasy scare stories, police formed dedicated units to intercept convoys and shut down parties, and Parliament legislated — first against unlicensed parties in 1990, then, after a week-long free festival at Castlemorton Common in 1992 drew tens of thousands, with the Criminal Justice and Public Order Act of 1994. That act gave police powers against gatherings playing amplified music characterized by, in the statute's own words, "the emission of a succession of repetitive beats." A British government wrote the drum machine into law as a public-order problem.

An honest ledger of the Atlantic crossing has entries on both sides. Britain gave house scale, a pop audience, its own producers, and a genuine youth culture; for a while it treated a Black American underground music as the most important sound in the world. But the crossing also diluted the music's origins. The crowds were overwhelmingly white and straight, the gay Black clubs of Chicago receded from the story as it was retold, and within a few years the British press was narrating house as a British invention with American roots, rather than the reverse. The Chicago originators, meanwhile, mostly saw little of the money. We close with the record that best represents what Britain's rave generation built for itself: "Chime," recorded at home for almost nothing by two brothers, Phil and Paul Hartnoll, who named their group Orbital after the motorway the raves circled. A bedroom production reaching the national chart — the Jesse Saunders proposition of Session 3, repeated on another continent. Where the music went next, and how it came back to its sources, is the final session.`
        },
        {
            type: "music",
            title: "Chime",
            artist: "Orbital",
            album: "Chime (Oh-Zone/FFRR, 1989)",
            context: "Recorded at home for next to nothing by the Hartnoll brothers, named for the M25 the raves circled, and carried into the national chart — Britain's rave generation making its own house, the Jesse Saunders proposition repeated on another continent.",
            youtubeId: null,
            duration: 380
        }
    ]
},

// =============================================
// SESSION 6: Where It Lives Now
// =============================================
{
    title: "Where It Lives Now",
    subtitle: "The living branches: the deep-house revival, tech house's 303 lineage, and the vocal-led return through South Africa",
    duration: null,
    segments: [
        {
            type: "narration",
            title: "The Branches That Are Still Growing",
            text: `Five sessions have brought us from the gospel church to a field outside London. We have the parts: the gospel vocal and the Philadelphia rhythm section, the drum machines and the sequencer, the Chicago clubs where those inheritances were joined, the fork into acid and deep house, and the British rave culture that gave the music scale and took much of the credit. This last session is about house as living music rather than as history. Three strains dominate dance floors now, and each one descends from a specific branch we have already traced.

Some orientation on the years in between. Through the late 2000s and early 2010s the American mainstream absorbed dance music in a particular form, the festival sound usually called EDM. It kept the four-on-the-floor kick and rebuilt the arrangement around a single event, the drop, with a long rising tension and a release engineered for a large outdoor crowd. That is a legitimate use of the machinery, but it is a different design goal from a Chicago twelve-inch, which was made to be mixed with other records and to hold a room for hours rather than to peak once.

A set of producers went the other way, back toward the quieter branch. Listen to the record that follows for what it does not do: there is no build, no drop, and no hook repeated at you. It is a loop, a bassline, and a few chords held long enough to sit inside — Larry Heard's proposition from Session 4, remade a quarter of a century later by a young producer in London.`,
            audioSeconds: 88
        },
        {
            type: "music",
            title: "What They Say",
            artist: "Maya Jane Coles",
            album: "What They Say (2010)",
            context: "Deep house built from a looped vocal fragment, a soft bassline, and a great deal of space. Nineteen85 came across it on YouTube and built Nicki Minaj's \"Truffle Butter\" on top of it in 2014; Coles was credited as a writer and co-producer. The same act of borrowing that cost Loleatta Holloway everything, handled correctly.",
            youtubeId: null,
            duration: 400
        },
        {
            type: "narration",
            title: "The 303 Under a New Name",
            text: `The other Chicago branch is also still running, under a name that hides its ancestry. Tech house is now the default sound of large club rooms and festival dance tents. The name describes the join it was built on, the groove of Chicago and Detroit house combined with the austerity and machine focus of techno, and it was coined in London in the early 1990s among DJs including Eddie Richards and Mr. C, at parties that had grown out of Britain's acid house years. The branch we followed across the Atlantic in Session 5 fed back into the club.

The acid line survived the disappearance of the machine that made it. Original TB-303s became scarce and expensive collectors' items, so the sound moved into software emulations and into Roland's own later reissues. What carried over was not the box but the technique, which is worth restating because it is audible in current records. Take a monophonic bass sequence, run it through a low-pass filter with the resonance turned up so that the filter rings at its cutoff point, and move that cutoff while the sequence loops. Add accents on chosen steps, and slides that glide from one note into the next instead of restarting. That procedure, rather than the specific silver box, is what makes a bassline sound vocal instead of static.

There is a direct human line back to Chicago as well. Curtis Jones, who records as Green Velvet and as Cajmere, came out of the scene of Sessions 3 and 4 and has remained central to the club music that followed. Listen to the next record for the bass carrying the lead rather than the foundation, and for how little else the arrangement contains.`,
            audioSeconds: 101
        },
        {
            type: "music",
            title: "Losing It",
            artist: "Fisher",
            album: "Losing It (Catch & Release, 2018)",
            context: "An Australian producer's single from July 2018 that became inescapable and was nominated for Best Dance Recording at the Grammys the following February. The arrangement is close to empty: a kick, a rolling bass figure worked with a filter, a shaker, and one vocal phrase. The acid branch's austerity, thirty years on.",
            youtubeId: null,
            duration: 249
        },
        {
            type: "narration",
            title: "South Africa, Where House Became Popular Music",
            text: `In the United States and Britain, house has spent most of its life as club music with periodic crossovers into the charts. In South Africa it became the popular music of the country outright, played on national radio and sold in volume, and it has held that position for roughly thirty years.

The route runs through kwaito. In Johannesburg in the early 1990s, in the years around the end of apartheid, producers took imported house records and slowed them down, from house tempo to something closer to a walking pace, then put vocals over the top in Zulu, Sotho, and township slang, often half-sung and half-chanted rather than sung through. Kwaito is house music re-tempoed and re-voiced for a specific place, and it was the first mass youth music of the post-apartheid generation.

South African house grew alongside kwaito and eventually overtook it, and it kept the vocal at the front. That is the structural difference from what we heard in Britain. The British transformation in Session 5 pushed toward instrumental tracks, samples, and eventually the anonymity of the rave, while the South African line kept the singer at the center of the record, which puts it closer to the gospel and disco material of Session 1 than anything we have heard since.

The producer you are about to hear is Nkosinathi Maphumulo, who records as Black Coffee and who won the Grammy for Best Dance and Electronic Album in 2022. Listen for the arrangement's priority: everything in it is built to carry a lead vocal, and that vocal is a song with a melody that develops, not a phrase looped for texture.`,
            audioSeconds: 100
        },
        {
            type: "music",
            title: "Superman",
            artist: "Black Coffee featuring Bucie",
            album: "Home Brewed (2009)",
            context: "South African house with the singer at the front and the machine parts in support. Drake sampled this record for \"Get It Together\" in 2017, which put the traffic between South African house and North American pop in both directions rather than one.",
            youtubeId: null,
            duration: 434
        },
        {
            type: "narration",
            title: "Amapiano and the Log Drum",
            text: `The newest branch of this family is amapiano, which came out of the townships of Pretoria and Johannesburg in the middle of the last decade and reached the South African mainstream around 2019. The name is Zulu for "the pianos," and it points at the first thing you notice: soft, jazz-voiced electric piano chords, closer to Larry Heard's harmony in Session 4 than to anything in techno. Its ingredients are usually given as deep house, jazz, and kwaito, which makes it a direct descendant of two things we have already covered.

The rhythmic mechanics are a real departure, so they are worth describing carefully. Amapiano runs slower than house, generally between a hundred and eight and a hundred and fifteen beats per minute rather than a hundred and twenty-four. The weight of the record does not sit on the kick drum. It sits on the log drum, which takes its name from the wooden slit drum but is here a synthesized sound: a deep, pitched, percussive bass tone that plays a melodic figure, with slides between its notes, instead of holding a root underneath the chords. In a Chicago record the kick supplies the pulse and the bassline supplies the harmony, two separate jobs. In amapiano the log drum does both at once, which is why the music can feel sparse and heavy at the same time, and why the gaps between its hits are so wide. A constant shaker pattern fills those gaps and carries the forward motion.

Listen for the log drum entering, and for how much room the rest of the arrangement leaves it.`,
            audioSeconds: 93
        },
        {
            type: "music",
            title: "Ke Star",
            artist: "Focalistic featuring Vigro Deep",
            album: "Blecke (2020)",
            context: "Released in April 2020 and produced by Vigro Deep, with Focalistic rapping in Sepitori, the Pretoria street vernacular. A remix with the Nigerian singer Davido followed in 2021 and carried amapiano out across the continent.",
            youtubeId: null,
            duration: 433
        },
        {
            type: "narration",
            title: "The Loop Closes in Public",
            text: `In 2022 one of the most commercially prominent pop records in the world was a house album. Beyonce's "Renaissance" was built on house, disco, and ballroom, and it was explicit about where those forms came from: Black and queer dance culture, the same rooms we described in Sessions 1 and 3. She dedicated it in part to her late uncle Johnny, a gay Black man who raised her on this music.

The track we are about to hear is a lesson in the mechanics of this whole course. It is built on Robin S.'s "Show Me Love," and specifically on the 1993 mix by the Swedish producer StoneBridge that turned it into a standard. The hook it borrows is a machine sound: an organ preset from the Korg M1 synthesizer, a factory setting so widely used on early nineties house records that it became a genre marker by itself. That is the Session 2 argument returning — a particular piece of equipment shaping what a decade of music sounds like.

The other thing to note is the credit. The writers of "Show Me Love" are credited on this record, and Beyonce brought in people from inside the culture to make it, among them Honey Dijon, a Black transgender DJ and producer from Chicago whose lineage runs straight back to the clubs of Session 3. Set that against what happened to Loleatta Holloway in Session 1, whose voice carried a European number one that neither credited nor initially paid her. The improvement is real, and it took about thirty years.`,
            audioSeconds: 89
        },
        {
            type: "music",
            title: "BREAK MY SOUL",
            artist: "Beyonce",
            album: "Renaissance (Parkwood/Columbia, 2022)",
            context: "The Korg M1 organ bass from Robin S.'s \"Show Me Love\" placed under a stadium-scale pop vocal, with Big Freedia's bounce chant on top. A machine preset from a 1993 club record carried to the top of the mainstream, with its authors credited.",
            youtubeId: null,
            duration: 278
        },
        {
            type: "narration",
            title: "The Voice at the Center",
            text: `We end where the course began, with a woman singing a sacred text over a dance rhythm.

"Jerusalema" was released in 2019 by Master KG, a producer from Limpopo province in South Africa, with a vocal by Nomcebo Zikode. The lyric is in Zulu and it is a prayer: Jerusalem is my home, guard me, walk with me, do not leave me here. That is the gospel material of Session 1 arriving intact at the end of the line — not a sample lifted out of an old record, but a living devotional song, sung whole, over a four-on-the-floor built from the descendants of the machines in Session 2. The record went around the world in 2020 on a dance video that travelled between countries the way twelve-inch imports once travelled between cities.

The ending is not clean. Nomcebo Zikode's voice is the reason people know that song, and she has said publicly that she received no recording royalties for it. She has been in dispute with the record company since 2021, partly over whether she should be credited as a co-writer of the song. A South African High Court ruled against her in May 2025 on the terms of her recording contract, and she has said she intends to appeal. A Black woman's voice carries an international hit while the payment for it is contested and still unresolved. That is the Loleatta Holloway pattern from Session 1, recurring thirty years later, and it should be named as the injustice it is rather than left as a footnote.

Hold both of those things while this plays. The music left the church, moved onto cheap machines, crossed the Atlantic, and came back around the world. The voice at the center of it never left.`,
            audioSeconds: 95
        },
        {
            type: "music",
            title: "Jerusalema",
            artist: "Master KG featuring Nomcebo Zikode",
            album: "Jerusalema (Open Mic Productions, 2019)",
            context: "A Zulu prayer sung over South African house, and the record that closes this course. Gospel text, a machine rhythm, a dance that crossed borders on video, and an unresolved argument about who gets paid — the whole inheritance, still in motion.",
            youtubeId: null,
            duration: 254
        }
    ]
}

];
