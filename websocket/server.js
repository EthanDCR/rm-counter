const dotenv = require('dotenv');
dotenv.config();
const WebSocket = require('ws');
const client = require('./db.js');

const line = () => {
  console.log("=============================================================");
}





//db stuff / function defs ----------------------------------

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

const getOfficeNumbers = async () => {
  const db = client();
  const resultObject = await db.execute('SELECT office, COUNT(*) as userCount FROM users GROUP BY office');

  const officePoints = [];
  for (let i = 0; i < resultObject.rows.length; i++) {
    const row = resultObject.rows[i];
    const pointsNeeded = row.userCount * 100;

    officePoints.push({
      office: row.office,
      userCount: row.userCount,
      pointsNeeded: pointsNeeded,
    })
    console.log(officePoints);
    return officePoints;
  }

}


// -----------  program flow start

const officeNumbers = getOfficeNumbers();
setInterval(async () => {
  const today = new Date();
  if (today.getHours() === 0 && today.getMinutes() === 0) {
    officeNumbers = await getOfficeNumbers();
  }
}, 6000);

console.log(officeNumbers);




// socket stuff ----------------------------------------------------

const wss = new WebSocket.Server({ port: 5000 });
const clients = [];


wss.on('connection', async (ws) => {




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


