import React, { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { CourseType, CoursesType } from "../custom";
import { Link } from "react-router-dom";
import { Course } from "./Courses";

function PurchasedCourses() {
  const [courses, setCourses] = useState<CourseType[]>([]);

  // Function to fetch all purchased courses from the backend
  async function fetchCourses() {
    const response = await axiosInstance.get("/users/purchasedCourses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    setCourses(response.data.purchasedCourses);
  }

  // Fetch all courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  if (!courses) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Purchased Courses</Typography>
      {courses.map((course) => (
        <>
          <Link to={`/purchase/course/${course.id}`}>
            <Course
              title={course.title}
              imageLink={course.imageLink}
              id={course.id}
              description={course.description}
              price={course.price}
            />
            {/* <Card key={course.id} style={{ marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="body2">{course.description}</Typography>
                <Typography variant="body2">Price: ${course.price}</Typography>
              </CardContent>
            </Card> */}
          </Link>
        </>
      ))}
    </div>
  );
}
export default PurchasedCourses;
