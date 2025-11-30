import { useEffect } from "react"
import { getAllStats } from "../actions"
import { useState } from "react";
import styles from "./stats.module.css";
import { getTodayStatsFromLocalStorage } from "@/utils/localStorage";
import { getPercent } from "@/utils/percent";


export default function Stats({ viewMode, flag }) {

  const [callsToLeads, setCallsToLeads] = useState(0);
  const [presentationsToClose, setPresentationToClose] = useState(0);
  const [knocksToLeads, setKnocksToLeads] = useState(0);
  const [callsAndKnocksToCloses, setCallsAndKnocksToCloses] = useState(0);

  const getStats = async () => {
    const userId = localStorage.getItem('userId');
    const allStats = await getAllStats(userId);
    const sumKnocksCalls = (allStats.knocks + allStats.calls);

    if (viewMode === "allTime") {
      setCallsToLeads(getPercent(allStats.leads, allStats.calls));
      setPresentationToClose(getPercent(allStats.closes, allStats.presentations));
      setKnocksToLeads(getPercent(allStats.leads, allStats.knocks));
      setCallsAndKnocksToCloses(getPercent(allStats.closes, sumKnocksCalls));

    } else if (viewMode === "today") {
      const todayStats = await getTodayStatsFromLocalStorage();
      setCallsToLeads(getPercent(todayStats.leads, todayStats.calls));
      setPresentationToClose(getPercent(todayStats.closes, todayStats.presentations));
      setKnocksToLeads(getPercent(todayStats.leads, todayStats.knocks));
      setCallsAndKnocksToCloses(getPercent(todayStats.closes, sumKnocksCalls));
    }
  }

  useEffect(() => {
    getStats();
    // also a flag that changes the stats dispay based on the viewmode i passed from the main counter page
  }, [viewMode]);


  useEffect(() => {
    //this is legit just a flag that i change on main page when the stats change to fire reload of percentages
    getStats();
  }, [flag]);


  return (
    <>
      <div className={styles.statsContainer}>
        <h2 className={styles.statsTitle}>STATS</h2>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Calls to Leads</div>
          <div className={styles.statValue}>{callsToLeads}%</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Presentations to Closes</div>
          <div className={styles.statValue}>{presentationsToClose}%</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Knocks to Leads</div>
          <div className={styles.statValue}>{knocksToLeads}%</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Knocks + Calls to Closes</div>
          <div className={styles.statValue}>{callsAndKnocksToCloses}%</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{new Date().toDateString().slice(0, -4)}</div>
        </div>

      </div>
    </>
  )
}
