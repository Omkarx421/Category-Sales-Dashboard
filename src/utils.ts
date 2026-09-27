export function fmtINR(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export function escapeHTML(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function heatColor(ratio: number): { bg: string; fg: string } {
  const bg = `rgba(212, 175, 55, ${(ratio * 0.18).toFixed(2)})`;
  const fg = ratio > 0.7 ? '#8B6A00' : 'inherit';
  return { bg, fg };
}
