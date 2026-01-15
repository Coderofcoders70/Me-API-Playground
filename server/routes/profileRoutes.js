const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// 1. get profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// To get the specific project 
router.get('/projects', async (req, res) => {
  const { skill } = req.query;
  try {
    const profile = await Profile.findOne();
    let projects = profile.projects;

    if (skill) {
      const searchSkill = skill.toLowerCase();
      projects = projects.filter(p => 
        p.description.toLowerCase().includes(searchSkill) || 
        p.title.toLowerCase().includes(searchSkill)
      );
    }

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update Profile 
router.put('/', async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// to search and filter
router.get('/search', async (req, res) => {
  const { q, skill } = req.query;
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    let results = profile.toObject();

    // Filter projects by skill
    if (skill) {
      const searchSkill = skill.toLowerCase();
      results.projects = results.projects.filter(p =>
        (p.description && p.description.toLowerCase().includes(searchSkill)) ||
        (p.title && p.title.toLowerCase().includes(searchSkill))
      );
    }

    // Basic Global Search logic
    if (q) {
      const query = q.toLowerCase();
      const matchesName = result.name.toLowerCase().includes(query);
      const matchesSkill = result.skills.some(s => s.toLowerCase().includes(query));

      if (!matchesName && !matchesSkill && result.projects.length === 0) {
        return res.json({ message: "No matches found", results: [] });
      }
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;