(function () {
  const state = {
    currentIndex: 0,
    notesVisible: false,
    sidebarCollapsed: false,
  };

  const els = {
    thumbnails: document.getElementById('thumbnails'),
    slideStage: document.getElementById('slide-stage'),
    slideCounter: document.getElementById('slide-counter'),
    slideTitle: document.getElementById('current-slide-title'),
    notesPanel: document.getElementById('notes-panel'),
    notesContent: document.getElementById('notes-content'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnNotes: document.getElementById('btn-notes'),
    btnFullscreen: document.getElementById('btn-fullscreen'),
    btnToggleSidebar: document.getElementById('btn-toggle-sidebar'),
    progressBar: document.getElementById('progress-bar'),
  };

  function getSlideIndexFromHash() {
    const match = window.location.hash.match(/^#slide-(\d+)$/);
    if (!match) return 0;
    const id = parseInt(match[1], 10);
    const index = SLIDES.findIndex((s) => s.id === id);
    return index >= 0 ? index : 0;
  }

  function updateHash(index) {
    const slide = SLIDES[index];
    const nextHash = `#slide-${slide.id}`;
    if (window.location.hash !== nextHash) {
      history.replaceState(null, '', nextHash);
    }
  }

  function renderThumbnails() {
    els.thumbnails.innerHTML = SLIDES.map((slide) => renderThumbnail(slide)).join('');
    bindPhoneImages(els.thumbnails);

    els.thumbnails.querySelectorAll('.thumbnail').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.slideId, 10);
        goToSlide(SLIDES.findIndex((s) => s.id === id));
      });
    });
  }

  function renderActiveSlide() {
    const slide = SLIDES[state.currentIndex];
    els.slideStage.innerHTML = `
      <article class="slide-card" id="slide-${slide.id}" aria-labelledby="slide-heading-${slide.id}">
        ${renderSlideContent(slide)}
      </article>
    `;
    bindPhoneImages(els.slideStage);

    const heading = els.slideStage.querySelector('.slide-title, .slide-title--hero');
    if (heading) heading.id = `slide-heading-${slide.id}`;

    els.slideCounter.textContent = `${slide.id} / ${SLIDES.length}`;
    els.slideTitle.textContent = slide.shortTitle;
    els.notesContent.textContent = slide.notes || 'Aucune note pour cette slide.';

    const progress = ((state.currentIndex + 1) / SLIDES.length) * 100;
    els.progressBar.style.width = `${progress}%`;

    els.thumbnails.querySelectorAll('.thumbnail').forEach((btn, i) => {
      const isActive = i === state.currentIndex;
      btn.classList.toggle('thumbnail--active', isActive);
      btn.setAttribute('aria-current', isActive ? 'true' : 'false');
      if (isActive) {
        btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });

    updateHash(state.currentIndex);
    document.title = `${slide.id}. ${slide.shortTitle} — Étoile Bleue Urgence`;

    els.btnPrev.disabled = state.currentIndex === 0;
    els.btnNext.disabled = state.currentIndex === SLIDES.length - 1;
  }

  function goToSlide(index, { focus = true } = {}) {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    if (clamped === state.currentIndex && els.slideStage.innerHTML) return;

    state.currentIndex = clamped;
    renderActiveSlide();

    if (focus) {
      els.slideStage.focus({ preventScroll: true });
    }
  }

  function nextSlide() {
    goToSlide(state.currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(state.currentIndex - 1);
  }

  function toggleNotes() {
    state.notesVisible = !state.notesVisible;
    document.body.classList.toggle('notes-open', state.notesVisible);
    els.btnNotes.setAttribute('aria-pressed', String(state.notesVisible));
  }

  function toggleSidebar() {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
    els.btnToggleSidebar.setAttribute('aria-pressed', String(state.sidebarCollapsed));
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
  }

  function onKeyDown(event) {
    const target = event.target;
    const isInput = target.matches('input, textarea, select, [contenteditable]');
    if (isInput) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        nextSlide();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault();
        prevSlide();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(SLIDES.length - 1);
        break;
      case 'n':
      case 'N':
        event.preventDefault();
        toggleNotes();
        break;
      case 'f':
      case 'F':
        event.preventDefault();
        toggleFullscreen();
        break;
      case 'b':
      case 'B':
        event.preventDefault();
        toggleSidebar();
        break;
      default:
        break;
    }
  }

  function init() {
    state.currentIndex = getSlideIndexFromHash();
    renderThumbnails();
    renderActiveSlide();

    els.btnPrev.addEventListener('click', prevSlide);
    els.btnNext.addEventListener('click', nextSlide);
    els.btnNotes.addEventListener('click', toggleNotes);
    els.btnFullscreen.addEventListener('click', toggleFullscreen);
    els.btnToggleSidebar.addEventListener('click', () => {
      toggleSidebar();
      document.body.classList.remove('sidebar-mobile-open');
    });

    const menuBtn = document.getElementById('btn-open-sidebar');
    menuBtn?.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-mobile-open');
    });

    const mq = window.matchMedia('(max-width: 900px)');
    const syncMenu = () => {
      if (menuBtn) menuBtn.hidden = !mq.matches;
      if (!mq.matches) document.body.classList.remove('sidebar-mobile-open');
    };
    mq.addEventListener('change', syncMenu);
    syncMenu();

    document.addEventListener('keydown', onKeyDown);

    window.addEventListener('hashchange', () => {
      const index = getSlideIndexFromHash();
      if (index !== state.currentIndex) goToSlide(index, { focus: false });
    });

    document.addEventListener('fullscreenchange', () => {
      const isFs = Boolean(document.fullscreenElement);
      document.body.classList.toggle('is-fullscreen', isFs);
      els.btnFullscreen.setAttribute('aria-pressed', String(isFs));
    });

    // Touch swipe on stage (mobile)
    let touchStartY = 0;
    els.slideStage.addEventListener(
      'touchstart',
      (e) => {
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );
    els.slideStage.addEventListener(
      'touchend',
      (e) => {
        const delta = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(delta) < 50) return;
        if (delta < 0) nextSlide();
        else prevSlide();
      },
      { passive: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
