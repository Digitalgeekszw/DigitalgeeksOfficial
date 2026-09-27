// Swipee's symbol (from swipeeup.store/logos/swipee-symbol.svg): a filled disc
// with a dot and two arcs. `disc` and `marks` let it invert on dark surfaces.
export const SwipeeMark = ({ className = "", disc = "#000", marks = "#fff" }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
    <circle cx="24" cy="24" r="23" fill={disc} />
    <circle cx="18" cy="24" r="7" fill={marks} />
    <path d="M 26 16 A 10 10 0 0 1 26 32" stroke={marks} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 31 11 A 16 16 0 0 1 31 37" stroke={marks} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);
