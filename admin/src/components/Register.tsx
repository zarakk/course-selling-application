import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async () => {
    // Handle form submission
    try {
      const response = await axiosInstance.post("/admin/signup", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user-token", response.data.token);
        setMessage("Signed up successfully!");
        setSeverity("success");
        setOpen(true);
      } else {
        setMessage("An error occurred while signing up.");
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setMessage("An error occurred while signing up.");
      setSeverity("error");
      setOpen(true);
    }
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
          Register to the website
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
