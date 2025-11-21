"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { createUser } from "../actions";
import { getUser } from "../actions";
import { checkLogin } from "../actions";


export default function login() {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [notFound, setNotFound] = useState(false);



  const router = useRouter();


  const handleLogin = async () => {
    const userObject = await getUser(username);

    const isAuthed = await checkLogin(username, password, userObject);

    if (isAuthed) {
      localStorage.setItem('userId', username);
      localStorage.setItem('name', name);
      router.push("/");
    } else {
      setNotFound(true);
      setTimeout(() => {
        setNotFound(false);
      }, 2000);
    }
  }

  const makeNewUser = (username, password, name) => {
    return {
      username: username,
      password: password,
      name: name,
    }
  }

  const createNewUser = async () => {
    const user = makeNewUser(username, password, name);

    try {
      await createUser(user);
      console.log("user created");
      localStorage.setItem('userId', user.name);
      localStorage.setItem('name', user.name);
    }
    catch (error) {
      console.error("failed to create new user:");
    }

    router.push('/');
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.loginContainer}>
          <h2>Welcome Back</h2>
          <input placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <input placeholder="Your Name" type="text" onChange={(e) => setName(e.target.value)} />

          <button onClick={() => handleLogin()}>Login</button>
          <button onClick={() => createNewUser()}>Create New Account</button>
          {notFound && <p className={styles.notFound}> USER NOT FOUND </p>}

        </div>
      </div>
    </>
  )
}
