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

    const rocketImg = new Image();
    const rocketImg2 = new Image();
    const rocketImg3 = new Image();
    const rocketImg4 = new Image();
    const rocketImg5 = new Image();

    rocketImg.src = "/rocket1.png";
    rocketImg2.src = "/rocket2.png";
    rocketImg3.src = "/rocket3.png";
    rocketImg4.src = "/rocket4.png";
    rocketImg5.src = "/rocket5.png";

    //460 x 750

    rocketImg.onload = () => {
      ctx.drawImage(rocketImg, 15, 625, 72, 72);
    }

    rocketImg2.onload = () => {
      ctx.drawImage(rocketImg, 100, 625, 72, 72);
    }
    rocketImg3.onload = () => {
      ctx.drawImage(rocketImg, 190, 625, 72, 72);
    }
    rocketImg4.onload = () => {
      ctx.drawImage(rocketImg, 280, 625, 72, 72);
    }

    rocketImg5.onload = () => {
      ctx.drawImage(rocketImg, 370, 625, 72, 72);
    }

  }, []);



  return (
    <>
      <div className={styles.page}>
        <div>
          <h2> Todays Leaders!</h2>
        </div>

        <div>
          <canvas ref={canvasRef} width={460} height={750}></canvas>
        </div>

      </div>
    </>
  )
}
