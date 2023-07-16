const express = require('express')
const app = express();
const { Server } = require("socket.io");


app.use(express.static(__dirname+'/public'))


const server = app.listen(8000)
const io = new Server(server);

const users = {};
const onlineUsers = {};

io.on('connection', (socket) => {

    socket.emit("OnlineUsers", onlineUsers);

    onlineUsers[socket.id] = {};
    onlineUsers[socket.id] = {
        name: "",
        id:socket.id,
        socketToId : {}
    }

    socket.on("UpdateProfile",({name})=>{
        onlineUsers[socket.id] = {
            ...onlineUsers[socket.id],
            name
        }
        console.log("U: ", onlineUsers[socket.id])
        socket.broadcast.emit("UserJoined", onlineUsers[socket.id]);
    })

    socket.on("Chat",({message, receiver})=>{
        socket.to(receiver).emit("NewMessage", 
            {
                message,
                sender: socket.id,
                receiver
            }
        )
    })

    /*
    if(users.length > 0){
        
        socket.broadcast.emit('NewUser', JSON.stringify({id:socket.id}));
    }*/

    socket.on("disconnect",()=>{
        
        io.emit("UserLeft", onlineUsers[socket.id]);
        delete onlineUsers[socket.id]
    })

    //users.add({id:socket.id});
});
