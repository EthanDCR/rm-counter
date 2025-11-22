"use server";

import client from "../lib/db.js";
import bcrypt from "bcrypt";

export async function checkLogin(username, password, userDatabase) {

  if (!userDatabase) {
    return false;
  } else {
    const userPassword = await bcrypt.compare(password, userDatabase.password);
    return userPassword;
  }
}


export async function getUser(userName) {
  const db = await client();
  const result = await db.execute({
    sql: 'select * from users where username = ?',
    args: [userName]
  })

  if (!result.rows[0]) {
    return null;
  }
  else {
    return JSON.parse(JSON.stringify(result.rows[0]));
  }
}


export async function createUser(user) {
  const name = user.name;
  const username = user.username;
  const office = user.office;
  const password = await bcrypt.hash(user.password, 10);
  if (!name || !username || !password) {
    console.error(error, "please fill out all fields");
  }
  const db = await client();
  await db.execute({
    sql: 'insert into users ( name, username, password, office) values (?, ?, ?, ?)',
    args: [name, username, password, office],
  })
}


export async function getAllStats() {
  const stats = {
    time: 'allTime',
    leads: 110,
    calls: 1100,
    knocks: 320,
    inspections: 89,
    presentations: 50,
    closes: 30,
  }
  return stats;
}

export async function getTodayStats() {
  const stats = {
    time: 'today',
    leads: 10,
    calls: 50,
    knocks: 40,
    inspections: 7,
    presentations: 5,
    closes: 10,
  }
  return stats;
}






