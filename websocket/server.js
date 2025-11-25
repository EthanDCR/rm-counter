const { parse } = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });
const clients = [];

wss.on('connection', (ws) => {
  console.log('ws connected, total clients: ', clients.length + 1);
  clients.push(ws);
  ws.send('Welcome to the server!');

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
    }
  })


  ws.on('error', () => {
    console.error("webSocket error");
  });


});

console.log('WebSocket server running on ws://localhost:5000');


