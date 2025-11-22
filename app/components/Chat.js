"use client";
import { useEffect, useState } from "react";
import styles from "./chat.module.css";




export default function Chat() {


  const [office, setOffice] = useState('');

  useEffect(() => {
    setOffice(localStorage.getItem('office'));
  }, []);


  return (
    <>
      <div className={styles.page}>



        <div className={styles.liveChat}>
          <h1>Live Chat</h1>
          <div className={styles.chatButtons}>
            <button>{office} Chat</button>
            <button>All Chat</button>
          </div>

          <p>chat message here</p>
          <p>chat message here</p>
          <p>chat message here</p>
          <p>chat message here</p>
          <p>chat message here</p>
          <p>chat message here</p>
          <p>chat message here</p>
          <p>chat message here</p>
        </div>

        <input type="text" placeholder="Enter Your Message Here" />
        <button>Send</button>

      </div>
    </>
  )
}
