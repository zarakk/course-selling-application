import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn: boolean = !!localStorage.getItem("admin-token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("admin-token");
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {isLoggedIn ? (
          <>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Button color="inherit" component={Link} to="/courses">
              Courses
            </Button>
            <Button color="inherit" component={Link} to="/courses/create">
              Create
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
