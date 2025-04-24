const express = require('express');
const app = express();
const http = require('http');
const ejs = require('ejs');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    // socket.on('abcd', () => {
    //     //io.emit('defg');//sabko message dega
    //     // socket.emit('defg');//khud ko message dega
    // });
    // socket.on('typing', () => {
    //     socket.broadcast.emit('typing');
    // // });
    //     console.log('connected');
        // socket.on('disconnect', () => {
        //     console.log('disconnected');
        // });

        socket.on('somemessage', (data) => {
            console.log(data);
            socket.broadcast.emit('message',data)
        });
        
    })

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});