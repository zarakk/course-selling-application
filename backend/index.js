const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Use JSON middleware to parse request body
app.use(express.json());

// Define a secret key for JWT
const SECRET_KEY = "azs";

// Define a helper function to read data from a file
const readData = (fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Define a helper function to write data to a file
const writeData = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};

// Define a helper function to generate a JWT
const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

// Define a helper function to verify a JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define a helper function to check if an admin is authenticated
const isAdminAuthenticated = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the header exists and has the format 'Bearer token'
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = verifyToken(token);

    // Check if the token is valid and has the role 'admin'
    if (decoded && decoded.role === "admin") {
      // Attach the decoded payload to the request object
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    } else {
      // Send an unauthorized response
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    // Send an unauthorized response
    res
      .status(401)
      .json({ message: "Missing or malformed authorization header" });
  }
};

// Define a helper function to check if a user is authenticated
const isUserAuthenticated = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  console.log("authheader", authHeader);
  // Check if the header exists and has the format 'Bearer token'
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    // Verify the token
    const decoded = verifyToken(token);
    console.log("decoded", decoded);
    // Check if the token is valid and has the role 'user'
    if (decoded && decoded.role === "user") {
      // Attach the decoded payload to the request object
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    } else {
      // Send an unauthorized response
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    // Send an unauthorized response
    res
      .status(401)
      .json({ message: "Missing or malformed authorization header" });
  }
};

// Define an admin route to create a new admin account
app.post("/admin/signup", (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;

  // Validate the input parameters
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  // Read the admin data from the file
  const admins = readData("admins.json");

  // Check if an admin with the same username already exists
  const existingAdmin = admins.find((admin) => admin.username === username);
  if (existingAdmin) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  // Create a new admin object with an id and a role
  const newAdmin = { id: admins.length + 1, username, password, role: "admin" };

  // Add the new admin to the array of admins
  admins.push(newAdmin);

  // Write the updated admin data to the file
  writeData("admins.json", admins);

  // Generate a JWT for the new admin
  const token = generateToken(newAdmin);

  // Send a success response with the token
  res.status(201).json({ message: "Admin created successfully", token });
});

// Define an admin route to authenticate an admin
app.post("/admin/login", (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;

  // Validate the input parameters
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  // Read the admin data from the file
  const admins = readData("admins.json");

  // Check if an admin with the same username and password exists
  const existingAdmin = admins.find(
    (admin) => admin.username === username && admin.password === password
  );
  if (!existingAdmin) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT for the existing admin
  const token = generateToken(existingAdmin);

  // Send a success response with the token
  res.status(200).json({ message: "Logged in successfully", token });
});

// Define an admin route to create a new course
app.post("/admin/courses", isAdminAuthenticated, (req, res) => {
  // Get the course data from the request body
  const { title, description, price, imageLink, published } = req.body;

  // Validate the input parameters
  if (
    !title ||
    !description ||
    !price ||
    !imageLink ||
    published === undefined
  ) {
    return res.status(400).json({ message: "Missing course data" });
  }

  // Read the course data from the file
  const courses = readData("courses.json");

  // Create a new course object with an id
  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    price,
    imageLink,
    published,
  };

  // Add the new course to the array of courses
  courses.push(newCourse);

  // Write the updated course data to the file
  writeData("courses.json", courses);

  // Send a success response with the course id
  res
    .status(201)
    .json({ message: "Course created successfully", courseId: newCourse.id });
});

