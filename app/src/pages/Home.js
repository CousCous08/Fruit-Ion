import React, { Component } from 'react';
import ChatInterface from '../components/ChatInterface';
import './Home.css';

// import './home.css';
class Home extends Component {
    render() {
        return (
            <ChatInterface class="chat-in-home" />
        );
    }
}
export default Home;