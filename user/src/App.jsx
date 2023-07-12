import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Landing from "./components/UserComponents/Landing";
import Login from "./components/UserComponents/Login";
import Courses from "./components/UserComponents/Courses";
import Course from "./components/UserComponents/Course";
import Signup from "./components/UserComponents/Signup";
import PurchasedCourses from "./components/UserComponents/PurchasedCourses";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Courses
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>
          <Button color="inherit" component={Link} to="/courses/purchased">
            Purchased Courses
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
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
