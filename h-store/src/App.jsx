import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// 2. Import the CartModal
import CartModal from "./components/cart/CartModal";
// 1. Import the CartProvider from its correct location
import { CartProvider } from "./components/cart/CartContext"; // Adjusted path
import Home from "./pages/Home";
import Products from "./pages/Products";

const App = () => {
  return (
    // 3. Wrap your entire application with the CartProvider
    <CartProvider>
      <Router>
        {/* 4. Render the CartModal here, outside <Routes> */}
        {/* This allows it to overlay any page */}
        <CartModal />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:subcategory?" element={<Products />} />
          {/* Login, Register, Wishlist routes are intentionally removed */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;