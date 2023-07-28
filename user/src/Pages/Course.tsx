import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { CourseType } from "../custom";
import AlertMessage from "../components/AlertMessage";

interface ErrorReturnType {
  response?: {
    data: {
      message: string;
    };
  };
}

function Course() {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  // Function to fetch a single course from the backend
  async function fetchCourse() {
    try {
      const response = await axiosInstance.get(`/users/courses/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      if (response.status === 200) {
        response.data.courses.map((course: CourseType) => {
          if (id) {
            if (course.id === parseInt(id)) {
              setCourse(course);
            }
          }
        });
      } else {
        // handle non-200 response status
        console.error(`An error occurred: ${response.status}`);
      }
    } catch (error) {
      // handle errors
      console.error(error);
    }
  }

  async function purchaseCourse() {
    try {
      await axiosInstance.post(
        `/users/courses/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      setMessage("Course purchased successfully!");
      setSeverity("success");
    } catch (error) {
      const typedError = error as ErrorReturnType;
      if (typedError.response) {
        setMessage(typedError.response.data.message);
      }
    }
  }

  // Fetch the course when the component mounts
  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={course.imageLink} width={200} alt={course.title} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        {course.title}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {course.description}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Price: ${course.price}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={purchaseCourse}
        sx={{ mt: 2 }}
      >
        Purchase Course
      </Button>
      {message && <AlertMessage message={message} severity={severity} />}
    </Box>
  );
}

export default Course;
