import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import SelectedEvent from './pages/SelectedEvent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<SelectedEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
