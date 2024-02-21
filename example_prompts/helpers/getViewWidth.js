export default function getViewWidth() {
  return Math.max(
    (typeof document !== "undefined" &&
      document.documentElement?.clientWidth) ||
      0,
    (typeof window !== "undefined" && window.innerWidth) || 0
  );
}
