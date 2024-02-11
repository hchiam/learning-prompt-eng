import prefersReducedMotion from "./prefersReducedMotion";

export function scroll(el, settings) {
  settings = settings || { behavior: 'smooth', block: 'end', inline: 'nearest' };
  if (prefersReducedMotion() && settings.behavior === 'smooth') {
    settings.behavior = 'auto';
  }
  (el || document.body).scrollIntoView(settings);
}
