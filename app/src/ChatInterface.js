import React, { useState } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const currentUser = {
        name: "Current User",
        image: 'Sample_User_Icon.png'
    }

    // Add more functions and JSX here
    const handleSend = () => {
        if (inputText.trim()) {
            setMessages([...messages, { text: inputText, user: currentUser }]);
            setInputText('');
        }
    }

    // Inside your ChatInterface component
    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user.name === currentUser.name ? 'current-user' : ''}`}>
                        <img src={message.user.image} alt={message.user.name} className="message-user-image" />
                        <div className="message-content">
                            <div className="message-user-name">{message.user.name}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-area">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );

}

export default ChatInterface;
