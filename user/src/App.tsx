import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Courses from "./Pages/Courses";
import Course from "./Pages/Course";
import Signup from "./Pages/Signup";
import PurchasedCourses from "./Pages/PurchasedCourses";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container style={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/purchased" element={<PurchasedCourses />} />
          <Route path="/courses/:id" element={<Course />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
