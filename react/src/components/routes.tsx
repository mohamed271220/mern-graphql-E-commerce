import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About";
import Login from "./login";
import SignUp from "./SignUp";
import Cart from "./Product/cart/Cart";
import Product from "./product Route/Product";
import User from "./user/User";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./dashboard/Dashboard";
import DashProducts from "./dashboard/DashProducts";
import UpdateProduct from "./dashboard/UpdateProduct";
import DashUpdateProduct from "./dashboard/DashUpdateProduct";
import DashAddProduct from "./dashboard/DashAddProduct";
import Orders from "./dashboard/Orders";
import CompareProducts from "./Compare/CompareProducts";

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/compare" element={<CompareProducts />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="products" element={<DashProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addproduct" element={<DashAddProduct />} />
          <Route path="update/:id" element={<DashUpdateProduct />} />
        </Route>
        <Route path="/:id" element={<Product />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
