"use client";

import { useEffect, useRef } from "react";
import styles from "./race.module.css";


export default function Race() {

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const finishLine = new Image();
    finishLine.src = "/finishlineclear.webp";

    finishLine.onload = () => {
      ctx.drawImage(finishLine, 0, 0, 460, 100);
    };

    finishLine.onerror = () => {
      console.error('Failed to load finishLine.jpg - check if file exists in /public/');
    };

  }, []);

  return (
    <>
      <div className={styles.page}>
        <div>
          <h2>TODAYS LEADERS!</h2>
        </div>

        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} width={460} height={775}></canvas>
          <img src="/rocketclear.gif" alt="Tulsa rocket" className={styles.rocket1} />
          <img src="/rocketclear.gif" alt="Dallas rocket" className={styles.rocket2} />
          <img src="/rocketclear.gif" alt="St Louis rocket" className={styles.rocket3} />
          <img src="/rocketclear.gif" alt="Wichita rocket" className={styles.rocket4} />
          <img src="/rocketclear.gif" alt="Remote rocket" className={styles.rocket5} />
          <div className={styles.label1}>TULSA</div>
          <div className={styles.label2}>DALLAS</div>
          <div className={styles.label3}>ST LOUIS</div>
          <div className={styles.label4}>WICHITA</div>
          <div className={styles.label5}>REMOTE</div>
        </div>

      </div>
    </>
  )
}
