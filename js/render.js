import { projects } from './data.js';

/* VIEWS */
let savedScrollY = 0;

export function showMainView(restoreScroll = true) {
  const wasInDetail = document.getElementById('detailView').classList.contains('active');
  document.getElementById('mainView').classList.remove('hidden');
  document.getElementById('detailView').classList.remove('active');
  // Only restore scroll when returning from a case study, not on filter/home nav
  if (restoreScroll && wasInDetail) {
    requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
  }
}

export function renderDetail(id) {
  savedScrollY = window.scrollY;
  const p = projects[id];
  document.getElementById('mainView').classList.add('hidden');
  const dv = document.getElementById('detailView');
  dv.classList.add('active');
  window.scrollTo(0, 0);

  const isPersonal = p.type === 'personal';

  document.getElementById('detailContent').innerHTML = isPersonal ? `
    <p class="detail-eyebrow personal">Personal Project — Built to Learn</p>
    <h1 class="detail-title">${p.title}</h1>
    <div class="detail-stack">${p.stack.map(s => `<span class="tech-badge">${s}</span>`).join('')}</div>
    <p class="detail-section-label personal">The Problem</p>
    <p class="detail-body">${p.problem}</p>
    <p class="detail-section-label personal">My Role</p>
    <p class="detail-body">${p.role}</p>
    <p class="detail-section-label personal">Outcome</p>
    <p class="detail-body">${p.outcome}</p>
    <p class="detail-section-label personal">Key Technical Decisions</p>
    <div class="decision-list">${p.decisions.map(d => `
      <div>
        <p class="decision-title">${d.title}</p>
        <p class="decision-text">${d.text}</p>
      </div>`).join('')}
    </div>
    <p class="detail-section-label personal">Other Notable Details</p>
    <ul class="detail-list">${p.details.map(d => `<li>${d}</li>`).join('')}</ul>
    <p class="detail-section-label personal">What's Next</p>
    <p class="detail-body">${p.next}</p>
    <div class="detail-link-row">
      <a class="detail-repo-link" href="${p.demo}" target="_blank" rel="noopener">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        View Live Demo
      </a>
      <a class="detail-repo-link" href="${p.repo}" target="_blank" rel="noopener">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/></svg>
        View on GitHub
      </a>
    </div>
  ` : `
    <p class="detail-eyebrow">Case Study</p>
    <h1 class="detail-title">${p.title}</h1>
    <div class="detail-stack">${p.stack.map(s => `<span class="tech-badge">${s}</span>`).join('')}</div>
    <p class="detail-section-label">The Problem</p>
    <p class="detail-body">${p.problem}</p>
    <p class="detail-section-label">My Role</p>
    <p class="detail-body">${p.role}</p>
    <p class="detail-section-label">Outcome</p>
    <p class="detail-body">${p.outcome}</p>
    <div class="metrics-row">${p.metrics.map(m => `
      <div class="metric-card">
        <div class="metric-value">${m.value}</div>
        <div class="metric-label">${m.label}</div>
      </div>`).join('')}
    </div>
  `;
}
