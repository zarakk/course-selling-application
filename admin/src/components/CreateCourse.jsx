import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
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
  }

  return (
    <div>
      <h1>Create Course</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCourse();
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
          placeholder="imageLink"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}
export default CreateCourse;
