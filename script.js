// ====== TEMA (CLARO / ESCURO / AUTOMÁTICO) ======
const THEME_SEQUENCE = ['auto', 'light', 'dark'];
const THEME_LABELS = { auto: 'Auto', light: 'Claro', dark: 'Escuro' };
const THEME_ICONS = {
  auto: 'fa-circle-half-stroke',
  light: 'fa-sun',
  dark: 'fa-moon',
};

const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = themeToggle.querySelector('i');
const themeToggleLabel = document.getElementById('theme-toggle-label');

function applyTheme(theme) {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  themeToggleIcon.className = `fa-solid ${THEME_ICONS[theme]}`;
  themeToggleLabel.textContent = THEME_LABELS[theme];
}

let currentTheme = localStorage.getItem('theme') || 'auto';
applyTheme(currentTheme);

themeToggle.addEventListener('click', function () {
  const nextIndex = (THEME_SEQUENCE.indexOf(currentTheme) + 1) % THEME_SEQUENCE.length;
  currentTheme = THEME_SEQUENCE[nextIndex];
  localStorage.setItem('theme', currentTheme);
  applyTheme(currentTheme);
});

// ====== FILTRO DE PROJETOS ======
const filtersContainer = document.getElementById('project-filters');
const projectGroups = document.querySelectorAll('.project-group');

projectGroups.forEach((group) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'filter-btn';
  btn.dataset.filter = group.dataset.category;
  btn.textContent = group.dataset.category;
  filtersContainer.appendChild(btn);
});

filtersContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filtersContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  projectGroups.forEach((group) => {
    const matches = filter === 'all' || group.dataset.category === filter;
    group.classList.toggle('is-hidden', !matches);
  });
});

// ====== FILTRO DA STACK ======
const skillsFilters = document.getElementById('skills-filters');
const skillCards = document.querySelectorAll('.skill-card');

skillsFilters.addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  skillsFilters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  skillCards.forEach((card) => {
    const categories = card.dataset.category.split(',').map((c) => c.trim());
    const matches = filter === 'all' || categories.includes(filter);
    card.classList.toggle('is-hidden', !matches);
  });
});

