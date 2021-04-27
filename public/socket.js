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
  var item = document.createElement('li');
  item.textContent = msg;

  switch(type) {
    case 'received':
      item.classList.add('received')
      break;
    
    case 'sent':
      item.classList.add('sent')
      break;
    case 'typing':
      item.classList.add('typing')
      break;

  }
  messages.appendChild(item);

  window.scrollTo(0, document.body.scrollHeight);
}

// sending message
console.log(input)
// input.onchange = function(){
//   console.log("ta digitando")
//   socket.emit('typing', socket)
// }

socket.on('is typing', socketUser => {
  appendMessage(`${socketUser} is typing`, "typing");
})

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

