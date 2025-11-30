



export function getPercent(stat1, stat2) {
  if (!stat2 || stat2 === 0) {
    return 0;
  }
  const percent = (stat1 / stat2) * 100;
  return percent.toFixed(0);
}



