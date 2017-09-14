var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm:ss a');

  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location</a>');

  li.text(`${message.from} ${formattedTime} :  `);
  a.attr('href',message.url);
  li.append(a);
  
  jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

    // jQuery('#message-form').text('Sending...');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  });
});
var sendButton = jQuery('#send');

sendButton.on('click',function () {
    sendButton.text('really..');

})




var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('geolocation not supported');
  }

  locationButton.attr('disabled','disabled').text('Sending...');


  navigator.geolocation.getCurrentPosition(function (position) {
    // body...
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
    // console.log(position);
  },function () {
    // body...
    locationButton.removeAttr('disabled').text('Send Location');
    alert('unable to fetch location')
  });


});

