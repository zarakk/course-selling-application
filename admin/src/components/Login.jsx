import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    // Handle form submission
    const response = await axiosInstance.post("/admin/login", {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user-token", response.data.token);
    } else {
      console.error(error);
    }
    console.log(response.data);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login to admin dashboard
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            autoComplete="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Link href="/register" variant="body2">
            Don't have an account? Sign up
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
