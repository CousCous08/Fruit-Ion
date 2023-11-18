import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Home />}/>
      <Route path="/about" element={<About />} />
    </Routes> 
  </BrowserRouter>
)

export default App;