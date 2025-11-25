const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });
const clients = [];

wss.on('connection', (ws) => {
  console.log(`ws: ${ws}`);
  console.log('Client connected, total clients: ', clients.length + 1);
  clients.push(ws);
  ws.send('Welcome to the server!');

  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log('message recived from the client:' + data);
  })

});

console.log('WebSocket server running on ws://localhost:5000');


