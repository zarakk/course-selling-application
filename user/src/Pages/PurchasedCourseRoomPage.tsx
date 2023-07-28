import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
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
    return <div>Loading...</div>;
  }
  console.log("Rendering ParentComponent");
  return (
    <Box>
      <Typography variant="h4">{course.title}</Typography>
      <Typography>{course.description}</Typography>
      <Chat />
    </Box>
  );
}
