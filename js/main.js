import { navigateTo, handleRoute } from './router.js';
import { filterSkill } from './filter.js';

// index.html calls these directly via inline onclick="" attributes
// (e.g. onclick="navigateTo('project/ncache')", onclick="filterSkill(this)").
// Module-scoped functions aren't visible to inline handlers by default,
// so they're deliberately exposed on window here.
window.navigateTo = navigateTo;
window.filterSkill = filterSkill;

// popstate fires when back/forward buttons are used
window.addEventListener('popstate', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

/* TYPED ANIMATION */
const fullName = "Nick Burnette";
const tagline  = "Building software that gets out of people's way.";
let charIdx = 0, phase = 0;

function initTyping() {
  const el = document.getElementById('typedText');
  const container = document.getElementById('heroName');

  // Render the complete final text invisibly to measure its true height,
  // then lock that height on the container before clearing and typing.
  el.innerHTML = fullName + '<br><em>' + tagline + '</em>';
  const fullHeight = container.scrollHeight;
  container.style.minHeight = fullHeight + 'px';

  // Clear and start typing
  el.innerHTML = '';
  setTimeout(type, 900);
}

function type() {
  const el = document.getElementById('typedText');
  if (phase === 0) {
    el.innerHTML = fullName.slice(0, charIdx);
    charIdx++;
    if (charIdx > fullName.length) { phase = 1; setTimeout(type, 900); return; }
    setTimeout(type, charIdx === 1 ? 500 : 72);
  } else if (phase === 1) {
    el.innerHTML = fullName + '<br>';
    charIdx = 0; phase = 2;
    setTimeout(type, 120);
  } else if (phase === 2) {
    el.innerHTML = fullName + '<br><em>' + tagline.slice(0, charIdx) + '</em>';
    charIdx++;
    if (charIdx > tagline.length) { document.getElementById('cursor').style.display = 'none'; return; }
    setTimeout(type, 38);
  }
}

// Wait for fonts to load before measuring so clamp() font sizes are accurate
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(initTyping);
} else {
  setTimeout(initTyping, 300);
}
