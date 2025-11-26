import { useEffect } from "react"
import { getAllStats } from "../actions"
import { useState } from "react";
import styles from "./stats.module.css";

export default function Stats({ viewMode }) {

  const [callsToLeads, setCallsToLeads] = useState(0);
  const [presentationsToClose, setPresentationToClose] = useState(0);
  const [knocksToLeads, setKnocksToLeads] = useState(0);
  const [callsAndKnocksToCloses, setCallsAndKnocksToCloses] = useState(0);

  const getPercent = (stat1, stat2) => {
    const percent = (stat1 / stat2) * 100;
    return percent.toFixed(0);
  }

  useEffect(() => {
    const getStats = async () => {
      const allStats = await getAllStats();
      const todayStats = getTodayStats();
      const sumKnocksCalls = (allStats.knocks + allStats.calls);

      if (viewMode === "allTime") {
        setCallsToLeads(getPercent(allStats.leads, allStats.calls));
        setPresentationToClose(getPercent(allStats.closes, allStats.presentations));
        setKnocksToLeads(getPercent(allStats.leads, allStats.knocks));
        setCallsAndKnocksToCloses(getPercent(allStats.closes, sumKnocksCalls));

      } else if (viewMode === "today") {
        setCallsToLeads(getPercent(todayStats.leads, todayStats.calls));
        setPresentationToClose(getPercent(todayStats.presentations, todayStats.closes));
        setKnocksToLeads(getPercent(todayStats.leads, todayStats.knocks));
        setCallsAndKnocksToCloses(getPercent(todayStats.closes, sumKnocksCalls));
      }
    }
    getStats();
  }, [viewMode]);

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
