const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Connected to web socket');

  socket.on('message sent', (msg) => {
    console.log('a message was sent: ', msg);

    io.emit('new message', msg);
  });
});

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));