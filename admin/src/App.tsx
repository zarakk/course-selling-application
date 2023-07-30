import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import CreateCourse from "./pages/CreateCourse";
import Register from "./pages/Register";
import ShowCourses from "./pages/ShowCourses";
import EditCourse from "./pages/EditCourse";
import LiveCourse from "./pages/LiveCourse";
import Navbar from "./components/Navbar";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/courses/:id" element={<EditCourse />} />
          <Route path="/courses/details/:id" element={<LiveCourse />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
