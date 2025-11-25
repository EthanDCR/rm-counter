"use client";
import { useEffect, useState } from "react";
import styles from "./chat.module.css";



export default function Chat() {


  const [office, setOffice] = useState('');
  const [name, setName] = useState('');



  useEffect(() => {
    setOffice(localStorage.getItem('office'));
    setName(localStorage.getItem('name'));
  }, []);


  useEffect(() => {

    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {

      const user = {
        type: 'user',
        name: localStorage.getItem('name'),
        office: localStorage.getItem('office'),
        id: localStorage.getItem('userId'),
      }

      socket.send(JSON.stringify(user));
      console.log("socket connected to server");
    }



    socket.onerror = (error) => {
      console.error(error, "error w da socket");
    }

    return () => socket.close();
  }, []);


  return (
    <>
      <div className={styles.page}>

        <div className={styles.liveChat}>
          <h1>LIVE CHAT</h1>
          <div className={styles.chatButtons}>
            {office ? <button>{office.toUpperCase()} CHAT</button> : <button>Null CHAT</button>}
            <button>ALL CHAT</button>
          </div>

          <div className={styles.chatMessage}>
            <h6>Name:</h6>
            <p>chat message here</p>
          </div>

          <div className={styles.chatMessage}>
            <h6>Name:</h6>
            <p>chat message here</p>
          </div>

          <div className={styles.chatMessage}>
            <h6>Name:</h6>
            <p>chat message here</p>
          </div>

          <div className={styles.chatMessage}>
            <h6>Name:</h6>
            <p>chat message here</p>
          </div>

          <div className={styles.chatMessage}>
            <h6>Name:</h6>
            <p>chat message here</p>
          </div>

          <div className={styles.chatMessage}>
            <h6>Name:</h6>
            <p>chat message here</p>
          </div>

        </div>

        <input type="text" placeholder="Enter Your Message Here" />
        <button>Send</button>

      </div>
    </>
  )
}
