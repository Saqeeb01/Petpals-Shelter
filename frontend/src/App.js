import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer'
import Home from './Components/Home';
import BrowsePets from './Components/BrowsePets';
import LoginPage from './Components/LoginPage';
import './styles/App.css'; // Import your global styles
import RegisterPage from './Components/RegisterPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowsePets />} />
         <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
