/* Isolated enhancement: everything is queried inside this assignment's root. */
(() => {
  'use strict';
  const root = document.getElementById('idl');
  if (!root) return;
  const announce = root.querySelector('#copy-status');
  root.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-block').querySelector('pre code');
      const text = code.textContent;
      let copied = false;
      try { await navigator.clipboard.writeText(text); copied = true; }
      catch {
        const selection = window.getSelection();
        const previous = [];
        for (let i = 0; i < selection.rangeCount; i++) previous.push(selection.getRangeAt(i).cloneRange());
        const range = document.createRange(); range.selectNodeContents(code);
        selection.removeAllRanges(); selection.addRange(range);
        try { copied = document.execCommand('copy'); } catch { copied = false; }
        selection.removeAllRanges(); previous.forEach(item => selection.addRange(item));
      }
      button.textContent = copied ? 'Copied ✓' : 'Select & copy';
      announce.textContent = copied ? 'Code copied to clipboard.' : 'Copy unavailable. Select the code and copy it manually.';
      window.setTimeout(() => { button.textContent = 'Copy'; }, 2200);
    });
  });
  const toggle = root.querySelector('.mobile-menu');
  const contents = root.querySelector('#contents');
  const closeMenu = () => { contents.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); contents.classList.toggle('is-open', open);
  });
  contents.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  root.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  window.matchMedia('(min-width: 821px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const links = Array.from(contents.querySelectorAll('nav a[href^="#"]'));
  const targets = links.map(link => root.querySelector(link.getAttribute('href'))).filter(Boolean)
    .sort((a, b) => a === b ? 0 : (a.compareDocumentPosition(b) & 2 ? 1 : -1));
  const progress = root.querySelector('.reading-track span');
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0}%`;
    let active = targets[0];
    targets.forEach(target => { if (target.getBoundingClientRect().top <= 160) active = target; });
    links.forEach(link => { if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  };
  const schedule = () => { if (!scheduled) { scheduled = true; window.requestAnimationFrame(update); } };
  window.addEventListener('scroll', schedule, {passive: true}); window.addEventListener('resize', schedule); root.addEventListener('toggle', schedule, true); update();
  const revealTask = hash => {
    if (!/^#task-[1-6]$/.test(hash)) return;
    const task = root.querySelector(hash);
    if (task) task.open = true;
  };
  links.forEach(link => link.addEventListener('click', () => revealTask(link.hash)));
  window.addEventListener('hashchange', () => revealTask(location.hash));
  revealTask(location.hash);
})();
