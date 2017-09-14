


	var socket = io();
	socket.on('connect', function () {
		console.log('connected');
		
		socket.emit('CreateMessage',{
			to:'abhsd@gmail.com',
			text:'asjdsdjh'
		});
	});

	socket.on('disconnect',function () {
		console.log('disconnect from server');
	});

	socket.on('newMessage',function (message) {
		console.log('new message',message);
	});