import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Function to register a new user
  async function register() {
    const response = await axiosInstance.post("/users/signup", {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user-token", response.data.token);
      navigate("/courses");
    } else {
      console.log(response.data);
    }
    console.log(response.data);
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
    </div>
  );
}
export default Signup;
