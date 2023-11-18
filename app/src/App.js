import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Menu/>
      <div className="main-content">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        
      </Routes>
      </div>
    </div>
  </BrowserRouter>
)

export default App;