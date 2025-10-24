import './index.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CartModal from "./components/cart/CartModal";
import { CartProvider } from "./components/cart/CartContext";
import Contact from "./pages/Contact"; // 1. Import the Contact page
import Home from "./pages/Home";
import Products from "./pages/Products";
// src/App.jsx
import React from "react";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <CartModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:subcategory?" element={<Products />} />
          <Route path="/contact" element={<Contact />} /> {/* 2. Add the route */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;