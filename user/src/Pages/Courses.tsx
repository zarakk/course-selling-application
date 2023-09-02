import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
  Box,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { CourseType, CoursesType } from "../custom";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseType[]>([]);
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

  const goToCourse = (id: number) => {
    navigate(`/courses/${id}`);
  };
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
        <Grid container>
          <>
            {courses.map((course) => (
              <Grid
                xs={4}
                key={course.id}
                onClick={() => goToCourse(course.id)}
              >
                <Course
                  title={course.title}
                  imageLink={course.imageLink}
                  id={course.id}
                  description={course.description}
                  price={course.price}
                />
              </Grid>
            ))}
          </>
        </Grid>
      )}
    </div>
  );
}
export default Courses;

export const Course = ({
  title,
  imageLink,
  description,
  id,
  price,
}: CourseType) => {
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
          backgroundPosition: "center",
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
    </Box>
  );
};