// Define an admin route to edit an existing course
app.put("/admin/courses/:courseId", isAdminAuthenticated, (req, res) => {
  // Get the course id from the URL path parameter
  const courseId = parseInt(req.params.courseId);

  // Validate the input parameter
  if (isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid course id" });
  }

  // Get the updated course data from the request body
  const { title, description, price, imageLink, published } = req.body;

  // Validate the input parameters
  if (
    !title ||
    !description ||
    !price ||
    !imageLink ||
    published === undefined
  ) {
    return res.status(400).json({ message: "Missing course data" });
  }

  // Read the course data from the file
  const courses = readData("courses.json");

  // Find the index of the course to be edited in the array of courses
  const index = courses.findIndex((course) => course.id === courseId);

  // Check if the index is valid

  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Update the course object with the new data

  courses[index] = {
    ...courses[index],
    title,
    description,
    price,
    imageLink,
    published,
  };

  // Write the updated course data to the file

  writeData("courses.json", courses);

  // Send a success response

  res.status(200).json({ message: "Course updated successfully" });
});

// Define an admin route to return all the courses

app.get("/admin/courses", isAdminAuthenticated, (req, res) => {
  // Read the course data from the file

  const courses = readData("courses.json");

  // Send a success response with the courses

  res.status(200).json({ courses });
});

// Define a user route to create a new user account

app.post("/users/signup", (req, res) => {
  // Get the username and password from the request body

  const { username, password } = req.body;

  // Validate the input parameters

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  // Read the user data from the file

  const users = readData("users.json");

  // Check if a user with the same username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Create a new user object with an id and a role
  const newUser = { id: users.length + 1, username, password, role: "user" };

  // Add the new user to the array of users
  users.push(newUser);

  // Write the updated user data to the file
  writeData("users.json", users);

  // Generate a JWT for the new user
  const token = generateToken(newUser);

  // Send a success response with the token
  res.status(201).json({ message: "User created successfully", token });
});

// Define a user route to authenticate a user
app.post("/users/login", (req, res) => {
  // Get the username and password from the request headers
  const { username, password } = req.body;

  // Validate the input parameters
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  // Read the user data from the file
  const users = readData("users.json");

  // Check if a user with the same username and password exists
  const existingUser = users.find(
    (user) => user.username === username && user.password === password
  );
  console.log(existingUser);
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT for the existing user
  const token = generateToken(existingUser);

  // Send a success response with the token
  res.status(200).json({ message: "Logged in successfully", token });
});

// Define a user route to list all the courses
app.get("/users/courses", isUserAuthenticated, (req, res) => {
  // Read the course data from the file
  const courses = readData("courses.json");

  // Filter only published courses
  const publishedCourses = courses.filter((course) => course.published);

  // Send a success response with the courses
  res.status(200).json({ courses: publishedCourses });
});

// Define a user route to purchase a course
app.post("/users/courses/:courseId", isUserAuthenticated, (req, res) => {
  // Get the course id from the URL path parameter
  const courseId = parseInt(req.params.courseId);

  // Validate the input parameter
  if (isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid course id" });
  }

  // Read the purchase data from the file
  const purchases = readData("purchases.json");

  // Check if the user has already purchased this course
  const existingPurchase = purchases.find(
    (purchase) =>
      purchase.userId === req.user.id && purchase.courseId === courseId
  );

  if (existingPurchase) {
    return res.status(409).json({ message: "Course already purchased" });
  }

  // Create a new purchase object

  const newPurchase = { userId: req.user.id, courseId };

  // Add the new purchase to the array of purchases

  purchases.push(newPurchase);

  // Write the updated purchase data to the file

  writeData("purchases.json", purchases);

  // Send a success response

  res.status(201).json({ message: "Course purchased successfully" });
});

// Define a user route to list all purchased courses

app.get("/users/purchasedCourses", isUserAuthenticated, (req, res) => {
  // Read the purchase data from the file

  const purchases = readData("purchases.json");

  // Filter only purchases made by this user

  const userPurchases = purchases.filter(
    (purchase) => purchase.userId === req.user.id
  );

  // Read the course data from the file

  const courses = readData("courses.json");

  // Map each purchase to its corresponding course

  const purchasedCourses = userPurchases.map((purchase) => {
    return courses.find((course) => course.id === purchase.courseId);
  });

  // Send a success response with the purchased courses

  res.status(200).json({ purchasedCourses });
});

// Start listening for incoming requests

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
