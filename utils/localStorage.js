


export function getTodayStatsFromLocalStorage() {

  const leads = Number(localStorage.getItem('leads')) || 0;
  const calls = Number(localStorage.getItem('calls')) || 0;
  const knocks = Number(localStorage.getItem('knocks')) || 0;
  const inspections = Number(localStorage.getItem('inspections')) || 0;
  const presentations = Number(localStorage.getItem('presentations')) || 0;
  const closes = Number(localStorage.getItem('closes')) || 0;

  const todayStats = {
    leads,
    calls,
    knocks,
    inspections,
    presentations,
    closes,
  }
  return todayStats;
}

