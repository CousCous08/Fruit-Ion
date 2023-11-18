import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import userImage from './Sample_User_Icon.png';
import aiImage from './AI_Icon.png';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null); // ref for the messages container

    const currentUser = {
        name: "Current User",
        image: userImage
    }

    const aiUser = {
        name: "AI",
        image: aiImage
    }

    const simulateAIResponse = (userInput) => {
        return "Thanks for sharing! Keep up the good work.";
    }

    // Add more functions and JSX here
    const handleSend = () => {
        if (inputText.trim()) {
            const newUserMessage = { text: inputText, user: currentUser, sender: 'user'};
            setMessages([...messages, newUserMessage]);

            // Simulate AI response after user sends a message
            const aiResponse = simulateAIResponse(inputText);
            const newAIMessage = { text: aiResponse, user: aiUser, sender: 'ai'};

            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, newAIMessage]);
            }, 1000);
            setInputText('');
        }
    }

    // use an effect to scroll to the bottom every time messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);  

    // Inside your ChatInterface component
    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user.name === currentUser.name ? 'current-user' : 'message-ai'}`}>
                        <img src={message.user.image} alt={message.user.name} className="message-user-image" />
                        <div className="message-content">
                            <div className="message-user-name">{message.user.name}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <textarea
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
