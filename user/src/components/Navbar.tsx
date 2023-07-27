import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn: boolean = !!localStorage.getItem("user-token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user-token");
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Courses
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/courses/purchased">
              Purchased Courses
            </Button>
            {/* <Avatar>{username[0]}</Avatar> */}
            {/* <Typography variant="subtitle1">{username}</Typography> */}

            <Button color="inherit" component={Link} to="/courses">
              Courses
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
