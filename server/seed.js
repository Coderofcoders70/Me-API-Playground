const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('./models/Profile');

const myData = {
  name: "Your Full Name",
  email: "your.email@example.com",
  education: "Your Degree/College",
  skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"], 
  projects: [
    {
      title: "Smartbot AI",
      description: "A chat interface using Gemini API and React.",
      links: { github: "https://github.com/yourusername", live: "https://yourlink.com" }
    },
    {
      title: "E-commerce Site",
      description: "A responsive e-commerce platform built with CherryPy and Python.",
      links: { github: "https://github.com/yourusername", live: "" }
    }
  ],
  work: [
    { company: "Company A", role: "Developer", duration: "2023 - Present" }
  ],
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    portfolio: "https://yourportfolio.com"
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing data to avoid duplicates
    await Profile.deleteMany({});
    
    // Insert your data
    await Profile.create(myData);
    
    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();