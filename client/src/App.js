import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Landnavbar,
  About,
  Testimonials,
  Contact,
} from "./components/landing/landing";
import Login from "./components/login/login";
import Matches from "./components/matches/matches";
import Chat from "./components/chat/chat";
import Signup from "./components/signup/signup";
import Tasks from "./components/tasks/tasks";
import Profile from "./components/profile/profile";
import Home from "./components/home/home";
import { AuthContextProvider } from "./context/AuthContext";
import { MatchesContextProvider } from "./context/MatchesContext";

const App = () => {
  return (
    <AuthContextProvider>
      <MatchesContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </MatchesContextProvider>
    </AuthContextProvider>
  );
};
export default App;

const LandingPage = () => {
  return (
    <>
      <Landnavbar />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
};
