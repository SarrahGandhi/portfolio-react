const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
dotenv.config();
const db = require("./db");
const mongoose = require("mongoose");

// Import routes

const app = express();
const port = process.env.PORT || 5000;

// Set up CORS to allow requests from your Vercel frontend
app.use(
  cors({
    origin: "*", // Allow all origins during development
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  keyFeatures: [String],
  githubUrl: String,
  projectUrl: String,
  featured: Boolean,
  link: String,
});
const WorkSchema = new mongoose.Schema({
  _id: String,
  company: String,
  role: String,
});
const Project = mongoose.model("Projects", projectSchema);
const Experience = mongoose.model("experience", WorkSchema);
// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("admins", adminSchema);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  console.log("Authentication check - Session data:", req.session);

  if (req.session.isAuthenticated) {
    return next();
  }

  res.status(401).json({ error: "Unauthorized. Please login first." });
};

// Admin Routes
// Register admin (only use this once to create an admin)
app.post("/api/admin/register", async (req, res) => {
  try {
    // Check if admin already exists
    await db.connectDB();
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Validate request
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new admin - using plaintext password for simplicity
    // In a production app, you'd want to use password hashing
    const admin = new Admin({
      username,
      password, // Using plaintext password as requested
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Failed to create admin" });
  }
});

// Login admin
app.post("/api/admin/login", async (req, res) => {
  try {
    // Validate request
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find admin by username
    await db.connectDB();
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check password - simple string comparison since we're not using bcrypt
    if (password !== admin.password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Set session data
    req.session.isAuthenticated = true;
    req.session.adminId = admin._id.toString();
    req.session.username = admin.username;

    res.status(200).json({
      message: "Login successful",
      admin: { username: admin.username, id: admin._id },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Logout route
app.post("/api/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

// Check auth status
app.get("/api/admin/check-auth", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.json({
      isAuthenticated: true,
      admin: {
        username: req.session.username,
        id: req.session.adminId,
      },
    });
  }
  res.json({ isAuthenticated: false });
});

// Project Routes
// Get all projects
app.get("/", async (req, res) => {
  await db.connectDB();
  const projects = await Project.find({});
  res.send(projects);
});

app.get("/api/projects", async (req, res) => {
  try {
    await db.connectDB();
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});
app.get("/api/experience", async (req, res) => {
  try {
    await db.connectDB();
    const experience = await Experience.find({});
    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

// Get single project by ID
app.get("/api/projects/:id", async (req, res) => {
  try {
    await db.connectDB();
    console.log("Fetching project with ID:", req.params.id);

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.error("Invalid MongoDB ObjectId:", req.params.id);
      return res.status(400).json({ error: "Invalid project ID format" });
    }

    const project = await Project.findById(req.params.id);
    console.log("Project found:", project);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project details" });
  }
});

// ADMIN API Endpoints (Protected routes)
// Create a new project (Admin only)
app.post("/api/admin/projects", isAuthenticated, async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      keyFeatures,
      githubUrl,
      projectUrl,
      featured,
    } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    await db.connectDB();
    const newProject = new Project({
      title,
      description,
      technologies: technologies || [],
      keyFeatures: keyFeatures || [],
      githubUrl,
      projectUrl,
      featured: featured || false,
      link: projectUrl, // For backward compatibility
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update a project (Admin only)
app.put("/api/admin/projects/:id", isAuthenticated, async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      keyFeatures,
      githubUrl,
      projectUrl,
      featured,
    } = req.body;

    await db.connectDB();

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid project ID format" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        technologies,
        keyFeatures,
        githubUrl,
        projectUrl,
        featured,
        link: projectUrl, // For backward compatibility
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a project (Admin only)
app.delete("/api/admin/projects/:id", isAuthenticated, async (req, res) => {
  try {
    await db.connectDB();

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid project ID format" });
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Routes for experience data - use the dedicated router

// Add a test endpoint to confirm server is running
app.get("/api/test", (req, res) => {
  res.json({
    message: "API server is running correctly",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
