import { createClient } from "@libsql/client";

let cachedClient = null;

export default function client() {
  if (cachedClient) {
    return cachedClient;
  }

  const url = process.env.TURSOURL;
  const token = process.env.TURSOAUTHTOKEN;

  if (!url || !token) {
    throw new Error("Missing TURSOURL or TURSOAUTHTOKEN environment variables");
  }

  cachedClient = createClient({
    url: url,
    authToken: token,
  });

  return cachedClient;
}



