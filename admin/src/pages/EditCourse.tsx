import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";

interface CourseType {
  id: number | undefined;
  title: string;
  description: string;
  price: string;
  imageLink: string;
  published: string;
}

interface CourseReturnType {
  course: CourseType;
  id: number | undefined;
  title: string;
  description: string;
  price: string;
  imageLink: string;
  published: string;
}

function EditCourse() {
  const [course, setCourse] = useState<CourseType | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [published, setPublished] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Function to fetch a single course from the backend
  async function fetchCourse() {
    const response = await axiosInstance.get(`/admin/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
      },
    });
    response.data.courses.map((course: CourseReturnType) => {
      if (course.id === parseInt(id as any)) {
        setCourse(course);
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setPublished(course.published);
      }
    });
  }

  // Function to update a course in the backend
  async function updateCourse() {
    setLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("published", Date());

      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }

      // Send request to update course
      await axiosInstance.put(`/admin/courses/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Fetch updated course data
      fetchCourse();

      // Show success message
      setSnackbarMessage("Course updated successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      // Show error message
      setSnackbarMessage("Error updating course");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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
          <FormControl>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files ? e.target.files[0] : null)
                }
                hidden
              />
            </Button>
          </FormControl>
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
            {loading ? "Loading..." : "Update Course"}
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

export default EditCourse;
