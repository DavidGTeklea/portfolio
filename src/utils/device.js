// Desktop is the priority experience (see project plan); touch devices and
// narrow viewports get a static resume page instead of a WebGL scene and
// touch controls we'd otherwise have to build.
export function isMobileOrNarrow() {
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 700;
}
