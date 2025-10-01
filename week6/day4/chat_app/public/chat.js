const socket = io();

const loginDiv = document.getElementById('loginDiv');
const chatDiv = document.getElementById('chatDiv');

const usernameInput = document.getElementById('usernameInput');
const avatarInput = document.getElementById('avatarInput');
const joinBtn = document.getElementById('joinBtn');

const themeSelect = document.getElementById('themeSelect');

const userList = document.getElementById('userList');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const emojiBtn = document.getElementById('emojiBtn');

let username = null;
let avatar = null;
let privateRecipient = null;
const userAvatars = {}; 
themeSelect.addEventListener('change', e => {
  document.body.className = e.target.value;
});

joinBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  avatar = avatarInput.value.trim() || null;

  if (!username) {
    alert('Please enter a username');
    return;
  }

  socket.emit('joinRoom', { username, avatar });

  loginDiv.classList.add('hidden');
  chatDiv.classList.remove('hidden');
});

socket.on('roomUsers', users => {
  updateUsers(users);
  users.forEach(user => {
    userAvatars[user.username] = user.avatar || 'default-avatar.png';
  });
});

function updateUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const btn = document.createElement('button');
    btn.textContent = user.username;
    btn.disabled = user.username === username;
    btn.onclick = () => {
      privateRecipient = user.username;
      alert(`You are now messaging privately with ${privateRecipient}.`);
    };
    btn.innerHTML = `<img src="${user.avatar || 'default-avatar.png'}" alt="avatar" /> ${user.username}`;
    userList.appendChild(btn);
  });
}

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (!msg) return;

  if (privateRecipient) {
    socket.emit('privateMessage', { toUsername: privateRecipient, message: msg });
    addMessage({ username, text: msg, private: true, to: privateRecipient, time: Date.now() });
  } else {
    socket.emit('chatMessage', msg);
  }
  messageInput.value = '';
});
socket.on('message', data => {
  addMessage(data);
});
socket.on('messageHistory', history => {
  history.forEach(addMessage);
});
function addMessage(data) {
  const div = document.createElement('div');
  div.classList.add('message');

  const time = new Date(data.time).toLocaleTimeString();

  if (data.system) {
    div.style.fontStyle = 'italic';
    div.style.color = 'gray';
    div.textContent = `[${time}] ${data.text}`;
  } else {
    const avatar = userAvatars[data.username] || 'default-avatar.png';

    if (data.private) {
      div.classList.add('private');
      let fromTo = data.to ? `(Private to ${data.to})` : '(Private message)';
      div.innerHTML = `[${time}] <img src="${avatar}" alt="avatar" /> <strong>${data.username}</strong> ${fromTo}: ${data.text}`;
    } else {
      div.innerHTML = `[${time}] <img src="${avatar}" alt="avatar" /> <strong>${data.username}</strong>: ${data.text}`;
    }
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}


const picker = new EmojiButton({
  position: 'top-end'
});

emojiBtn.addEventListener('click', () => {
  picker.togglePicker(emojiBtn);
});

picker.on('emoji', emoji => {
  messageInput.value += emoji;
  messageInput.focus();
});
