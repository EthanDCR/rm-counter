const dotenv = require('dotenv');
dotenv.config();
const WebSocket = require('ws');
const client = require('./db.js');


//db stuff
const db = client();

const getUser = async (userName) => {
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


//test log a user
console.log(getUser('clinteth000'));




// socket stuff

const wss = new WebSocket.Server({ port: 5000 });
const clients = [];


wss.on('connection', (ws) => {
  console.log('ws connected, total clients: ', clients.length + 1);
  clients.push(ws);

  ws.on('close', () => {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i] === ws) {
        clients.splice(i, 1);
        break;
      }
    }
  })

  ws.on('message', (data) => {
    console.log('message recived from the ws:' + data);
    const parsed = JSON.parse(data);
    switch (parsed.type) {
      case 'user':
        ws.id = parsed.id;
        ws.name = parsed.name;
        ws.office = parsed.office;
        console.log(`new client added successfully, client info -\n  office: ${ws.office},\n name:  ${ws.name},\n id:  ${ws.id}`);
        break;

      case 'chat':
        try {
          clients.forEach(client => {
            const messageObject = {
              type: 'chat',
              message: parsed.message,
            }

            client.send(JSON.stringify(messageObject));
            console.log('message sent back to client - message:\n ' + parsed.message);
          });
        } catch (error) {
          console.error('error sending messages back to client');
        }
        break;
    }
  })

  ws.on('error', () => {
    console.error("webSocket error");
  });

});

console.log('WebSocket server running on ws://localhost:5000');


