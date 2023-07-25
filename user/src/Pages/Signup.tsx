import React from "react";
import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupResponse {
  data: {
    token: string;
  };
}
function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  async function register(): Promise<void> {
    try {
      const response: SignupResponse = await axiosInstance.post(
        "/users/signup",
        {
          username,
          password,
        }
      );
      if (response.data.token) {
        localStorage.setItem("user-token", response.data.token);
        setMessage("Signed up successfully!");
        setSeverity("success");
        setOpen(true);
        navigate("/courses");
      } else {
        setMessage("An error occurred while signing up.");
        setSeverity("error");
        setOpen(true);
      }
    } catch (error: any) {
      setMessage("An error occurred while signing up.");
      setSeverity("error");
      setOpen(true);
    }
  }

  return (
    <div>
      <Typography variant="h4">Signup</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
