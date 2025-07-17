import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Pricing from "../pages/Pricing";
import AuthRoutes from "./AuthRoutes";
import NotFound from "../pages/NotFound";
import AppLayout from "../layouts/AppLayout";
import BuyerRoutes from "./BuyerRoutes";
import ProtectedRoutes from "./ProtectedRoute";
import FarmerRoutes from "./FarmerRoutes";
import FAQPage from "../pages/FAQPage";
import TermsOfServices from "../pages/TermsOfServices";
import PrivacyPolicy from "../pages/PrivacyPolicy";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsOfServices />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route element={<ProtectedRoutes />} allowedRoles={["buyer"]}>
            <Route path="/buyer-dashboard/*" element={<BuyerRoutes />} />
          </Route>
          <Route element={<ProtectedRoutes />} allowedRoles={["farmer"]}>
            <Route path="/farmer-dashboard/*" element={<FarmerRoutes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
