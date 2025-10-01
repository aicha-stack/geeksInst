const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MESSAGE_FILE = path.join(__dirname, 'messages.json');

let messagesHistory = [];
const users = {};

try {
  const data = fs.readFileSync(MESSAGE_FILE);
  messagesHistory = JSON.parse(data);
} catch {
  messagesHistory = [];
}

app.use(express.static(path.join(__dirname, '../public')));

function saveMessages() {
  fs.writeFile(MESSAGE_FILE, JSON.stringify(messagesHistory, null, 2), err => {
    if (err) console.error('Erreur sauvegarde messages:', err);
  });
}

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, avatar }) => {
    socket.username = username;
    users[username] = { id: socket.id, avatar };

    socket.emit('messageHistory', messagesHistory);
    const joinMsg = { username: 'System', text: `${username} joined the chat`, time: Date.now(), system: true };
    messagesHistory.push(joinMsg);
    saveMessages();

    io.emit('message', joinMsg);
    io.emit('roomUsers', Object.entries(users).map(([user, data]) => ({ username: user, avatar: data.avatar })));
  });
  socket.on('chatMessage', msg => {
    const messageData = {
      username: socket.username,
      text: msg,
      time: Date.now(),
      private: false
    };
    messagesHistory.push(messageData);
    saveMessages();
    io.emit('message', messageData);
  });
  socket.on('privateMessage', ({ toUsername, message }) => {
    const toUser = users[toUsername];
    if (toUser) {
      const privateMsg = {
        username: socket.username,
        text: message,
        time: Date.now(),
        private: true,
        to: toUsername
      };
      messagesHistory.push(privateMsg);
      saveMessages();

      io.to(toUser.id).emit('message', privateMsg);
      socket.emit('message', privateMsg);
    }
  });

  socket.on('disconnect', () => {
    if (!socket.username) return;

    const leaveMsg = { username: 'System', text: `${socket.username} left the chat`, time: Date.now(), system: true };
    messagesHistory.push(leaveMsg);
    saveMessages();

    delete users[socket.username];
    io.emit('message', leaveMsg);
    io.emit('roomUsers', Object.entries(users).map(([user, data]) => ({ username: user, avatar: data.avatar })));
  });
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
