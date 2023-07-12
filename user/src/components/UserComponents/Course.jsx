import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Course({ match }) {
  const [course, setCourse] = useState(null);

  // Function to fetch a single course from the backend
  async function fetchCourse() {
    try {
      const response = await axiosInstance.get(
        `/users/courses/${match.params.id}`
      );
      if (response.status === 200) {
        setCourse(response.data);
      } else {
        // handle non-200 response status
        console.error(`An error occurred: ${response.status}`);
      }
    } catch (error) {
      // handle errors
      console.error(error);
    }
  }

  // Function to purchase a course
  async function purchaseCourse() {
    await axiosInstance.post(`/users/courses/${match.params.id}`);
    alert("Course purchased successfully!");
  }

  // Fetch the course when the component mounts
  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) return null;

  return (
    <div>
      <Typography variant="h4">{course.title}</Typography>
      <Typography variant="body1">{course.description}</Typography>
      <Typography variant="body1">Price: ${course.price}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={purchaseCourse}
        style={{ marginTop: "1rem" }}
      >
        Purchase Course
      </Button>
    </div>
  );
}
export default Course;
