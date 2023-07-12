import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../user/src/utils/axiosInstance";
import { useParams } from "react-router-dom";

function EditCourse() {
  const [course, setCourse] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState("");
  const { id } = useParams();

  // Function to fetch a single course from the backend
  async function fetchCourse() {
    const response = await axiosInstance.get(`/admin/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    response.data.courses.map((course) => {
      if (course.id === parseInt(id)) {
        setCourse(course);
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setImageLink(course.imageLink);
        setPublished(course.published);
      }
    });
  }

  // Function to update a course in the backend
  async function updateCourse() {
    await axiosInstance.put(
      `/admin/courses/${id}`,
      {
        title,
        description,
        price,
        imageLink,
        published: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );
    fetchCourse();
  }

  // Fetch the course when the component mounts
  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) return null;

  return (
    <div>
      <h1>Edit Course</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCourse();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={updateCourse}>Update Course</button>
      </form>
    </div>
  );
}
export default EditCourse;
