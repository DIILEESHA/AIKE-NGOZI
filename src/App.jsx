import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Count from "./components/count/Count";
import Header from "./components/header/Header";
import Middle from "./components/middle/Middle";
import Rsvp from "./components/middle/Rsvp";
import AdminDashboard from "./components/middle/AdminDashboard"; // Admin Dashboard component

const Home = () => (
  <div className="ham">
    <Header />
    <Middle />
    {/* <Count /> */}
    {/* <Rsvp/> */}
  </div>
);

const Footer = () => (
  <></>
  // <footer className="footer_container">
  //   <h2 className="footer_gradient_text">AIKE & NGOZI</h2>
  //   <p className="footer_text">Celebrating love, laughter, and 25 years of togetherness</p>
  //   <p className="footer_small">© 2026 AIKE & NGOZI. All rights reserved.</p>

  //   <div className="footer_social">
  //     <a href="#"><i className="fab fa-instagram"></i></a>
  //     <a href="#"><i className="fab fa-facebook"></i></a>
  //     <a href="#"><i className="fab fa-pinterest"></i></a>
  //   </div>
  // </footer>
);

const AppWrapper = () => {
  const location = useLocation();

  // Hide footer on Admin Dashboard
  const hideFooter = location.pathname === "/admin";

  return (
    <div>
      {/* Navigation Links */}
   

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Conditionally Render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
