# Me-API Playground (Assessment Track A)

A professional "Profile-as-a-Service" application built to demonstrate full-stack proficiency. This project features a MERN-based API that stores personal information and a responsive React frontend for querying and updating data.

## Live Links
- **Frontend URL:** https://me-api-playground-nine-pi.vercel.app
- **Backend API URL:** https://me-api-playground-zj2a.onrender.com
- **Resume:** https://drive.google.com/file/d/1O0TLknsNtLITDWfElo466jGSlhEoAta1/view?usp=drive_link

---

## Tech Stack
- **Frontend:** React, Tailwind CSS 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (NoSQL)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## Features & Requirements Met
**Requirement 1a:** CRUD endpoints (Create/Read/Update) for profile data.

**Requirement 1b:** Advanced Querying (Filter projects by skill, global search).

**Requirement 1c:** `/health` endpoint for liveness checks.

**Requirement 2a:** Proper NoSQL database implementation.

**Requirement 3:** Minimal Responsive UI for searching and viewing profiles.

**Bonus:** Integrated "Edit Profile" modal on the frontend.

---

## API Usage & Sample Queries

### 1. Health Check
`GET /health`
- **Purpose:** Verify server status.
- **Sample:** `curl https://me-api-playground-zj2a.onrender.com/health`

### 2. Search by Skill
`GET /api/profile/search?skill=python`
- **Purpose:** Filters projects to only show those involving a specific technology.

### 3. Update Profile (via Postman)
`PUT /api/profile`
- **Sample Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "education": "Masters in Computer Science"
}
