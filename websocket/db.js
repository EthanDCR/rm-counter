
const { createClient } = require('@libsql/client');

let cachedClient = null;

const client = () => {

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


module.exports = client;
