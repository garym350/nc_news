
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ArticleCard from './Components/ArticleCard';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<ArticleCard />} />
    </Routes>
  );
}

export default App;
