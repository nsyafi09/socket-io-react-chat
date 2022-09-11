import React, { useState } from "react";

function Chat ( {socket, username, room} ) {
    // Set state for message
    const [currentMessage, setCurrentMessage] = useState("")

    // Function to send message
    const sendMessage = async () => {
        if (currentMessage !== "") {
            // Create object to contain the msg data
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                // Getting time for the msg
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
            }

            await socket.emit("send_message", messageData)
        }  
    }


    return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    placeholder="Say something"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value)
                    }}/>
                    
                {/* Button uses symbol > */}
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat