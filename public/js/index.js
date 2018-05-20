// custom javascript
var socket = io();   // initiating the socket connection (and keeping it open)
socket.on('connect', function () {
  // when the client-side connects with the server-side server
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Yup, that works for me.'
  });
});

socket.on('disconnect', function () {
  // when the client-side disconnects with the server-side server
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
