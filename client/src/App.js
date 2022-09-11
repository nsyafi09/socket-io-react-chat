import './App.css'
import Chat from './Chat';
// Importing io from socket.io
// To establish connection
import io from 'socket.io-client'
import { useState } from 'react';

// Connecting to the back end port 3001
// Refer to server index.js
const socket = io.connect("http://localhost:3001")
// Server will be logging connection


function App() {
  // Makign state for username and room
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  // State to allow to see the chat
  const [showChat, setShowChat] = useState(false)

  // Establish connection with user and the socket.io connection
  const joinRoom = () => {
    setShowChat(true)
    // Can only join chat if there is a Username and room
    if(username !== "" && room !== "") {
      // Emit join room and pass the data (roomId)
      socket.emit("join_room", room)
      socket.emit("set_username", username)
    }
  }


  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Join Conversation</h3>
        {/* Writing JavaScript if showChat */}
        {/* For setting username */}
        <input 
          type="text" 
          placeholder="name" 
          onChange={(event) => {
            setUsername(event.target.value)
          }}/>
        {/* For setting the room id */}
        <input 
          type="text" 
          placeholder="Room ID"
          onChange={(event) => {
            setRoom(event.target.value)
          }}/>

        <button onClick={joinRoom}>Join A Room</button>
      </div>)
      : (
      // {/* Listen to username and room */}
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
