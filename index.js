const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

// Settings

app.set('port', process.env.PORT || 3000);

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Start Server

const server = app.listen(app.get('port'), () => {
  console.log('Server on port:', app.get('port'));
});

const io = SocketIO(server);

// Web Sockets
io.on('connection', (socket) => {
  console.log('New Connection!', socket.id);
  socket.on('chat:message', (message) => {
    io.sockets.emit('chat:message', message);
  });

  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data);
  });
});
