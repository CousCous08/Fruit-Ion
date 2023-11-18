import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import userImage from './Sample_User_Icon.png';
import aiImage from './AI_Icon.png';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [currentAIMessage, setCurrentAIMessage] = useState('');



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

    // simulate real-time typing effect by gradually updating currentAIMessage
    const simulateTyping = (fullMessage) => {
        let typedMessage = '';
        let index = 0;
        setIsAiTyping(true);

        const typingInterval = setInterval(() => {
            typedMessage += fullMessage[index];
            setCurrentAIMessage(typedMessage);
            index++;

            if (index === fullMessage.length) {
                clearInterval(typingInterval);
                setIsAiTyping(false);
                setMessages(prevMessages => [...prevMessages, { text: fullMessage, user: aiUser, sender: 'ai' }]);
                setCurrentAIMessage('');
            }

        }, 50); // speed of typing
    }

    // Add more functions and JSX here
    const handleSend = () => {
        if (inputText.trim()) {
            const newUserMessage = { text: inputText, user: currentUser, sender: 'user' };
            setMessages([...messages, newUserMessage]);
            setInputText('');

            setIsAiTyping(true);

            // Simulate AI response after user sends a message
            const aiResponse = simulateAIResponse(inputText);
            simulateTyping(aiResponse); // Call simulateTyping here
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
                            <div className={`message-user-name ${message.sender === 'user' ? 'align-right' : 'align-left'}`}>
                                {message.user.name}
                            </div>
                            <div className="message-text">{message.text}</div>

                        </div>
                    </div>
                ))}
                {isAiTyping && (
                    <div className="message message-ai">
                        <img src={aiUser.image} alt={aiUser.name} className="message-user-image" />
                        <div className="message-content">
                            <div className="message-user-name align-left">{aiUser.name}</div>
                            <div className="message-text">{currentAIMessage}</div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <textarea
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder='Hello! Please tell me your achievements for today!'
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );

}

export default ChatInterface;
