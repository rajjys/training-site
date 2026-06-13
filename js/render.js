const SCREENSHOTS_BASE = 'screenshots/';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderLead(lead) {
  if (!lead) return '';
  return `<p class="slide-lead">${escapeHtml(lead)}</p>`;
}

function renderBullets(bullets) {
  if (!bullets?.length) return '';
  return `<ul class="slide-bullets">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`;
}

function renderTable(rows, headers) {
  if (!rows?.length) return '';
  const head = headers
    ? `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>`
    : '';
  const body = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('');
  return `<table class="slide-table">${head}<tbody>${body}</tbody></table>`;
}

function renderTriage(items) {
  if (!items?.length) return '';
  return `<div class="triage-badges">${items
    .map(
      (t) =>
        `<span class="triage-badge triage-badge--${t.color}">${escapeHtml(t.label)}</span>`
    )
    .join('')}</div>`;
}

function renderStats(stats) {
  if (!stats?.length) return '';
  return `<div class="hero-stats">${stats
    .map(
      (s) =>
        `<div class="hero-stat"><span class="hero-stat__value">${escapeHtml(s.value)}</span><span class="hero-stat__label">${escapeHtml(s.label)}</span></div>`
    )
    .join('')}</div>`;
}

function renderFeatureCards(cards) {
  if (!cards?.length) return '';
  return `<div class="feature-cards">${cards
    .map(
      (c) => `
        <div class="feature-card">
          <span class="feature-card__icon" aria-hidden="true">${c.icon}</span>
          <div class="feature-card__body">
            <strong class="feature-card__title">${escapeHtml(c.title)}</strong>
            <p class="feature-card__desc">${escapeHtml(c.desc)}</p>
          </div>
        </div>`
    )
    .join('')}</div>`;
}

function phoneMockup(filename, label, size = 'large') {
  const src = filename ? `${SCREENSHOTS_BASE}${filename}` : '';
  const safeLabel = escapeHtml(label || filename || 'Capture à venir');
  const safeFile = escapeHtml(filename || '');

  return `
    <div class="phone-wrap phone-wrap--${size}" data-screenshot="${safeFile}">
      <div class="phone-frame" aria-label="${safeLabel}">
        <div class="phone-speaker"></div>
        <div class="phone-screen">
          ${
            src
              ? `<img src="${src}" alt="${safeLabel}" loading="lazy" decoding="async" />`
              : ''
          }
          <div class="phone-placeholder">
            <svg class="phone-placeholder__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="2"/>
              <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/>
            </svg>
            <span class="phone-placeholder__text">${safeLabel}</span>
            ${safeFile ? `<code class="phone-placeholder__file">${safeFile}</code>` : ''}
          </div>
        </div>
        <div class="phone-button"></div>
      </div>
      ${label ? `<p class="phone-caption">${safeLabel}</p>` : ''}
    </div>
  `;
}

