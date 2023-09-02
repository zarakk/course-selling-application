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
import { Link, useNavigate } from "react-router-dom";
import LoginError from "../components/LoginError";

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
  const [error, setError] = useState(false);
  // Function to fetch all courses from the backend
  async function fetchCourses() {
    try {
      const response = await axiosInstance.get("/admin/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });
      setCourses(response.data.courses);
    } catch (error) {
      setError(true);
    }
  }

  // Fetch all courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h4" gutterBottom sx={{ mb: 6 }}>
          Courses to get you started
        </Typography>
        <Grid container>
          {error ? (
            <LoginError />
          ) : (
            <>
              {courses.map((c) => (
                <Grid xs={4} key={c.id}>
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
            </>
          )}
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
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <div
        style={{
          backgroundImage: `url(http://localhost:3000${imageLink})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: 200,
        }}
      ></div>
      <Typography variant="h5" component="h2" sx={{ fontStyle: "bold", pt: 1 }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="h2">
        {description}
      </Typography>
      <Typography variant="h6" component="h2" sx={{ pt: 1 }}>
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
