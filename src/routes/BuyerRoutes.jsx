import React from "react";
import { Route, Routes } from "react-router-dom";
import Overview from "../pages/buyer/Overview";
import DashboardLayout from "../component/Buyer/DashboardLayout";
import Products from "../pages/buyer/Products";
import Notifications from "../pages/buyer/Notifications";
import MyCarts from "../pages/buyer/MyCarts";
import Settings from "../pages/buyer/Settings";
import Favourites from "../pages/buyer/Favourites";
import ProductDetail from "../pages/buyer/ProductDetails";
import Checkout from "../pages/buyer/Checkout";
import OrderConfirmation from "../pages/buyer/OrderConfirmation"; 

const BuyerRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/products" element={<Products />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/carts" element={<MyCarts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirm/:orderId" element={<OrderConfirmation />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
};

export default BuyerRoutes;
