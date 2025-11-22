const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

console.log('WebSocket server running on ws://localhost:5000');

// When a client connects
wss.on('connection', (ws) => {
  console.log('Client connected!');

  // When this client sends a message
  ws.on('message', (data) => {
    console.log('Received:', data.toString());
  });

  // When this client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
