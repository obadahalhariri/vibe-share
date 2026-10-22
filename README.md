# Vibe-Share 🌟

A full-stack social content-sharing web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). **Vibe-Share** enables users to create thematic mood boards (**Moods**) and share visual stories, thoughts, and media posts (**Vibes**) within an intuitive, responsive Single-Page Application (SPA).

---

## 🚀 Key Features

* **Mood Boards Management:** Create, browse, and delete categorized thematic spaces (`Moods`).
* **Visual "Vibe" Sharing:** Publish rich posts (`Vibes`) complete with image uploads and descriptions linked to specific Moods.
* **Interactive Modals & Confirmation Workflows:** Seamless user experience using dedicated modal dialogs for content creation (`CreateMoodModal`, `CreateVibeModal`) and safe deletion confirmations (`DeletingDialog`).
* **Robust Input Validation:** Server-side request validation and centralized error-handling middleware ensuring data integrity.
* **Decoupled RESTful Architecture:** Clean separation of concerns between the React SPA client and the Express/Node.js REST API backend.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
* **Framework:** React.js (Single-Page Application)
* **State Management:** React Context API (`AppContext`)
* **API Communication:** Centralized REST client (`api.js`)
* **Architecture:** Modular Component & Page-based structure (`Dashboard`, `MoodPage`)

### Backend (`server/`)
* **Runtime & Framework:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM (`Mood` & `Vibe` schemas)
* **Middleware & Security:** CORS, File Upload handling (`upload.js`), and Centralized Validation Error Handling (`express-validator`)

---

## 📂 Project Structure

```text
vibe-share/
├── client/                     # React Frontend SPA
│   ├── public/                 # Static assets
│   └── src/
│       ├── api/                # Centralized HTTP API layer (api.js)
│       ├── components/         # Reusable UI components & Modals
│       ├── contexts/           # Global state management (AppContext.jsx)
│       └── pages/              # View pages (Dashboard.jsx, MoodPage.jsx)
└── server/                     # Node.js / Express Backend API
    ├── config/                 # Database connection setup (database.js)
    ├── controllers/            # Route business logic (moodController, vibeController)
    ├── middleware/             # File upload & validation error handlers
    ├── models/                 # Mongoose data models (Mood.js, Vibe.js)
    ├── routes/                 # API endpoint definitions (moodRoutes, vibeRoutes)
    ├── validations/            # Request validation rules
    └── server.js               # Express app entry point
