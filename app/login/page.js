"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { createUser } from "../actions";
import { getUser } from "../actions";

export default function login() {


  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();


  const handleLogin = async () => {
    const userObject = await getUser(username);
    console.log(userObject || "user object not returned");
    if (userObject.username === username) {
      localStorage.setItem('userId', username);
      router.push("/");
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
    }
    catch (error) {
      console.error("failed to create new user:");
    }
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

        </div>
      </div>
    </>
  )
}
