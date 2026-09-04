import { distanceXZ } from '../utils/math.js';
import { content } from './content.js';

// Toggles the content overlay based on the player's distance to each
// landmark, with a wider close-radius than open-radius (hysteresis) so the
// panel doesn't flicker right at the boundary.
export class PanelManager {
  constructor({ landmarks, panelEl, titleEl, subtitleEl, bodyEl, bulletsEl, linksEl }) {
    this.landmarks = landmarks;
    this.panelEl = panelEl;
    this.titleEl = titleEl;
    this.subtitleEl = subtitleEl;
    this.bodyEl = bodyEl;
    this.bulletsEl = bulletsEl;
    this.linksEl = linksEl;
    this.activeId = null;

    panelEl.querySelector('.panel__close').addEventListener('click', () => this.close());
  }

  update(playerPosition) {
    if (this.activeId) {
      const active = this.landmarks.find((l) => l.id === this.activeId);
      if (active && distanceXZ(playerPosition, active.position) > active.radius * 1.3) {
        this.close();
      }
    }

    if (!this.activeId) {
      for (const landmark of this.landmarks) {
        if (distanceXZ(playerPosition, landmark.position) < landmark.radius) {
          this.open(landmark.id);
          break;
        }
      }
    }
  }

  open(id) {
    const data = content[id];
    if (!data) return;
    this.activeId = id;
    this.titleEl.textContent = data.title;
    this.subtitleEl.textContent = data.subtitle;
    this.bodyEl.textContent = data.body ?? '';
    this.bodyEl.style.display = data.body ? '' : 'none';

    this.bulletsEl.innerHTML = '';
    for (const bullet of data.bullets ?? []) {
      const li = document.createElement('li');
      li.textContent = bullet;
      this.bulletsEl.appendChild(li);
    }
    this.bulletsEl.style.display = data.bullets?.length ? '' : 'none';

    this.linksEl.innerHTML = '';
    for (const link of data.links ?? []) {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      this.linksEl.appendChild(a);
    }
    this.panelEl.classList.add('visible');
  }

  close() {
    this.activeId = null;
    this.panelEl.classList.remove('visible');
  }
}
