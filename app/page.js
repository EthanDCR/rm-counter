
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllStats } from "./actions";
import Stats from "./components/Stats";
import Chat from "./components/Chat";
import Race from "./components/Race";
import { getTodayStatsFromLocalStorage } from "@/utils/localStorage";



export default function Home() {
  const router = useRouter();
  const [leads, setleads] = useState(0);
  const [call, setCalls] = useState(0);
  const [knocks, setknocks] = useState(0);
  const [inspections, setinspections] = useState(0);
  const [presentations, setpresentations] = useState(0);
  const [closes, setcloses] = useState(0);
  const [name, setName] = useState("");
  const [viewMode, setViewMode] = useState("today");
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    const getStats = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      let allStats;

      if (viewMode === "today") {
        allStats = getTodayStatsFromLocalStorage();
      } else if (viewMode === "allTime") {
        allStats = await getAllStats(userId);
      }

      if (allStats) {
        setleads(allStats.leads);
        setCalls(allStats.calls);
        setknocks(allStats.knocks);
        setinspections(allStats.inspections);
        setpresentations(allStats.presentations);
        setcloses(allStats.closes);
      }
    }
    getStats();
  }, [viewMode]);


  useEffect(() => {
    const getName = () => {
      setName(localStorage.getItem('name'));
    }
    getName();
  }, []);

  const isLoggedIn = () => {
    const user = localStorage.getItem('userId');
    if (!user) {
      router.push("/login");
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  const changeView = (view) => {
    switch (view) {
      case "today":
        setViewMode("today");
        break;
      case "allTime":
        setViewMode("allTime");
        break;
    }
  }

  const handleClick = (action) => {
    switch (action) {
      case "leads":
        setleads(leads + 1);
        break;
      case "call":
        setCalls(call + 1);
        break;
      case "knocks":
        setknocks(knocks + 1);
        break;
      case "inspections":
        setinspections(inspections + 1);
        break;
      case "presentations":
        setpresentations(presentations + 1);
        break;
      case "closes":
        setcloses(closes + 1);
        break;
    }
  }


  const handleDecrement = (action) => {
    switch (action) {
      case "leads":
        setleads(leads - 1);
        break;
      case "call":
        setCalls(call - 1);
        break;
      case "knocks":
        setknocks(knocks - 1);
        break;
      case "inspections":
        setinspections(inspections - 1);
        break;
      case "presentations":
        setpresentations(presentations - 1);
        break;
      case "closes":
        setcloses(closes - 1);
        break;
    }
  }

  return (
    <div className={styles.page}>
      <Stats viewMode={viewMode}></Stats>
      <main className={styles.main}>
        {name ? <h1>{name.toUpperCase()}S COUNTER</h1> : <h1>COUNTER</h1>}
        <div className={styles.buttons}>
          <button onClick={() => changeView("today")}>Today</button>
          <button onClick={() => changeView("allTime")}>All Time</button>
          <button onClick={() => { localStorage.clear(); isLoggedIn() }}>Logout</button>
        </div>

        <div className={styles.counter}>
          <h1>CALLS</h1><p>+1</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("call")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("call")} className={styles.counterRight}>
              <strong>{call}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>LEADS</h1><p>+20</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("leads")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("leads")} className={styles.counterRight}>
              <strong>{leads}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>KNOCKS</h1><p>+1</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("knocks")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("knocks")} className={styles.counterRight}>
              <strong>{knocks}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>INSPECTIONS</h1><p>+10</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("inspections")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("inspections")} className={styles.counterRight}>
              <strong>{inspections}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>PRESENTATIONS</h1><p>+20</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("presentations")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("presentations")} className={styles.counterRight}>
              <strong>{presentations}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>CLOSES</h1><p>+50</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("closes")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("closes")} className={styles.counterRight}>
              <strong>{closes}</strong>
            </div>
          </div>
        </div>


        <div className={styles.submitContainer} onClick={() => console.log("submit stats clicked")}>
          <h2>Submit Todays Stats</h2>
        </div>
      </main >
      <Chat></Chat>
      <Race></Race>
    </div >
  );
}
