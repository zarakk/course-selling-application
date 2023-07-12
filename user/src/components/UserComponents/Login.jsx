import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to log in a user
  async function login() {
    const response = await axiosInstance.post(
      "/users/login",
      { username, password }
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      //   },
      // }
    );
    if (response.data.token) {
      localStorage.setItem("user-token", response.data.token);
    } else {
      console.error(error);
    }
    console.log(response.data);
  }

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
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
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
