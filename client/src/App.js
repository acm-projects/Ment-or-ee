import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {Landnavbar, About, Testimonials, Contact} from "./components/landing/landing";
import Login from "./components/login/login";
import Matches from "./components/matches/matches";
import Questions from "./components/questions/questions";
import Chat from "./components/chat/chat";
import MenteeHome from "./components/home/menteeHome";
import Signup from "./components/signup/signup";
import Tasks from "./components/tasks/tasks";
import Profile from "./components/profile/profile";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menteehome" element={<MenteeHome />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  )
}
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
}