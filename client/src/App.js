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
import Questions from "./components/questions/QuestionsSubmit";
import { AuthContextProvider } from "./context/AuthContext";
import { MatchesContextProvider } from "./context/MatchesContext";
import MatchesBox from "./common/MatchesBox";
import TestMatch from "./common/TestMatch";

const App = () => {
  return (
    <AuthContextProvider>
      <MatchesContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            {/* testing */}
            <Route path="/matchesbox" element={<MatchesBox />} />
            <Route path="/testmatch" element={<TestMatch />} />
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
