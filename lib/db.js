"use server";

import { createClient } from "@libsql/client";

export default async function client() {

  const url = process.env.TURSOURL;
  const token = process.env.TURSOAUTHTOKEN;

  if (!url || !token) {
    console.error(error, "unable to get url or auth token for database");
  }

  let client;

  if (!client) {
    client = createClient({
      url: url,
      authToken: token,
    });
  }

  return client;

}



