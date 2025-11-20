
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [sales, setSales] = useState(0);
  const [dropPrice, setDropPrice] = useState(0);
  const [transitions, setTransitions] = useState(0);
  const [pitches, setPitches] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [doorKnocks, setDoorKnocks] = useState(0);

  const isLoggedIn = () => {
    const user = localStorage.getItem('userId');
    if (!user) {
      router.push("/login");
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  const handleClick = (action) => {
    switch (action) {
      case "sales":
        setSales(sales + 1);
        break;
      case "dropPrice":
        setDropPrice(dropPrice + 1);
        break;
      case "transition":
        setTransitions(transitions + 1);
        break;
      case "pitch":
        setPitches(pitches + 1);
        break;
      case "interaction":
        setInteractions(interactions + 1);
        break;
      case "doorKnock":
        setDoorKnocks(doorKnocks + 1);
        break;
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>COUNTER</h1>
        <div className={styles.buttons}>
          <button>Today</button>
          <button>All Time</button>
          <button onClick={() => { localStorage.clear(); isLoggedIn() }}>Logout</button>
        </div>
        <div className={styles.counter}>
          <h1>SALES</h1>
          <div className={styles.counterControls}>
            <button className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("sales")} className={styles.counterRight}>
              <strong>{sales}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>DROP PRICE</h1>
          <div className={styles.counterControls}>
            <button className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("dropPrice")} className={styles.counterRight}>
              <strong>{dropPrice}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>TRANSITIONS</h1>
          <div className={styles.counterControls}>
            <button className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("transition")} className={styles.counterRight}>
              <strong>{transitions}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>PITCHED</h1>
          <div className={styles.counterControls}>
            <button className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("pitch")} className={styles.counterRight}>
              <strong>{pitches}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>INTERACTIONS</h1>
          <div className={styles.counterControls}>
            <button className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("interaction")} className={styles.counterRight}>
              <strong>{interactions}</strong>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          <h1>DOORS KNOCKED</h1>
          <div className={styles.counterControls}>
            <button className={styles.decrementBtn}>-</button>
            <div onClick={() => handleClick("doorKnock")} className={styles.counterRight}>
              <strong>{doorKnocks}</strong>
            </div>
          </div>
        </div>


        <div className={styles.submitContainer} onClick={() => console.log("submit stats")}>
          <h2>Submit todays stats</h2>
        </div>







      </main >
    </div >
  );
}
