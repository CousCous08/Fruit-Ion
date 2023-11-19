import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import userImage from '../assets/Sample_User_Icon.png';
import aiImage from '../assets/grape_icon.png';
import { NotFoundError } from '@anthropic-ai/sdk';

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

        }, 5); // speed of typing
    }

    const generalPrompt = (userInput) => {
        //return "Thanks for sharing! Keep up the good work.";


        //keep this as a template for the fetch call
        return fetch('http://localhost:5000/api/general_prompt', {
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

    const confirmPrompt = (userInput) => {
        //return "Thanks for sharing! Keep up the good work.";
        return fetch('http://localhost:5000/api/confirm_prompt', {
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


    const getGoalsTest = () => {
        return fetch('http://localhost:5000/api/get_goals_json_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // If you need to send data in the POST request, include it here
            body: JSON.stringify({}) // Sending an empty object as an example
        })
        .then(response => response.json())  // Parses the JSON response
        .then(data => data)
        .catch(error => console.error('Error:', error));
    }

    //use this as a template for getting the master list of goals
    const getGoalsMaster = () => {
        return fetch('http://localhost:5000/api/get_goals_master', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // If you need to send data in the POST request, include it here
            body: JSON.stringify({}) // Sending an empty object as an example
        })
        .then(response => response.json())  // Parses the JSON response
        .then(data => data)
        .catch(error => console.error('Error:', error));
    }


    const getConfirm = () => {
        return fetch('http://localhost:5000/api/get_need_confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // If you need to send data in the POST request, include it here
            body: JSON.stringify({}) // Sending an empty object as an example
        })
        .then(response => response.json())  // Parses the JSON response
        .then(data => data)
        .catch(error => console.error('Error:', error));
    }

    // made it async so it always featches the new goals after it takes care of this one
    const handleSend = async () => {
        if (inputText.trim()) {
            const newUserMessage = { text: inputText, user: currentUser, sender: 'user' };
            //test going into backend
            setMessages([...messages, newUserMessage]);
            setInputText('');

            const needsConfirm = await getConfirm()
            console.log("if this is true, we call our confirmation prompt; else, we call general prompt " + needsConfirm)

            setIsAiTyping(true);

            // Simulate AI response after user sends a message
            //calling the api in this format should work
            let aiResponsePromise = null

            if (needsConfirm == false) {
                aiResponsePromise = await generalPrompt(inputText);
            } else {
                aiResponsePromise = await confirmPrompt(inputText);
            }

            console.log("response finished generating")
            simulateTyping(String(aiResponsePromise))
            setInputText('');

            const needsConfirm2 = await getConfirm()
            console.log("do we need confirmation after the response? " + needsConfirm2)



            //testing getting the goals from server -- for this we return temp_json, which will not be used like this in the final product
            //follow this format to get the master json
            const test_goals = getGoalsTest();
            test_goals.then(response => {
                console.log("the temp_response is " + JSON.stringify(response))
            }).catch(error => {
                console.error('Error', error)
            });

            const master_goals = getGoalsMaster();
            master_goals.then(response => {
                console.log("the master_response is " + JSON.stringify(response))
            }).catch(error => {
                console.error('Error', error)
            });
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