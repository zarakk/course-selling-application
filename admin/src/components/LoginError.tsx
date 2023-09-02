import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginError() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        Please <Link to="/login">Login</Link> to see Courses
      </Typography>
    </Box>
  );
}
