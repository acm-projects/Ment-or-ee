import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Landnavbar, About, Testimonials, Contact } from "./components/landing/landing";
import Login from "./components/login/login";
import Matches from "./components/matches/matches";
import Questions from "./components/questions/Questions";
import Chat from "./components/chat/chat";
import MenteeHome from "./components/home/menteeHome";
import Signup from "./components/signup/signup";
import Tasks from "./components/tasks/tasks";
import Profile from "./components/profile/profile";
import Home from "./components/home/home";
import { AuthContextProvider } from "./context/AuthContext";

const questions = [
  { type: 'button', text: 'Are you a Mentor or a Mentee?', option1: 'Mentor', option2: 'Mentee'},
  { type: 'text', text: 'What is your full name?'},
  { type: 'text', text: 'What is your location?'},
  { type: 'text', text: 'What languages do you speak?'},
  { type: 'button', text: 'Are you an introvert or an extrovert?', option1: 'Introvert', option2: 'Extrovert'},
  //add more questions later
];

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menteehome" element={<MenteeHome />} />
            <Route path="/questions" element={<Questions questions={questions} />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Routes>
      </Router>
    </AuthContextProvider>
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