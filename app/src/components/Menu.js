import React from 'react'
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <Link to="/chat" className = "menu-button">Chat</Link>
            <Link to="/goals" className = "menu-button">Goals</Link>
        </div>
    );
}

export default Menu;