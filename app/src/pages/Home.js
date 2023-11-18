import React, { Component } from 'react';
import ChatInterface from '../components/ChatInterface';

// import './home.css';
class Home extends Component {
    render() {
        return(
            <div className="home-page">
                <ChatInterface />
            </div>
        );
    }
}
export default Home;