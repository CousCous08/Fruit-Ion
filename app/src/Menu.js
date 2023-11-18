import React from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="menu">
            <Link to="/">Chat</Link>
            <Link to="/stats">Stats</Link>
        </div>
    );
}

export default Menu;