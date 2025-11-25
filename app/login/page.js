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
  const [office, setOffice] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [enterAllFields, setEnterAllFields] = useState(false);


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

  const makeNewUser = (username, password, name, office) => {
    return {
      username: username,
      password: password,
      name: name,
      office: office,
    }
  }

  const createNewUser = async () => {

    if (!username || !password || !name || !office) {
      setEnterAllFields(true);
      setTimeout(() => {
        setEnterAllFields(false);
      }, 2000);
      return;
    }

    const user = makeNewUser(username, password, name, office);

    try {
      await createUser(user);
      console.log("user created");
      localStorage.setItem('userId', user.username);
      localStorage.setItem('name', user.name);
      localStorage.setItem('office', user.office);
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

          <select className={styles.dropDown} onChange={(e) => setOffice(e.target.value)}>
            <option value="null">Select your office location</option>
            <option value="tulsa">Tulsa</option>
            <option value="stLouis">St Louis</option>
            <option value="dallas">Dallas</option>
            <option value="wichita">Wichita</option>
            <option value="remote">Remote</option>
          </select>


          <button onClick={() => handleLogin()}>Login</button>
          <button onClick={() => createNewUser()}>Create New Account</button>
          {notFound && <p className={styles.notFound}> USER NOT FOUND </p>}
          {enterAllFields && <p className={styles.notFound}>ENTER ALL FIELDS</p>}
        </div>
      </div>
    </>
  )
}
