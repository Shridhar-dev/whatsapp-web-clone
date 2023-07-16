import { addUserToDOM, removeUserFromDOM } from './utils/b.js'

let socket = io("ws://localhost:8000");

socket.on("connect",()=>{
    let name = prompt("enter name: ");
    socket.emit("UpdateProfile", {name});
})

socket.on("OnlineUsers",(users)=>{
    console.log("Users: ",users)
    Object.keys(users).forEach(function(key, index) {
        addUserToDOM(users[key])
    })
})

socket.on("UserJoined",(user)=>{
    addUserToDOM(user)
})

socket.on("UserLeft",(user)=>{
    removeUserFromDOM(user)
})

socket.on("NewMessage", (messageData)=>{
    let history = localStorage.getItem("history")
    history = {
        ...history,
        chats:{
            ...history.chats,
            [sender]: [...history.chats[sender], messageData]            
        }
    }

    console.log("History: ", history)
})

export { socket }