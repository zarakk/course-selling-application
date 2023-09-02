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
  {
    /* featured courses */
  }
  {
    /* best instructors */
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Courses
        </Typography>
        <Button color="inherit" component={Link} to="/" className="navbar-btn">
          Home
        </Button>

        {isLoggedIn ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/courses/purchased"
              className="navbar-btn"
            >
              Purchased Courses
            </Button>
            {/* <Avatar>{username[0]}</Avatar> */}
            {/* <Typography variant="subtitle1">{username}</Typography> */}

            <Button
              color="inherit"
              component={Link}
              to="/courses"
              className="navbar-btn"
            >
              Courses
            </Button>

            <Button color="inherit" onClick={logout} className="navbar-btn">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              className="navbar-btn"
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              className="navbar-btn"
            >
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
