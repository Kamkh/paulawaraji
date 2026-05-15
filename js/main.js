/* ============================================================
   Paul Awaraji — site behavior

   Handles:
     - rendering work tiles from window.SITE_DATA
     - category filter chips
     - modal lightbox player
     - mobile drawer navigation
     - scroll progress bar + hero parallax
     - reveal-on-scroll fade-ins

   For project content edits → see js/data.js (not this file).
   ============================================================ */

(function () {
  'use strict';

  const WORKS      = window.SITE_DATA.works;
  const CAT_LABEL  = window.SITE_DATA.categories;


  /* -----------------------------------------------------
     Tile rendering
     ----------------------------------------------------- */
  const featuredEl  = document.getElementById('featuredWorks');
  const filmsEl     = document.getElementById('filmsWorks');
  const filmsLabel  = document.getElementById('filmsLabel');
  const mosaicEl    = document.getElementById('mosaicWorks');
  const mosaicLabel = document.getElementById('mosaicLabel');
  const countEl     = document.getElementById('work-count');

  const isAudio = (k) => k === 'sc-track' || k === 'sc-playlist';
  const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  function tileHTML(w, opts) {
    opts = opts || {};
    const audio    = isAudio(w.kind);
    const isPoster = w.aspect === 'poster';

    const cls = [
      'tile',
      isPoster ? 'tile--poster' : (audio ? 'tile--audio' : 'tile--video'),
      opts.featured ? 'tile--xl' : '',
    ].filter(Boolean).join(' ');

    const playSVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7V5z"/></svg>';

    const wave = (audio && !isPoster)
      ? '<div class="tile__waveform" aria-hidden="true">' +
          Array.from({length: 28}, (_, i) =>
            '<i style="animation-delay:' + (-i * 0.12).toFixed(2) + 's; height:' + (20 + (i*7) % 55) + '%"></i>'
          ).join('') +
        '</div>'
      : '';

    // multi-bg fallback: local file first, CDN art second
    const bgImage = w.posterFallback
      ? "url('" + w.poster + "'), url('" + w.posterFallback + "')"
      : "url('" + w.poster + "')";

    return (
      '<article class="' + cls + '"' +
        ' data-cat="' + w.cat + '"' +
        ' data-kind="' + w.kind + '"' +
        ' data-src="' + w.src + '"' +
        ' data-title="' + escapeAttr(w.title) + '"' +
        ' data-meta="' + escapeAttr(w.meta) + '"' +
        ' data-year="' + w.year + '"' +
        ' tabindex="0" role="button" aria-label="Play ' + escapeAttr(w.title) + '">' +
        '<div class="tile__poster" style="background-image: ' + bgImage + '" aria-hidden="true"></div>' +
        '<div class="tile__overlay" aria-hidden="true"></div>' +
        '<div class="tile__top">' +
          '<span class="tile__year">' + w.year + '</span>' +
          '<span class="tile__cat">' + CAT_LABEL[w.cat] + '</span>' +
        '</div>' +
        wave +
        '<span class="tile__play" aria-hidden="true">' + playSVG + '</span>' +
        (w.badge ? '<span class="tile__badge">' + w.badge + '</span>' : '') +
        '<div class="tile__bottom">' +
          '<h3 class="tile__title">' + w.title + '</h3>' +
          '<span class="tile__meta">' + w.meta + '</span>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    featuredEl.innerHTML = WORKS.filter(w => w.featured).map(w => tileHTML(w, { featured: true })).join('');
    filmsEl.innerHTML    = WORKS.filter(w => w.aspect === 'poster').map(w => tileHTML(w)).join('');
    mosaicEl.innerHTML   = WORKS.filter(w => !w.featured && w.aspect !== 'poster').map(w => tileHTML(w)).join('');
    bindTiles();
    updateCount('all');
  }

  function bindTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
      tile.addEventListener('click', () => openModalFromTile(tile));
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModalFromTile(tile); }
      });
    });
  }

  function updateCount(filter) {
    const total = WORKS.length;
    const visible = filter === 'all' ? total : WORKS.filter(w => w.cat === filter).length;
    countEl.textContent = 'Showing ' + String(visible).padStart(2, '0') +
                          ' of '     + String(total).padStart(2, '0') + ' works';
  }


  /* -----------------------------------------------------
     Filter chips
     ----------------------------------------------------- */
  function syncSectionVisibility() {
    [
      [featuredEl, null],
      [filmsEl,    filmsLabel],
      [mosaicEl,   mosaicLabel],
    ].forEach(([group, label]) => {
      const hasVisible = !!group.querySelector('.tile:not(.is-hidden)');
      group.style.display = hasVisible ? '' : 'none';
      if (label) label.classList.toggle('is-empty', !hasVisible);
    });
  }

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      document.querySelectorAll('.chip').forEach(c => {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
      });
      document.querySelectorAll('.tile').forEach(tile => {
        const match = filter === 'all' || tile.dataset.cat === filter;
        tile.classList.toggle('is-hidden', !match);
      });
      syncSectionVisibility();
      updateCount(filter);
    });
  });


  /* -----------------------------------------------------
     Modal lightbox player
     ----------------------------------------------------- */
  const modal         = document.getElementById('modal');
  const modalFrame    = document.getElementById('modalFrame');
  const modalTitle    = document.getElementById('modal-title');
  const modalSub      = document.getElementById('modal-sub');
  const modalClose    = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  let lastFocus = null;

  function buildEmbedHTML(kind, src, title) {
    const t = escapeAttr(title);
    if (kind === 'youtube') {
      return '<iframe src="https://www.youtube.com/embed/' + src + '?rel=0&autoplay=1&modestbranding=1&playsinline=1"' +
             ' title="' + t + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="eager"></iframe>';
    }
    if (kind === 'vimeo') {
      return '<iframe src="https://player.vimeo.com/video/' + src + '?autoplay=1&title=0&byline=0&portrait=0"' +
             ' title="' + t + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="eager"></iframe>';
    }
    if (kind === 'sc-track') {
      const url = encodeURIComponent('https://api.soundcloud.com/tracks/' + src);
      return '<iframe scrolling="no" frameborder="no" allow="autoplay" loading="eager"' +
             ' src="https://w.soundcloud.com/player/?url=' + url + '&color=%23ededed&inverse=true&auto_play=true&visual=true&show_artwork=true&show_user=false&show_comments=false&show_reposts=false"' +
             ' title="' + t + '"></iframe>';
    }
    if (kind === 'sc-playlist') {
      const url = encodeURIComponent('https://api.soundcloud.com/playlists/' + src);
      return '<iframe scrolling="no" frameborder="no" allow="autoplay" loading="eager"' +
             ' src="https://w.soundcloud.com/player/?url=' + url + '&color=%23ededed&inverse=true&auto_play=true&visual=true&show_artwork=true&show_user=false"' +
             ' title="' + t + '"></iframe>';
    }
    return '';
  }

  function openModalFromTile(tile) {
    const kind  = tile.dataset.kind;
    const src   = tile.dataset.src;
    const title = tile.dataset.title;
    const meta  = tile.dataset.meta;
    const year  = tile.dataset.year;
    const cat   = tile.dataset.cat;

    lastFocus = document.activeElement;

    modalFrame.classList.toggle('audio', isAudio(kind));
    modalFrame.innerHTML = buildEmbedHTML(kind, src, title);
    modalTitle.textContent = title;
    modalSub.textContent = CAT_LABEL[cat] + ' · ' + meta + ' · ' + year;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    setTimeout(() => modalClose.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    setTimeout(() => { modalFrame.innerHTML = ''; }, 350);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });


  /* -----------------------------------------------------
     Mobile drawer
     ----------------------------------------------------- */
  const drawer         = document.getElementById('drawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const navToggle      = document.getElementById('navToggle');
  const drawerClose    = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawerBackdrop.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    setTimeout(() => drawerClose.focus(), 100);
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawerBackdrop.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }
  navToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });


  /* -----------------------------------------------------
     Scroll progress bar + subtle hero parallax
     ----------------------------------------------------- */
  const progress = document.getElementById('progress');
  const heroImg  = document.querySelector('.hero__bg img');
  let ticking = false;

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct + '%';

    if (heroImg) {
      const y = h.scrollTop;
      heroImg.style.transform = 'translate3d(0, ' + (y * 0.06).toFixed(0) + 'px, 0) scale(1.02)';
    }
  }
  function rafScroll() {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }
  document.addEventListener('scroll', rafScroll, { passive: true });
  onScroll();


  /* -----------------------------------------------------
     Reveal on scroll
     ----------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));


  /* -----------------------------------------------------
     Init
     ----------------------------------------------------- */
  render();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
