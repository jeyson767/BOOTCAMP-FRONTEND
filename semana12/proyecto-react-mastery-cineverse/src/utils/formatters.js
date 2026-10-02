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
 * Formats duration in minutes to hours and minutes (e.g., 140 -> "2h 20min")
 */
export function formatDuration(minutes) {
  if (!minutes || isNaN(minutes)) return "N/A";
  const mins = parseInt(minutes, 10);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hrs}h ${remainingMins}m` : `${hrs}h`;
}

/**
 * Returns color classes based on IMDb / rating score
 */
export function getRatingBadgeClass(rating) {
  const num = parseFloat(rating);
  if (isNaN(num)) return "bg-slate-700 text-slate-300";
  if (num >= 8.5) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (num >= 7.0) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  if (num >= 5.0) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  return "bg-rose-500/20 text-rose-400 border-rose-500/30";
}

/**
 * Returns status badge classes
 */
export function getStatusBadgeClass(status) {
  switch (status?.toLowerCase()) {
    case 'estreno':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'disponible':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'próximamente':
    case 'proximamente':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'finalizado':
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    default:
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  }
}
