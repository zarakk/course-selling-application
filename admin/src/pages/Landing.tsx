import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Course 1",
    description: "This is the description of course 1.",
  },
  {
    id: 2,
    title: "Course 2",
    description: "This is the description of course 2.",
  },
  {
    id: 3,
    title: "Course 3",
    description: "This is the description of course 3.",
  },
];

function AdminLanding() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Typography variant="h2" gutterBottom>
                Welcome to My Courses Admin Panel
              </Typography>
              <Typography variant="h5" gutterBottom>
                Manage your courses and content
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Link to="/courses">
                  <Button variant="contained" size="large">
                    Manage Courses
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={
                "https://media.istockphoto.com/id/1286704861/vector/social-media-dashboard-vector-concept-metaphor.jpg?s=1024x1024&w=is&k=20&c=Ds7x41HQhgIzjrGVh6nT-gan-2WLDU3FDQ6ePvE0jE8="
              }
              alt="Learning and education banner"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AdminLanding;
