import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

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
      const { data } = await axiosInstance.post("/upload-video", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      });

      // Set the uploading state to false and the uploaded state to true
      setUploading(false);
      setUploaded(true);

      // Display a success message
      alert(data.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" component="label">
        Upload Video
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
    </div>
  );
};
export default VideoUpload;
