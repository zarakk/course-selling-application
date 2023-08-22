import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { CoursesType } from "../custom";

function Courses() {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [error, setError] = useState(false);
  // Function to fetch all courses from the backend
  async function fetchCourses() {
    try {
      const response = await axiosInstance.get("/users/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      if (response.status === 401) setError(true);
      setCourses(response.data.courses);
    } catch (error: any) {
      if (error.response.status === 401) setError(true);
    }
  }

  // Fetch all courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <Typography variant="h4">Courses</Typography>
      {error ? (
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
      ) : (
        <>
          {courses.map((course) => (
            <Card key={course.id} style={{ marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="body2">{course.description}</Typography>
                <Typography variant="body2">Price: ${course.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/courses/${course.id}`}
                >
                  View Course
                </Button>
              </CardActions>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
export default Courses;
