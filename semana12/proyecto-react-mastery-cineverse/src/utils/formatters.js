/**
 * Extracts YouTube Video ID from standard, shortened, or embed URLs
 */
export function extractYoutubeId(url) {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

/**
 * Formats duration in minutes to hours and minutes (e.g., 140 -> "2h 20m")
 */
export function formatDuration(minutes) {
  if (!minutes || isNaN(minutes)) return "N/A";
  const mins = parseInt(minutes, 10);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hrs}h ${remainingMins}m` : `${hrs}h`;
}

/**
 * Returns color classes based on IMDb / rating score (Light mode friendly)
 */
export function getRatingBadgeClass(rating) {
  const num = parseFloat(rating);
  if (isNaN(num)) return "bg-slate-100 text-slate-600 border-slate-200";
  if (num >= 8.5) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (num >= 7.0) return "bg-amber-50 text-amber-700 border-amber-200";
  if (num >= 5.0) return "bg-orange-50 text-orange-700 border-orange-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

/**
 * Returns status badge classes (Light mode friendly)
 */
export function getStatusBadgeClass(status) {
  switch (status?.toLowerCase()) {
    case 'estreno':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'disponible':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'próximamente':
    case 'proximamente':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    case 'finalizado':
      return 'bg-slate-100 text-slate-600 border-slate-200';
    default:
      return 'bg-violet-50 text-violet-700 border-violet-200';
  }
}
