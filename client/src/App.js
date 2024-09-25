import React from 'react'
import Navbar from "./components/navbar";
import {Landnavbar, Landing, About, Testimonials} from "./components/landing/landing";

const App = () => {
  return (
    <div>
      <Landnavbar />
      <Landing />
      <About />
      <Testimonials />

    </div>
  )
}

export default App

