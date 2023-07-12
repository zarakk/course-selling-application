import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function PurchasedCourses() {
  const [courses, setCourses] = useState([]);

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

  return (
    <div>
      <Typography variant="h4">Purchased Courses</Typography>
      {courses.map((course) => (
        <Card key={course.id} style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h5">{course.title}</Typography>
            <Typography variant="body2">{course.description}</Typography>
            <Typography variant="body2">Price: ${course.price}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export default PurchasedCourses;
