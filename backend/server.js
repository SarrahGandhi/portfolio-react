const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const db = require("./db");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Project = mongoose.model("Projects", projectSchema);

//Get hello world
app.get("/", async (req, res) => {
  await db.connectDB();
  const projects = await Project.find({});
  res.send(projects);
});

// Projects API endpoint
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

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
