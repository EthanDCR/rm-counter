
"use client";

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
  const [calls, setCalls] = useState(0);
  const [knocks, setknocks] = useState(0);
  const [inspections, setinspections] = useState(0);
  const [presentations, setpresentations] = useState(0);
  const [closes, setcloses] = useState(0);
  const [name, setName] = useState("");
  const [viewMode, setViewMode] = useState("today");
  const [messages, setMessages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const getStats = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      let allStats;

      if (viewMode === "today") {
        allStats = getTodayStatsFromLocalStorage();
        setleads(allStats.leads);
        setCalls(allStats.calls);
        setknocks(allStats.knocks);
        setinspections(allStats.inspections);
        setpresentations(allStats.presentations);
        setcloses(allStats.closes);

      } else if (viewMode === "allTime") {
        allStats = await getAllStats(userId);
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

    if (viewMode === 'allTime') {
      return;
    }

    const ping = new Audio('/notifping.mp3');
    ping.play();

    switch (action) {
      case "leads":
        const newLeads = leads + 1;
        setleads(newLeads);
        localStorage.setItem('leads', newLeads);
        setFlag(!flag);
        break;

      case "call":
        const newCalls = calls + 1;
        setCalls(newCalls);
        localStorage.setItem('calls', newCalls);
        setFlag(!flag);
        break;

      case "knocks":
        const newKnocks = knocks + 1;
        setknocks(newKnocks);
        localStorage.setItem('knocks', newKnocks);
        setFlag(!flag);
        break;

      case "inspections":
        const newInspections = inspections + 1;
        setinspections(newInspections);
        localStorage.setItem('inspections', newInspections);
        setFlag(!flag);
        break;

      case "presentations":
        const newPresentations = presentations + 1;
        setpresentations(newPresentations);
        localStorage.setItem('presentations', newPresentations);
        setFlag(!flag);
        break;

      case "closes":
        const newCloses = closes + 1;
        setcloses(newCloses);
        localStorage.setItem('closes', newCloses);
        setFlag(!flag);
        break;
    }
  }

  const handleDecrement = (action) => {

    if (viewMode === 'allTime') {
      return;
    }

    const ping = new Audio('/minuspoints.mp3');
    ping.play();

    switch (action) {
      case "leads":
        if (leads === 0) {
          break;
        }
        const newLeads = leads - 1;
        setleads(newLeads);
        localStorage.setItem('leads', newLeads);
        setFlag(!flag);
        break;

      case "call":
        if (calls === 0) {
          return;
        }
        const newCalls = calls - 1;
        setCalls(newCalls);
        localStorage.setItem('calls', newCalls);
        setFlag(!flag);
        break;

      case "knocks":
        if (knocks === 0) {
          break;
        }
        const newKnocks = knocks - 1;
        setknocks(newKnocks);
        localStorage.setItem('knocks', newKnocks);
        setFlag(!flag);
        break;

      case "inspections":
        if (inspections === 0) {
          break;
        }
        const newInspections = inspections - 1;
        setinspections(newInspections);
        localStorage.setItem('inspections', newInspections);
        setFlag(!flag);
        break;

      case "presentations":
        if (presentations === 0) {
          break;
        }
        const newPresentations = presentations - 1;
        setpresentations(newPresentations);
        localStorage.setItem('presentations', newPresentations);
        setFlag(!flag);
        break;

      case "closes":
        if (closes === 0) {
          break;
        }
        const newCloses = closes - 1;
        setcloses(newCloses);
        localStorage.setItem('closes', newCloses);
        setFlag(!flag);
        break;
    }
  }


  const handleOpen = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSubmitStats = () => {
    const allStats = getTodayStatsFromLocalStorage();
    console.log(allStats);
  }


  return (
    <div className={styles.page}>
      <Stats viewMode={viewMode} flag={flag}></Stats>
      <main className={styles.main}>
        {name ? <h1>{name.toUpperCase()}S COUNTER</h1> : <h1>COUNTER</h1>}
        <div className={styles.buttons}>
          <button className={viewMode === "today" ? styles.active : ""} onClick={() => changeView("today")}>Today</button>
          <button className={viewMode === "allTime" ? styles.active : ""} onClick={() => changeView("allTime")}>All Time</button>
          <button onClick={() => { localStorage.clear(); isLoggedIn() }}>Logout</button>
        </div>

        <div className={styles.counter}>
          <h1>CALLS</h1><p>+1</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("call")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("call")} className={styles.counterRight}>
              <strong>{calls}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>LEADS</h1><p>+20</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("leads")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("leads")} className={styles.counterRight}>
              <strong>{leads ? leads : 0}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>KNOCKS</h1><p>+1</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("knocks")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("knocks")} className={styles.counterRight}>
              <strong>{knocks ? knocks : 0}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>INSPECTIONS</h1><p>+10</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("inspections")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("inspections")} className={styles.counterRight}>
              <strong>{inspections ? inspections : 0}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>PRESENTATIONS</h1><p>+20</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("presentations")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("presentations")} className={styles.counterRight}>
              <strong>{presentations ? presentations : 0}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>CLOSES</h1><p>+50</p>
          <div className={styles.counterControls}>
            <button onClick={() => handleDecrement("closes")} className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("closes")} className={styles.counterRight}>
              <strong>{closes ? closes : 0}</strong>
            </div>
          </div>
        </div>


        <div className={styles.submitContainer} onClick={() => handleOpen()}>
          <h2>Submit Todays Stats</h2>
        </div>

      </main>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalDiv} onClick={(e) => e.stopPropagation()}>
            <div>
              <p>Are you sure you want to submit your stats for the day?</p>
            </div>

            <div className={styles.modalButtons}>
              <button className={styles.modalSubmitBtn} onClick={handleSubmitStats}>Submit</button>
              <button className={styles.modalCancelBtn} onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <Chat></Chat>
      <Race></Race>
    </div >
  );
}
