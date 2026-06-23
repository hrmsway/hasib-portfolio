// First-interaction latch shared by all SceneViews. WebGL costs nothing
// until the visitor signals engagement (move, scroll, touch, key) — bots,
// crawlers, and lab runs get the pure-HTML site with the static posters.

const EVENTS = [
  "pointermove",
  "pointerdown",
  "wheel",
  "touchstart",
  "keydown",
  "scroll",
] as const;

let interacted = false;
let armed = false;
const callbacks = new Set<() => void>();

function fire() {
  interacted = true;
  for (const event of EVENTS) {
    window.removeEventListener(event, fire);
  }
  const pending = [...callbacks];
  callbacks.clear();
  for (const cb of pending) cb();
}

export function onFirstInteraction(cb: () => void): () => void {
  if (interacted) {
    cb();
    return () => {};
  }
  callbacks.add(cb);
  if (!armed) {
    armed = true;
    for (const event of EVENTS) {
      window.addEventListener(event, fire, { passive: true, once: false });
    }
  }
  return () => callbacks.delete(cb);
}
