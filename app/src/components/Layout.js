import React from 'react';
import Menu from './Menu';
import '../App.css'

const Layout = ({ children }) => (
    <div className="app-container">
        <Menu />
        <div className="main-content">
            {children}
        </div>
    </div>
);

export default Layout;
