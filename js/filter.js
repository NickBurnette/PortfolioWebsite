import { activeSkill, navigateTo } from './router.js';

export function filterSkill(el) {
  const skill = el.dataset.skill;
  const newSkill = (activeSkill === skill) ? null : skill;
  navigateTo('', newSkill);
}

export function applyFilter(skill) {
  // sync filter bar tag highlights
  document.querySelectorAll('.skill-tag').forEach(t => {
    t.classList.toggle('active', t.dataset.skill === skill);
  });

  // check if any cards match
  const cards = document.querySelectorAll('.project-card');
  let hasMatch = false;
  cards.forEach(card => {
    if (skill !== null && card.dataset.skills.split(',').includes(skill)) hasMatch = true;
  });

  // dim cards only when there are matches — no matches means show all undimmed
  cards.forEach(card => {
    const matches = skill !== null && card.dataset.skills.split(',').includes(skill);
    card.classList.toggle('dimmed', skill !== null && hasMatch && !matches);
  });

  // highlight matching tech badges on cards — same color family as the active filter tag
  const activeTag = skill !== null ? document.querySelector(`.skill-tag[data-skill="${skill}"]`) : null;
  const isLearningSkill = !!(activeTag && activeTag.classList.contains('learning'));
  document.querySelectorAll('.tech-badge').forEach(badge => {
    const matches = skill !== null && badge.textContent.trim().toUpperCase() === skill.toUpperCase();
    badge.classList.toggle('active-skill', matches && !isLearningSkill);
    badge.classList.toggle('active-skill-learn', matches && isLearningSkill);
  });

  // filter hint line
  const hint = document.getElementById('filterHint');
  const hintColor = isLearningSkill ? 'var(--learn-color)' : 'var(--accent-color)';
  hint.innerHTML = skill
    ? `Filtering by <strong style="color:${hintColor}">${skill}</strong> — <a href="#" onclick="navigateTo('',null);return false;">clear filter</a>`
    : '';

  // no-projects message box above grid
  const msg = document.getElementById('noProjectsMsg');
  const noMatch = skill !== null && !hasMatch;
  if (noMatch) {
    msg.innerHTML = `<strong>${skill}</strong> is in my toolkit — no case study yet, but it's on the list. Check back soon.`;
    msg.classList.add('visible');
    // scroll so the message lands just below the sticky filter bar
    setTimeout(() => {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60;
      const filterH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--filter-h')) || 64;
      const top = msg.getBoundingClientRect().top + window.scrollY - navH - filterH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 50);
  } else {
    msg.innerHTML = '';
    msg.classList.remove('visible');
  }
}
