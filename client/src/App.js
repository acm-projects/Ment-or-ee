import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from "./components/navbar";
import {Landnavbar, About, Testimonials, Contact} from "./components/landing/landing";
import Login from "./components/login/login";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  )
}
export default App


const LandingPage = () => {
  return (
    <>
      <Landnavbar />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}