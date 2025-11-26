


export function getTodayStatsFromLocalStorage() {

  const leads = localStorage.getItem('leads') || 0;
  const calls = localStorage.getItem('calls') || 0;
  const knocks = localStorage.getItem('knocks') || 0;
  const inspections = localStorage.getItem('inspections') || 0;
  const presentations = localStorage.getItem('presentations') || 0;
  const closes = localStorage.getItem('closes') || 0;

  const todayStats = {
    leads: leads,
    calls: calls,
    knocks: knocks,
    inspections: inspections,
    presentations: presentations,
    closes: closes,
  }
  return todayStats;
}

