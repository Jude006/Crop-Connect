import React from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "../pages/Farmer/Settings";
import Notifications from "../pages/Farmer/Notifications";
import Products from "../pages/Farmer/Products";
import Overview from "../pages/Farmer/Overview";
import Orders from "../pages/Farmer/Orders";
import Earnings from "../pages/Farmer/Earnings";
import DashboardLayout from "../component/Farmer/DashboardLayout";
import AddProduct from "../pages/Farmer/AddProducts";
import EditProduct from "../pages/Farmer/EditProduct";


const FarmerRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/products" element={<Products />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />

        
      </Route>
    </Routes>
  );
};

export default FarmerRoutes;
