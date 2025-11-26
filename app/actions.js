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
  const db = client();
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
  const db = client();
  await db.execute({
    sql: 'insert into users ( name, username, password, office) values (?, ?, ?, ?)',
    args: [name, username, password, office],
  })
}


export async function getAllStats(userId) {
  const db = client();
  const result = await db.execute({
    sql: `SELECT
            SUM(leads) as leads,
            SUM(call) as calls,
            SUM(knocks) as knocks,
            SUM(inspections) as inspections,
            SUM(presentations) as presentations,
            SUM(closes) as closes
          FROM daily_activities
          WHERE user_id = ?`,
    args: [userId]
  });

  const row = result.rows[0];

  return {
    time: 'allTime',
    leads: row.leads || 0,
    calls: row.calls || 0,
    knocks: row.knocks || 0,
    inspections: row.inspections || 0,
    presentations: row.presentations || 0,
    closes: row.closes || 0,
  };
}

// 2025-11-26

const result = await db.execute({
  sql: `SELECT leads, call, knocks, inspections, presentations, closes
          FROM daily_activities
          WHERE user_id = ? AND date = ?`,
  args: [userId, today]
});

if (result.rows.length === 0) {
  // No record for today yet
  return {
    time: 'today',
    leads: 0,
    calls: 0,
    knocks: 0,
    inspections: 0,
    presentations: 0,
    closes: 0,
  };
}

const row = result.rows[0];
return {
  time: 'today',
  leads: row.leads || 0,
  calls: row.call || 0,
  knocks: row.knocks || 0,
  inspections: row.inspections || 0,
  presentations: row.presentations || 0,
  closes: row.closes || 0,
};



export async function submitStats(userId, stats) {
  const db = client();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Check if record exists for today
  const existing = await db.execute({
    sql: 'SELECT id FROM daily_activities WHERE user_id = ? AND date = ?',
    args: [userId, today]
  });

  if (existing.rows.length > 0) {
    // Update existing record
    await db.execute({
      sql: `UPDATE daily_activities
            SET leads = ?, call = ?, knocks = ?, inspections = ?, presentations = ?, closes = ?
            WHERE user_id = ? AND date = ?`,
      args: [
        stats.leads,
        stats.calls,
        stats.knocks,
        stats.inspections,
        stats.presentations,
        stats.closes,
        userId,
        today
      ]
    });
  } else {
    // Insert new record
    await db.execute({
      sql: `INSERT INTO daily_activities (user_id, date, leads, call, knocks, inspections, presentations, closes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        userId,
        today,
        stats.leads,
        stats.calls,
        stats.knocks,
        stats.inspections,
        stats.presentations,
        stats.closes
      ]
    });
  }

  return { success: true };
}


