// Inline the logo symbol wherever it's needed, so CSS can animate its parts.
const symbol = document.getElementById('logo');
document.querySelectorAll('[data-logo]').forEach((el) => {
  for (const child of symbol.children) el.appendChild(child.cloneNode(true));
});

const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motionOK) {
  // Normalise stroke lengths so every logo line draws on at the same pace
  document.querySelectorAll('.plate .lg-line path, .plate .lg-line rect')
    .forEach((el) => el.setAttribute('pathLength', '1'));
  document.documentElement.classList.add('js');
}

// Cursor coordinates, like a drafting table readout
const cx = document.getElementById('cx');
const cy = document.getElementById('cy');
const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, '0');
addEventListener('pointermove', (e) => {
  cx.textContent = pad(e.pageX);
  cy.textContent = pad(e.pageY);
}, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Keep the footer date current
const year = new Date().getFullYear();
document.getElementById('year').textContent = year;
document.getElementById('year2').textContent = year;
