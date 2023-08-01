import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Course {
  title: string;
  imageLink: string;
  description: string;
  id: number;
  published: string;
  price: number;
}

const ShowCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  // Function to fetch all courses from the backend
  async function fetchCourses() {
    const response = await axiosInstance.get("/admin/courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
      },
    });
    setCourses(response.data.courses);
  }

  // Fetch all courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses);
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 6 }}>
          Show Courses Page
        </Typography>
        <Grid container>
          {courses.map((c) => (
            <Grid xs={6} key={c.id}>
              <Course
                title={c.title}
                imageLink={c.imageLink}
                description={c.description}
                published={c.published}
                price={c.price}
                id={c.id}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

const Course = ({
  title,
  imageLink,
  description,
  id,
  published,
  price,
}: Course) => {
  const navigate = useNavigate();
  const editCourseRoute = () => {
    navigate(`/courses/${id}`);
  };
  const courseDetailsRoute = () => {
    navigate(`/courses/details/${id}`);
  };
  return (
    <Box
      sx={{
        margin: 2,
        p: 4,
        minHeight: 300,
        border: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <img
        src={imageLink || `${imageLink}.png`}
        alt={title}
        width={200}
        height={200}
      />
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="h6" component="h2">
        {description}
      </Typography>
      <Typography variant="h6" component="h2">
        ${price}
      </Typography>
      <Typography variant="subtitle1" component="p">
        Published on: {new Date(published).toLocaleDateString()}
      </Typography>

      <Button
        color="primary"
        variant="contained"
        onClick={courseDetailsRoute}
        sx={{ mt: 2 }}
      >
        Course Details
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={editCourseRoute}
        sx={{ mt: 2 }}
      >
        Edit Course
      </Button>
    </Box>
  );
};

export default ShowCourses;
