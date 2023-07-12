import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ShowCourses = () => {
  const [courses, setCourses] = React.useState([]);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.

  // Function to fetch all courses from the backend
  async function fetchCourses() {
    const response = await axiosInstance.get("/admin/courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    setCourses(response.data.courses);
  }

  // Fetch all courses when the component mounts
  React.useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Show Courses Page
        </Typography>
        {courses.map((c, key) => (
          <Course
            key={key}
            title={c.title}
            link={c.link}
            description={c.description}
            published={c.published}
            price={c.price}
            id={c.id}
          />
        ))}
      </Box>
    </Container>
  );
};

const Course = ({ title, link, description, id, published, price }) => {
  const navigate = useNavigate();
  const editRoute = () => {
    navigate(`/courses/${id}`);
  };
  return (
    <Box
      sx={{
        my: 2,
        p: 2,
        border: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onClick={editRoute}
    >
      <img src={link}></img>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>

      <Typography variant="h6" component="h2">
        {description}
      </Typography>
      <Typography variant="h6" component="h2">
        ${price}
      </Typography>
    </Box>
  );
};

export default ShowCourses;

// function ShowCourses() {
//     const [courses, setCourses] = useState([]);

//     // Function to fetch all courses from the backend
//     async function fetchCourses() {
//       const response = await axios.get("/admin/courses");
//       setCourses(response.data.courses);
//     }

//     // Fetch all courses when the component mounts
//     useEffect(() => {
//       fetchCourses();
//     }, []);

//     return (
//       <div>
//         <h1>Show Courses</h1>
//         <ul>
//           {courses.map((course) => (
//             <li key={course.id}>{course.title}</li>
//           ))}
//         </ul>
//       </div>
