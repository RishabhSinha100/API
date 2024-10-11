import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Middle from './Middle/Middle';
import Search from './Search/Search';
import Country from './Country/Country';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      {/* Routes for Home and Country */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Dynamic Route for Country Details */}
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <>
      {/* Search is shown only on the home route */}
      <Search />
      <div className="countries-container">
        <Middle />
      </div>
    </>
  );
}

export default App;
