var socket = io();
      
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

const logStat = (socketId, type) => {
  var item = document.createElement('li');
  item.classList.add('log')
  item.classList.add(type)

  switch(type) {
    case 'in':
      item.textContent = `${socketId} entered`;
      messages.appendChild(item);
      break;
    case 'out':
      item.textContent = `${socketId} left`;
      messages.appendChild(item);
      break;
  }
  window.scrollTo(0, document.body.scrollHeight);
}

// login
socket.on('login', socketId => {
  logStat(socketId, 'in')
})

// logout
socket.on('logout', socketId => {
  logStat(socketId, 'out')
})

const appendMessage = ( msg, type ) => {
  var content = document.createElement('li');
  content.textContent = msg;

  switch(type) {
    case 'received':
      content.classList.add('received')
      break;
    
    case 'sent':
      content.classList.add('sent')
      break;

    case 'typing':
      content.classList.add('typing')
      break;

  }
  messages.appendChild(content);

  window.scrollTo(0, document.body.scrollHeight);
}

// sending message
input.onfocus = function(){
  console.log("ta digitando")
  socket.emit('typing', socket)
}

socket.on('is typing', socketUser => {
  appendMessage(`${socketUser} is typing`, "typing");
})

// send msg
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    appendMessage(input.value, 'sent');
    
    input.value = '';
  }
});

// new message
socket.on('chat message', function(msg) {
  appendMessage(msg, 'received')
});

// join room
