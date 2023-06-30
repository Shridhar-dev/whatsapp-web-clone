const express = require('express')
const app = express();
const { Server } = require("socket.io");


app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

const server = app.listen(8000)
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});
