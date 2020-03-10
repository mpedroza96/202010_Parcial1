let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};
const messages = [];

socketApi.io = io;
 
io.on('connection', function(socket){

socket.on('new-message', data =>{
    messages.push(data);
    socketApi.sendNotification(messages)
});
});

socketApi.sendNotification = (msg) => {
    io.sockets.emit('messages', msg);
}

module.exports = socketApi;
