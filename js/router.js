import { projects } from './data.js';
import { renderDetail, showMainView } from './render.js';
import { applyFilter } from './filter.js';

/* STATE */
export let activeSkill = null;

function buildUrl(path, skill) {
  // Build URL string without triggering browser scroll-to-anchor.
  // Uses the query string (?project=x&filter=y) instead of hash so
  // history.pushState / replaceState can update the bar silently.
  const params = new URLSearchParams();
  if (path) params.set('project', path);
  if (skill) params.set('filter', skill);
  const qs = params.toString();
  return qs ? `?${qs}` : window.location.pathname;
}

export function navigateTo(path, skill) {
  // skill param: undefined = keep current, null = clear, string = set
  const currentSkill = skill === undefined ? activeSkill : skill;

  if (path.startsWith('project/')) {
    // Opening a case study — push so back button works
    history.pushState({ path, skill: currentSkill }, '', buildUrl(path, currentSkill));
    activeSkill = currentSkill;
    const id = path.replace('project/', '');
    if (projects[id]) renderDetail(id);
  } else {
    // Home / filter change — replace so we don't pollute history
    history.replaceState({ path: '', skill: currentSkill }, '', buildUrl('', currentSkill));
    activeSkill = currentSkill;
    applyFilter(currentSkill);
    showMainView();
  }
}

export function handleRoute() {
  // Read state from history (set by navigateTo) or fall back to URL params
  // on first load / hard refresh.
  const state = history.state;
  const urlParams = new URLSearchParams(window.location.search);
  const path  = state?.path  ?? urlParams.get('project') ?? '';
  const skill = state?.skill ?? urlParams.get('filter')  ?? null;

  activeSkill = skill;
  applyFilter(skill);

  if (path.startsWith('project/')) {
    const id = path.replace('project/', '');
    if (projects[id]) { renderDetail(id); return; }
  }
  showMainView();
}