function renderSlideContent(slide) {
  const callout = slide.callout
    ? `<div class="slide-callout" role="note">${escapeHtml(slide.callout)}</div>`
    : '';

  switch (slide.layout) {
    case 'hero':
      return `
        <div class="slide-inner slide-inner--hero">
          <div class="hero-badge">Formation urgentiste</div>
          <h1 class="slide-title slide-title--hero">${escapeHtml(slide.title)}</h1>
          ${slide.subtitle ? `<p class="slide-subtitle">${escapeHtml(slide.subtitle)}</p>` : ''}
          ${renderLead(slide.lead)}
          ${renderStats(slide.stats)}
          ${renderBullets(slide.bullets)}
          <div class="hero-decoration" aria-hidden="true">
            <span class="hero-cross">+</span>
          </div>
        </div>
      `;

    case 'bullets':
      return `
        <div class="slide-inner slide-inner--text">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          ${renderBullets(slide.bullets)}
        </div>
      `;

    case 'feature-cards':
      return `
        <div class="slide-inner slide-inner--cards">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          ${renderFeatureCards(slide.cards)}
        </div>
      `;

    case 'split-phone':
      return `
        <div class="slide-inner slide-inner--split">
          <div class="slide-content">
            <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
            ${renderLead(slide.lead)}
            ${renderBullets(slide.bullets)}
            ${slide.table ? renderTable(slide.table) : ''}
            ${slide.triage ? renderTriage(slide.triage) : ''}
            ${callout}
          </div>
          <div class="slide-visual">
            ${phoneMockup(slide.screenshot, slide.screenshotLabel)}
          </div>
        </div>
      `;

    case 'ecosystem':
      return `
        <div class="slide-inner slide-inner--ecosystem">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          <div class="ecosystem-flow">
            <div class="eco-node"><span class="eco-icon">👤</span><strong>Citoyen</strong><small>App citoyen</small></div>
            <div class="eco-arrow" aria-hidden="true">→</div>
            <div class="eco-node"><span class="eco-icon">📡</span><strong>Centrale</strong><small>Dashboard CRRA</small></div>
            <div class="eco-arrow" aria-hidden="true">→</div>
            <div class="eco-node eco-node--highlight"><span class="eco-icon">🚑</span><strong>Vous</strong><small>App urgentiste</small></div>
            <div class="eco-arrow" aria-hidden="true">→</div>
            <div class="eco-node"><span class="eco-icon">🏥</span><strong>Hôpital</strong><small>Portail admission</small></div>
          </div>
          ${renderTable(
            [
              ['Citoyen', 'App citoyen', 'Déclenche l\'alerte d\'urgence'],
              ['Centrale (CRRA)', 'Dashboard web', 'Dispatch, coordination, suivi'],
              ['Vous (urgentiste)', 'Cette application', 'Intervention et bilan terrain'],
              ['Hôpital', 'Portail hôpital', 'Acceptation et admission patient'],
            ],
            ['Acteur', 'Interface', 'Rôle']
          )}
        </div>
      `;

    case 'mission-flow':
      return `
        <div class="slide-inner slide-inner--flow">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          <ol class="mission-flow">
            <li><span class="step-num">1</span><span class="step-text"><strong>Alerte</strong> — Accepter ou refuser la mission</span></li>
            <li><span class="step-num">2</span><span class="step-text"><strong>En route</strong> — Navigation GPS vers le patient</span></li>
            <li><span class="step-num">3</span><span class="step-text"><strong>Sur site</strong> — Arrivée confirmée, bilan clinique</span></li>
            <li><span class="step-num">4</span><span class="step-text"><strong>Décision</strong> — Traité sur place ou évacuation</span></li>
            <li><span class="step-num">5</span><span class="step-text"><strong>Transport</strong> — Choix hôpital et navigation</span></li>
            <li><span class="step-num">6</span><span class="step-text"><strong>Admission</strong> — Arrivée hôpital, remise du patient</span></li>
            <li><span class="step-num">7</span><span class="step-text"><strong>Clôture</strong> — Synchronisation et rapport PDF</span></li>
          </ol>
        </div>
      `;

    case 'checklist-good':
      return `
        <div class="slide-inner slide-inner--checklist slide-inner--checklist-good">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          <ul class="checklist checklist--good">
            ${slide.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `;

    case 'checklist-bad':
      return `
        <div class="slide-inner slide-inner--checklist slide-inner--checklist-bad">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          <ul class="checklist checklist--bad">
            ${slide.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `;

    case 'glossary':
      return `
        <div class="slide-inner slide-inner--glossary">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          ${renderTable(slide.table, ['Terme UI', 'Signification'])}
        </div>
      `;

    case 'numbered':
      return `
        <div class="slide-inner slide-inner--workshop">
          <h2 class="slide-title">${escapeHtml(slide.title)}</h2>
          ${renderLead(slide.lead)}
          <ol class="numbered-steps">
            ${slide.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
          </ol>
          ${renderBullets(slide.bullets)}
        </div>
      `;

    default:
      return `<div class="slide-inner"><h2 class="slide-title">${escapeHtml(slide.title)}</h2></div>`;
  }
}

function renderThumbnail(slide) {
  const hasScreenshot = Boolean(slide.screenshot);
  const thumbVisual = hasScreenshot
    ? `<div class="thumb-phone"><img src="${SCREENSHOTS_BASE}${slide.screenshot}" alt="" loading="lazy" /></div>`
    : `<div class="thumb-icon thumb-icon--${slide.category}">${slide.id}</div>`;

  return `
    <button
      type="button"
      class="thumbnail"
      data-slide-id="${slide.id}"
      aria-label="Slide ${slide.id} : ${escapeHtml(slide.shortTitle)}"
      title="${escapeHtml(slide.shortTitle)}"
    >
      <span class="thumbnail__num">${String(slide.id).padStart(2, '0')}</span>
      ${thumbVisual}
      <span class="thumbnail__title">${escapeHtml(slide.shortTitle)}</span>
    </button>
  `;
}

function bindPhoneImages(root) {
  root.querySelectorAll('.phone-screen img').forEach((img) => {
    const screen = img.parentElement;
    const markLoaded = () => {
      screen.classList.add('has-image');
      screen.classList.remove('image-error');
    };
    const markError = () => {
      screen.classList.remove('has-image');
      screen.classList.add('image-error');
    };

    img.addEventListener('load', markLoaded);
    img.addEventListener('error', markError);

    if (img.complete) {
      if (img.naturalWidth > 0) markLoaded();
      else markError();
    }
  });

  root.querySelectorAll('.thumb-phone img').forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.thumb-phone')?.classList.add('thumb-phone--missing');
    });
    img.addEventListener('load', () => {
      img.closest('.thumb-phone')?.classList.add('thumb-phone--loaded');
    });
    if (img.complete && img.naturalWidth > 0) {
      img.closest('.thumb-phone')?.classList.add('thumb-phone--loaded');
    }
  });
}
