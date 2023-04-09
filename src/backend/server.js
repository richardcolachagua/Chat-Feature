const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socketio');

const app = express();
const server = app.listen(3000, () => {
    console.log('Server started on port 3000');
})

const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New user connected')

socket.on('disconnect', () => {
    console.log('User disconnected')
 })

socket.on('chat messages', (msg) => {
    console.log('Message'+ msg);
    io.emit('chat Message', msg);
})
})
