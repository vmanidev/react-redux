import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<ProductList />} />
    </Routes>
  );
}
