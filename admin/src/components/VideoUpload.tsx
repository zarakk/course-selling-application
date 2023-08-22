import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

interface VideoInfo {
  title: string;
  file: File;
  url: string;
}

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVideoFile(null);
    setPreviewUrl(null);
    setUploading(false);
    setUploaded(false);
    setTitle("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Set the video file state
      const file = e.target.files[0];
      setVideoFile(file);

      // Generate a preview URL for the video file
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);

      // Set the uploading state to true
      setUploading(true);

      // Upload the video file to the server
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("username", `${localStorage.getItem("admin")}`);
      const { data } = await axiosInstance.post("/upload-video", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });

      // Set the uploading state to false and the uploaded state to true
      setUploading(false);
      setUploaded(true);

      // Update videos state
      setVideos((videos) => [...videos, { title, file, url: previewUrl }]);

      // Display a success message
      alert(data.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Upload Video
      </Button>

      <Box sx={{ display: "flex", flexGap: 2 }}>
        {videos.map((video) => (
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <Typography variant="h6">{video.title}</Typography>
            <video src={video.url} width="320" height="240" controls />
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
          <Button variant="outlined" color="primary" component="label">
            Select Video
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              hidden
              onChange={handleVideoChange}
            />
          </Button>
          {previewUrl && (
            <div>
              <video src={previewUrl} width="320" height="240" controls />
              {uploading && <CircularProgress />}
              {uploaded && "✔️"}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default VideoUpload;
