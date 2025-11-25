"use client";
import { useEffect, useState } from "react";
import styles from "./chat.module.css";


export default function Chat() {

  const [office, setOffice] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [testResponse, setTestResponse] = useState(null);



  useEffect(() => {
    setOffice(localStorage.getItem('office'));
    setName(localStorage.getItem('name'));
  }, []);


  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5000");
    setSocket(newSocket);


    newSocket.onopen = () => {
      const user = {
        type: 'user',
        name: localStorage.getItem('name'),
        office: localStorage.getItem('office'),
        id: localStorage.getItem('userId'),
      }

      newSocket.send(JSON.stringify(user));
      console.log("socket connected to server");
    }

    newSocket.onerror = (error) => {
      console.error(error, "error w da socket");
    }

    newSocket.onmessage = (message) => {
      const parsed = JSON.parse(message.data);
      setTestResponse(parsed.message);
    }

    return () => newSocket.close();
  }, []);



  const handleMessageSend = () => {
    if (!socket || !message) {
      console.log('socket or message not found');
      return;
    }

    const chatObject = {
      type: 'chat',
      message: message,
    }
    try {
      socket.send(JSON.stringify(chatObject));
      setMessage('');
      console.log('message sent to server');
    } catch (error) {
      console.error(error, 'message failed to send');
    }
  }

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

          {testResponse ?
            <div className={styles.chatMessage}>
              <h6>Server Response:</h6>
              <p>{testResponse}</p>
            </div>
            :
            <div className={styles.chatMessage}>
              <h6>Name:</h6>
              <p>No response yet</p>
            </div>
          }

        </div>

        <input value={message} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleMessageSend();
          }
        }} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Enter Your Message Here" />
        <button onClick={() => handleMessageSend()}>Send Message</button>

      </div>
    </>
  )
}
