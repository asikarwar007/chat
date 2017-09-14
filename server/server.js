const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket)=>{
		console.log('new user');

		socket.emit('newMessage',{
			from:'abhi@example.com',
			text:'text text',
			createAt:123
		});

		socket.on('createMessage',(newMessage)=>{
			console.log('createMessage',newMessage);
		})

	socket.on('disconnect',()=>{
	console.log('user disconnect');
})
		});

	server.listen(port,()=>{
		console.log(`server in on ${port}`);
	})