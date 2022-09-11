const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

// Importing Server from socket.io
const { Server } = require("socket.io")

// Helps with the "cors" issue
app.use(cors())

// Create server variable using http library
const server = http.createServer(app)

// Connect socket.io server with express created server
const io = new Server(server, {
    // Tell the socket.io to accept communication with port 3000
    // Which is where the default React port
    // Also, add which method to accept (GET and POST)
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// Listening for events in socket.io server
// Detect if someone connect to the socket.io
io.on("connection", (socket) => {
    // Console log the id for those that connect
    console.log(`User Connected: ${socket.id}`)

    
    // Event in socket.io to determine if user want to join a room
    socket.on("join_room", (roomId) => {
        // Event in socket.io to listen to username 
        socket.on("set_username", (name) => {
            socket.join(name)
            // console.log(`User: ${name} joined room: ${roomId} `)
            socket.join(roomId)
            console.log(`User: ${name} joined room: ${roomId} `)
        })
    })


    // Create event to send mesage
    socket.on("send_message", (msgData) => {
        // Emit msg data to front end
        // socket.emit("receive_message", msgData) // for general emit
        // For specific room
        socket.to(msgData.room).emit("receive_message", msgData)
        // console.log(msgData)
    })


    // Listen to those who disconnect
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})


// Server listen to port to 3001 
// Because React default cis 3000
server.listen(3001, () => {
    // Callback function to check if server is running
    console.log("Server Running")
}) 
