"use server";

import client from "../lib/db.js";
import bcrypt from "bcrypt";




export async function getUser(userName) {
  const db = await client();
  const result = await db.execute({
    sql: 'select * from users where username = ?',
    args: [userName]
  })
  return JSON.parse(JSON.stringify(result.rows[0]));
}


export async function createUser(user) {
  const name = user.name;
  const username = user.username;
  const password = await bcrypt.hash(user.password, 10);
  if (!name || !username || !password) {
    console.error(error, "please fill out all fields");
  }
  const db = await client();
  await db.execute({
    sql: 'insert into users ( name, username, password) values (?, ?, ?)',
    args: [name, username, password],
  })
}




export async function updateTotal(sales, dropPrice, transitions, pitched, interactions, doorKnocks) {

}





