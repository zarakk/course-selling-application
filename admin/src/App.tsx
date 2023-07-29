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

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Signup
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
        </Toolbar>
      </AppBar>
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
