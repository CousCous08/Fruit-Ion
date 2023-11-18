import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import userImage from '../assets/Sample_User_Icon.png';
import aiImage from '../assets/grape_icon.png';

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
        //return "Thanks for sharing! Keep up the good work.";


        //keep this as a template for the fetch call
        return fetch('http://localhost:5000/api/test_prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error:', error);
            return '';
        });
    }

    // simulate real-time typing effect by gradually updating currentAIMessage
    const simulateTyping = (fullMessage) => {
        let typedMessage = '';
        let index = 0;
        setIsAiTyping(true);

        const typingInterval = setInterval(() => {
            //console.log(typeof fullMessage);
            typedMessage += fullMessage[index];
            //typedMessage += fullMessage;
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
            //test going into backend
            setMessages([...messages, newUserMessage]);
            setInputText('');

            setIsAiTyping(true);

            // Simulate AI response after user sends a message
            //calling the api in this format should work
            const aiResponsePromise = simulateAIResponse(inputText);


            //
            aiResponsePromise.then(response => {
                    //console.log("+++++");
                    //console.log(typeof response);
                    //console.log("content of ai response in handlesend " + response);
                    simulateTyping(String(response)); // Call simulateTyping here
                }).catch(error => {
                    console.error('Error', error);
                });
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
                    className="chat-input"
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