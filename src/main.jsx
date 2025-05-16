import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional: for navbar toggle

import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Adjust path if needed

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </React.StrictMode>
);
