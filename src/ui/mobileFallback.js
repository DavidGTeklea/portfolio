import { content } from './content.js';

// Renders a static, scrollable resume page from the same content data the 3D
// panels use, instead of initializing WebGL / touch controls.
export function renderMobileFallback() {
  document.getElementById('scene')?.remove();
  document.getElementById('loading')?.remove();
  document.getElementById('panel')?.remove();

  const root = document.createElement('div');
  root.className = 'resume';

  const intro = content.intro;
  const header = document.createElement('header');
  header.className = 'resume__header';
  header.innerHTML = `
    <h1>${intro.title}</h1>
    <p class="resume__subtitle">${intro.subtitle}</p>
    <p>${intro.body}</p>
    <div class="resume__links">${renderLinks(intro.links)}</div>
  `;
  root.appendChild(header);

  root.appendChild(section('Experience', ['capital-one', 'ml-research', 'pnc', 'google']));
  root.appendChild(section('Projects', ['eigendb']));
  root.appendChild(section('Education', ['georgia-tech', 'pitt-bs']));
  root.appendChild(contactSection(content.contact));

  document.body.appendChild(root);
}

function renderLinks(links = []) {
  return links
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
    .join('');
}

function section(heading, ids) {
  const el = document.createElement('section');
  el.className = 'resume__section';

  const h2 = document.createElement('h2');
  h2.textContent = heading;
  el.appendChild(h2);

  for (const id of ids) {
    const data = content[id];
    if (!data) continue;

    const entry = document.createElement('article');
    entry.className = 'resume__entry';
    entry.innerHTML = `
      <h3>${data.title}</h3>
      <p class="resume__subtitle">${data.subtitle ?? ''}</p>
      ${data.body ? `<p>${data.body}</p>` : ''}
      ${data.bullets ? `<ul>${data.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>` : ''}
    `;
    el.appendChild(entry);
  }

  return el;
}

function contactSection(data) {
  const el = document.createElement('section');
  el.className = 'resume__section';
  el.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.body ?? ''}</p>
    <div class="resume__links">${renderLinks(data.links)}</div>
  `;
  return el;
}
