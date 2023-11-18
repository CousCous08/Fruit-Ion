import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import ChatInterface from './ChatInterface';

function App() {
  const [currentScreen, setCurrentScreen] = useState('chat');


  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router>

  );
}

export default App;
