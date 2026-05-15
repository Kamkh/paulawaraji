/* ============================================================
   Paul Awaraji — site data
   ============================================================

   THIS IS THE FILE YOU EDIT TO ADD, REMOVE, OR REORDER PROJECTS.

   Each entry in `works` below becomes one tile in the
   "Selected Work" section.

   Required fields for each entry:
     cat      → one of: 'advertisement' | 'theme' | 'film' | 'design'
     title    → text shown on the tile
     meta     → small line under the title (sub-info)
     year     → year shown in the corner
     kind     → 'youtube' | 'vimeo' | 'sc-track' | 'sc-playlist'
     src      → video ID (YouTube/Vimeo) or SoundCloud track/playlist ID
     poster   → URL or local path for the tile thumbnail image

   Optional fields:
     featured       → true puts it in the Featured row at the top
     aspect         → 'poster' puts it in the Short Film Posters row (2:3 art)
     posterFallback → second image URL used if `poster` fails to load
     badge          → small ribbon on the tile (e.g. 'AWARD')

   YouTube thumbnails: use the YT() helper below — just pass the video ID.
   Vimeo thumbnails: paste the full URL from i.vimeocdn.com.
   SoundCloud artwork: paste the full URL from i1.sndcdn.com.

   Local images (e.g. assets/posters/half-way.jpg) are also fine —
   the site will fall back to `posterFallback` if a local file is missing.

   ============================================================ */

