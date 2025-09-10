import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:subcategory?" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
