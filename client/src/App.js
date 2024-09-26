import React from 'react'
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/navbar";
import {Landnavbar, About, Testimonials, Contact} from "./components/landing/landing";
const App = () => {
  return (
    <div>
      <Landnavbar />
      <About />
      <Testimonials />
      <Contact />
    </div>
  )
}
export default App