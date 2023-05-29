import Home from "../user/pages/Home.jsx";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import HeaderUpper from "../user/components/Header/HeaderUpper.jsx";
import Header from "../user/components/Header/Header.jsx";
import Footer from "../user/components/Footer/Footer.jsx";
import About from "../user/pages/About.jsx";
import Services from "../user/pages/Services.jsx";
import Products from "../user/pages/Products/Products.jsx";
import ProductsList from "../user/pages/Products/ProductsList.jsx";
import Contact from "../user/pages/Contact.jsx";
import ProductDetails from "../user/pages/Products/ProductDetails.jsx";
import ServiceDetails from "../user/pages/ServiceDetails.jsx";
import { useSelector } from "react-redux";
import { getAllServices } from "../features/serviceSlice.js";
import { useEffect } from "react";
const Layout = () => {
  return (
    <div className="layout__app">
      <BrowserRouter>
        <HeaderUpper />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {/* products  */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductsList />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/services/:id" element={<ServiceDetails />} />

          {/* products  */}

          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Layout;
