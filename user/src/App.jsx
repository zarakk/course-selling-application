import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Landing from "./components/UserComponents/Landing";
import Login from "./components/UserComponents/Login";
import Courses from "./components/UserComponents/Courses";
import Course from "./components/UserComponents/Course";
import Signup from "./components/UserComponents/Signup";
import PurchasedCourses from "./components/UserComponents/PurchasedCourses";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Container style={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/purchased" element={<PurchasedCourses />} />
          <Route path="/courses/:id" element={<Course />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
