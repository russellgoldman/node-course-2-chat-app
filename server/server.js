const path = require('path');
const http = require('http');   // built-in node module, no need to use npm to install
// joins the directory name and the path we want to go to so we print a simpler path
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const express = require('express');
const socketIO = require('socket.io');
var app = express();
// using http server instead of the express server
var server = http.createServer(app);
// needed to create unique server from express so we can use socketIO
var io = socketIO(server);

// // old way of addressing paths
// console.log(__dirname + '/../public');
// // printing our public path (simple path)
// console.log(publicPath);

// serve the public folder on the server
app.use(express.static(publicPath));

/*
Sockets only run when the client and the server are both connected. If one of them disconnects,
BOTH disconnect. It is an atomic relationship (all or nothing).
*/

// when the server-side connects with the client-side on the server
io.on('connection', (socket) => {
  console.log('New user connected');
  // socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage', {
    // only the client that refreshes their browser receives this
    from: 'Admin',
    text: 'Welcome to the chat app'
  });

  // socket.broadcast.emit from Admin text user joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // socket.emit event is expected to be created from a console, not from index.js
  // socket.emit('createMessage', {from: 'myName', text: 'My text here'});
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // emits a custom event to every client connected
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // // send to everybody but THIS socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.txt,
    //   createdAt: new Date().getTime()
    // });
  });

  // when the server-side disconnects with the client-side on the server
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
