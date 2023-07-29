import React, { useState, ChangeEvent } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

interface CourseData {
  title: string;
  description: string;
  price: string;
  imageLink: string;
  published: Date;
}

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Function to create a new course
  async function createCourse() {
    setLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }

      // Send request to create course
      await axiosInstance.post<CourseData>("/admin/courses", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setVideoFile(null);

      // Show success message
      setSnackbarMessage("Course created successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      // Show error message
      setSnackbarMessage("Error creating course");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <label htmlFor="video">Video</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={(e) =>
              setVideoFile(e.target.files ? e.target.files[0] : null)
            }
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
            {loading ? "Loading..." : "Create Course"}
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default CreateCourse;
