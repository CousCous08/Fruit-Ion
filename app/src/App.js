import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

const App = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
)

export default App;