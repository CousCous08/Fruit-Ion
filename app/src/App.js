import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout'; // Import the layout component
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
    </Routes>
  </BrowserRouter>
);

export default App;
