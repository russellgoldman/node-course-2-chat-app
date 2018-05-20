// custom javascript
var socket = io();   // initiating the socket connection (and keeping it open)
socket.on('connect', function () {
  // when the client-side connects with the server-side server
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  // when the client-side disconnects with the server-side server
  console.log('Disconnected from server');
});

// waiting to receive 'newMessage' event from the server
socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  // able to append <li></li> onto the <ol></ol> in HTML
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) { // this is a callback function
//   // run when the acknowledgement arrives at the client
//   console.log('Got it', data);
// });

// when the form is submitted, run the following function (forms have a built-in 'submit' event)
jQuery('#message-form').on('submit', function (e) {
  // e stands for event, and preventDefault prevents HTML forms from including the submitted parameters in the URL
  e.preventDefault();

  // emits the 'createMessage' event which gets handled in server.js
  socket.emit('createMessage', {
    from: 'User',
    // selects any element in #message-form that has a name attribute equal to message
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
