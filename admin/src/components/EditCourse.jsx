import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

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

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Course
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="imageLink"
            label="Image Link"
            name="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={updateCourse} variant="contained" color="primary">
            Update Course
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditCourse;
