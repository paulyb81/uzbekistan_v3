export function getScoreColor(score: number): {
  badgeBg: string;
  textColor: string;
  dotColor: string;
  markerClass: 'green' | 'yellow' | 'red';
  hex: string;
} {
  if (score >= 8.0) {
    return {
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500/50',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      dotColor: 'bg-emerald-500',
      markerClass: 'green',
      hex: '#16a34a',
    };
  }
  if (score >= 7.0) {
    return {
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500/50',
      textColor: 'text-amber-600 dark:text-amber-400',
      dotColor: 'bg-amber-500',
      markerClass: 'yellow',
      hex: '#d97706',
    };
  }
  return {
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-500/50',
    textColor: 'text-rose-600 dark:text-rose-400',
    dotColor: 'bg-rose-500',
    markerClass: 'red',
    hex: '#dc2626',
  };
}
