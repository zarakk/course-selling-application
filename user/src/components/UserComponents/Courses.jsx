import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  // Function to fetch all courses from the backend
  async function fetchCourses() {
    const response = await axiosInstance.get("/users/courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    setCourses(response.data.courses);
  }

  // Fetch all courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <Typography variant="h4">Courses</Typography>
      {courses.map((course) => (
        <Card key={course.id} style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h5">{course.title}</Typography>
            <Typography variant="body2">{course.description}</Typography>
            <Typography variant="body2">Price: ${course.price}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/courses/${course.id}`}>
              View Course
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
export default Courses;
