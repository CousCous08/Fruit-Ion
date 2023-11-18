import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout'; // Import the layout component
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import GoalsPage from './pages/GoalsPage';
import MilestonesPage from './pages/MilestonesPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Layout><Home /></Layout>} />
      <Route path="/goals" element={<Layout><GoalsPage /></Layout>} />
      <Route path="/milestones/:goalId" element={<MilestonesPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
