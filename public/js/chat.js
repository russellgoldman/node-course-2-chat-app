// custom javascript
var socket = io();   // initiating the socket connection (and keeping it open)

// gets called every time a new message is created
function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  // select last list item in the ordered list
  var newMessage = messages.children('li:last-child');
  // Heights
  // prop() is a jQuery function
  var clientHeight = messages.prop('clientHeight');   // fetch the clientHeight for the full messages window
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  // calculates the height of the message also taking into account the padding that we've applied via CSS
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();  // moves us to the previous child

  // only scroll when we're close to the bottom of the list
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    console.log('Should scroll');
    // scrollTop() is a jQuery method for moving the scroll window, scrollHeight is saying to move to the bottom of the page
    messages.scrollTop(scrollHeight);
  }
}

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
  // loads the createdAt time into moment so we can format the createdAt timestamp
  var formattedTime = moment(message.createdAt).format('h:mm a');

  // target the mustache template and convert it to an HTML template
  var template = jQuery('#message-template').html();
  // fills the HTML template with values and returns the substituted HTML (dynamic templates)
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  // append the new HTML onto the ordered list element with the unique id 'messages'
  jQuery('#messages').append(html);
  scrollToBottom();

  // // // since we are in the client server file, we print the message to the CLIENT CONSOLE
  // // console.log('newMessage', message);
  //
  // // able to append <li></li> onto the <ol></ol> in HTML
  // var li = jQuery('<li></li>');   // generate new <li> element using jQuery
  // // set the text on our new HTML element
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // // append our new <li> element to the existing ordered list with the unique id 'messages'
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  // loads the createdAt time into moment so we can format the createdAt timestamp
  var formattedTime = moment(message.createdAt).format('h:mm a');

  // target the mustache template and convert it to an HTML template
  var template = jQuery('#location-message-template').html();
  // fills the HTML template with values and returns the substituted HTML (dynamic templates)
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  // append the new HTML onto the ordered list element with the unique id 'messages'
  jQuery('#messages').append(html);
  scrollToBottom();

  // // create a new list tag <li> in HTML using jQuery
  // var li = jQuery('<li></li>');
  // // create a new anchor tag <a> in HTML using jQUery
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // // create a new attribute on the anchor tag <a>
  // a.attr('href', message.url);    // set the anchor reference to the url on the message object parameter
  // li.append(a);   // append the anchor tag onto the list element (inner, e.g. <li><a>List item 1</a></li>)
  //
  // // append the new list item to the ordered list
  // jQuery('#messages').append(li);
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

  // querying the HTML DOM for the chat message textbox using jQuery
  var messageTextbox = jQuery('[name=message]');

  // emits the 'createMessage' event which gets handled in server.js
  socket.emit('createMessage', {
    from: 'User',
    // selects any element in #message-form that has a name attribute equal to message
    text: jQuery('[name=message]').val()
  }, function () {  // acknowledgement
    // clear the value in the textbox once the server has received the data
    messageTextbox.val('');   // val() allows for a new string to be entered into the textbox
  });
});

// target the element with the unique id 'send-location'
var locationButton = jQuery('#send-location');
// listening for the click event on the button with the id 'send-location'
locationButton.on('click', function () {
  // this function is called back when the locationButton is clicked
  if (!navigator.geolocation) {
    // if there is no geolocation object on navigator, alert the user the browser doesn't support geolocation (e.g. IE)
    return alert('Geolocation not supported by your browser.');
  }
  // disable the button until the location can be found, add an attribute "disabled" with the value "disabled"
  locationButton.attr('disabled', 'disabled').text('Sending location...');   // .text() changes the text value on the button
  // otherwise, geolocation is supported
  navigator.geolocation.getCurrentPosition(function (position) {
    // re-enable the "Send Location" button if the position was able to be found
    locationButton.removeAttr('disabled').text('Send location');
    // finds current position
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {    // run if location permission denied by the client
    // allow user to try to use the "Send Location" button again
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});
