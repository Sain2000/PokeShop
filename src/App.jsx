import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <Navbar />

      {/* Contenedor con margen superior para que no lo tape la navbar */}
      <div style={{ marginTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />      
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
