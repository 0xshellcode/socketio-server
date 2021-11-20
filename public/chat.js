const socket = io();

// DOM Elements

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
  socket.emit('chat:message', {
    username: username.value,
    message: message.value,
  });
});

message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function (message) {
  actions.innerHTML = '';
  output.innerHTML += `<p>
    <<strong>${message.username}</strong>: ${message.message}
   </p>`;
});

socket.on('chat:typing', function (data) {
  actions.innerHTML = `<p><em>${data} is typing a message</em></p>`;
});
