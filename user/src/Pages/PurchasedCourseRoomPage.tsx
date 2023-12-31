import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import Chat from "../components/Chat";

interface Course {
  title: string;
  description: string;
}

export default function PurchasedCourseRoomPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Fetch course information from backend API
    fetch(`http://localhost:3000/users/purchase/course/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourse(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]);

  if (!course) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography variant="h4">{course.title}</Typography>
      <Typography>{course.description}</Typography>
      <Box display="flex" justifyContent="center">
        <Typography style={{ color: "#333", fontSize: "2.2rem" }}>
          Course contents soon to come
        </Typography>
      </Box>
      <Chat />
    </Box>
  );
}
