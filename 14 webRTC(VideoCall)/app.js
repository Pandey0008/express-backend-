const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
console.log("connected");
socket.on('signalingMessage', (message) => {
   socket.broadcast.emit("signalingMessage",message)
})

})

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('App listening on port http://localhost:3000');
});