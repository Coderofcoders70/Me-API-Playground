const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: String,
  skills: [String],
  projects: [{
    title: String,
    description: String,
    links: {
      github: String,
      live: String
    }
  }],
  work: [{
    company: String,
    role: String,
    duration: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);