(function () {
  'use strict';

  // Helper for YouTube thumbnails (don't edit unless YouTube changes URLs)
  const YT = (id) => 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';

  // Labels shown on tiles and chips for each category
  const CATEGORIES = {
    advertisement: 'Advertising',
    theme:         'Main Theme',
    film:          'Short Film',
    design:        'Sound Design',
  };

  const WORKS = [

    /* -----------------------------------------------------
       FEATURED — large tiles at the top of the section
       ----------------------------------------------------- */
    { featured: true, cat: 'advertisement',
      title: 'STC — يبقى رمضان رمضان',
      meta:  'Telecom · Ramadan Campaign',
      year:  '2024',
      kind:  'youtube', src: 'dhhkWTE6hF8',
      poster: YT('dhhkWTE6hF8') },

    { featured: true, cat: 'advertisement',
      title: "Million's Poet — Season 10",
      meta:  'Show Promo · Abu Dhabi',
      year:  '2023',
      kind:  'vimeo', src: '831859369',
      poster: 'https://i.vimeocdn.com/video/1695116392-b259b8ad8c771783430ee9639544d5dc51b5721c2e1cf99dead38af2fe732ab9-d_1280' },


    /* -----------------------------------------------------
       SHORT FILM POSTERS — 2:3 tiles in their own row
       Drop real movie posters into assets/posters/ to override.
       ----------------------------------------------------- */
    { aspect: 'poster', cat: 'film',
      title: 'Half Way',
      meta:  'Original Score · Best Film Score 2024',
      year:  '2024',
      kind:  'sc-track', src: '2173720764',
      poster: 'assets/posters/half-way.jpg',
      posterFallback: 'https://i1.sndcdn.com/artworks-VebYuEtcQ9Cyo7vn-NyyGng-t500x500.jpg',
      badge: 'AWARD' },

    { aspect: 'poster', cat: 'film',
      title: 'Macula',
      meta:  'Original Soundtrack',
      year:  '2023',
      kind:  'sc-playlist', src: '1631160208',
      poster: 'assets/posters/macula.jpg',
      posterFallback: 'https://i1.sndcdn.com/artworks-McLiBZMDlzZwhwa1-m7hVYA-t500x500.jpg' },

    { aspect: 'poster', cat: 'film',
      title: 'One Night',
      meta:  'Original Soundtrack',
      year:  '2023',
      kind:  'sc-playlist', src: '1631167642',
      poster: 'assets/posters/one-night.jpg',
      posterFallback: 'https://i1.sndcdn.com/artworks-jkb8WD9uA7MjeKle-IvECyQ-t500x500.jpg' },


    /* -----------------------------------------------------
       ADVERTISEMENT FILMS
       ----------------------------------------------------- */
    { cat: 'advertisement', title: 'Talabat App',
      meta: 'Brand Spot', year: '2022', kind: 'youtube', src: 'pCAblvgU1M8',
      poster: YT('pCAblvgU1M8') },

    { cat: 'advertisement', title: 'Saudi Commission for Health Specialties',
      meta: 'Public Sector · KSA', year: '2023', kind: 'vimeo', src: '843476833',
      poster: 'https://i.vimeocdn.com/video/1695145769-c0b8f1cae2f0efc356fc1e1747a8cff8fe784099469511def49c4fdfd397525f-d_1280' },

    { cat: 'advertisement', title: 'Kafa',
      meta: 'Awareness Campaign', year: '2023', kind: 'vimeo', src: '843476576',
      poster: 'https://i.vimeocdn.com/video/1695127498-655b0f9c7bdafc702f75d2794dbd32a31d33eca2945dc09c063740e634c6748c-d_1280' },

    { cat: 'advertisement', title: 'Jawwy',
      meta: 'Telecom · Brand Film', year: '2019', kind: 'vimeo', src: '343912090',
      poster: 'https://i.vimeocdn.com/video/793249623-23bd7609ec4c21876938a965c68c14820c2c7b5cc46513581216435fdb753f6b-d_1280' },

    { cat: 'advertisement', title: 'Prince of Poets — Promotion',
      meta: 'Show Promo · Abu Dhabi', year: '2019', kind: 'vimeo', src: '310524142',
      poster: 'https://i.vimeocdn.com/video/751133564-9aba77691c2b71205045da241dc9b463d8c20e0def88fd93977f24e44b87c850-d_1280' },

    { cat: 'advertisement', title: 'Eddison Electric',
      meta: 'Brand Spot', year: '2021', kind: 'youtube', src: 'Mj0pQOnFzQg',
      poster: YT('Mj0pQOnFzQg') },

    { cat: 'advertisement', title: 'BeKind',
      meta: 'English Edit', year: '2022', kind: 'youtube', src: 'mrJkVNO_mug',
      poster: YT('mrJkVNO_mug') },


    /* -----------------------------------------------------
       SOUND DESIGN
       ----------------------------------------------------- */
    { cat: 'design', title: 'The Original — Al Abdalla',
      meta: 'Sound Design', year: '2024', kind: 'vimeo', src: '905175967',
      poster: 'https://i.vimeocdn.com/video/1786329154-ba258068f965983ea2d0613de03d23b62666f0cc274e4a8c46fb1e1981d534aa-d_1280' },

    { cat: 'design', title: 'Stillness · سكون',
      meta: 'Short Film · Lebanon', year: '2023', kind: 'youtube', src: 'qwSM82DRjUM',
      poster: YT('qwSM82DRjUM') },

    { cat: 'design', title: 'Ola Energy — TV Ad',
      meta: 'Sound Design · English', year: '2022', kind: 'youtube', src: 'sX_wHTplOzI',
      poster: YT('sX_wHTplOzI') },

    { cat: 'design', title: 'Coca-Cola Egypt — 2020',
      meta: 'إعلان كوكاكولا · Sound', year: '2020', kind: 'youtube', src: 'WHHV0xgKSjQ',
      poster: YT('WHHV0xgKSjQ') },

    { cat: 'design', title: "Nido — Sarah's Story",
      meta: 'TVC · Sound Design', year: '2017', kind: 'vimeo', src: '202087072',
      poster: 'https://i.vimeocdn.com/video/636506245-2162971dbd95e74475e03d6499eb84c85a1cd9c72102643da39b7c4b0c258670-d_1280' },

    { cat: 'design', title: 'Coke Brrr — Coca-Cola Iraq',
      meta: 'Sound Design', year: '2019', kind: 'vimeo', src: '346203543',
      poster: 'https://i.vimeocdn.com/video/796371701-b036e211e5de5ac1519f3eeb4f75801ae6b1f498a4b055ce13259f2a9de5ea5b-d_1280' },


    /* -----------------------------------------------------
       MAIN THEMES (SoundCloud tracks)
       ----------------------------------------------------- */
    { cat: 'theme', title: 'Billboard Arabia — Main Theme',
      meta: 'Long Version', year: '2024', kind: 'sc-track', src: '1944240699',
      poster: 'https://i1.sndcdn.com/artworks-QNSBAkvv0yB6yFOn-INujcQ-t500x500.jpg' },

    { cat: 'theme', title: 'Ghani Safari — Main Theme',
      meta: 'Theme & Variations', year: '2024', kind: 'sc-track', src: '1522535674',
      poster: 'https://i1.sndcdn.com/artworks-B8Cegj1UGNEvWPej-UwwqOA-t500x500.jpg' },

    { cat: 'theme', title: 'Ahla Look — Main Theme',
      meta: 'Reality Show', year: '2024', kind: 'sc-track', src: '1522527430',
      poster: 'https://i1.sndcdn.com/artworks-uNX8d6IPOIC9BQ31-qyMZxA-t500x500.jpg' },

    { cat: 'theme', title: 'Marahel — Main Theme',
      meta: 'موسيقى برنامج مراحل', year: '2024', kind: 'sc-track', src: '1522480564',
      poster: 'https://i1.sndcdn.com/artworks-YFbLRMQavyHWucb1-0gfW6g-t500x500.jpg' },

    { cat: 'theme', title: 'Marahel — Orchestral Promo',
      meta: 'Orchestral Cue', year: '2024', kind: 'sc-track', src: '1541913520',
      poster: 'https://i1.sndcdn.com/artworks-YFbLRMQavyHWucb1-0gfW6g-t500x500.jpg' },

    { cat: 'theme', title: 'Souhair Show — Main Theme',
      meta: 'Talk Show', year: '2024', kind: 'sc-track', src: '1522418713',
      poster: 'https://i1.sndcdn.com/artworks-SQCsjv7aq1ronAgK-HURNtA-t500x500.jpg' },

    { cat: 'theme', title: 'Akhir El Kalam — Tunisia',
      meta: 'Main Theme', year: '2024', kind: 'sc-track', src: '1522599700',
      poster: 'https://i1.sndcdn.com/artworks-gQpka4YI4opAsG8s-hluVLQ-t500x500.jpg' },

    { cat: 'theme', title: 'Mostaqbal Tech — Main Theme',
      meta: 'Tech / Innovation', year: '2024', kind: 'sc-track', src: '1522554136',
      poster: 'https://i1.sndcdn.com/artworks-h2cpYJNwGc1ARPI3-ojONCQ-t500x500.jpg' },

    { cat: 'theme', title: 'Akhir Kalam — Saudi Arabia',
      meta: 'Main Theme', year: '2024', kind: 'sc-track', src: '1522577056',
      poster: 'https://i1.sndcdn.com/artworks-Y5r9gSA5kftSBGdE-yhpLvA-t500x500.jpg' },

    { cat: 'theme', title: 'BeLight Radio & Platform',
      meta: 'Main Music Theme', year: '2024', kind: 'sc-track', src: '1522607245',
      poster: 'https://i1.sndcdn.com/artworks-5NqcXXbPFXOOuBUi-g5TpCw-t500x500.jpg' },

    { cat: 'theme', title: 'Sekkat AlKaif Coffee — KSA Anthem',
      meta: 'Advertisement Music', year: '2024', kind: 'sc-track', src: '1522612462',
      poster: 'https://i1.sndcdn.com/artworks-GXGlSKNOaStpMwfy-KbPyqQ-t500x500.jpg' },
  ];

  // Expose to main.js
  window.SITE_DATA = { works: WORKS, categories: CATEGORIES };
})();
