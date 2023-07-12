import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  // Function to create a new course
  async function createCourse() {
    const response = await axiosInstance.post(
      "/admin/courses",
      {
        title,
        description,
        price,
        imageLink: link,
        published: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );
    console.log(response.data);
    setTitle("");
    setDescription("");
    setPrice("");
    setLink("");
  }

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
          Create Course
        </Typography>
        <Box component="form" onSubmit={createCourse} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="imageLink"
            label="Image Link"
            name="imageLink"
            autoComplete="imageLink"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoComplete="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={createCourse} variant="contained" color="primary">
            Create Course
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateCourse;
