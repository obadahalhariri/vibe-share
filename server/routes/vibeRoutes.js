import express from 'express';
import { getAllVibes, getVibeById, getVibesByMoodId, createVibe } from '../controllers/vibeController.js';
import upload from '../middelware/upload.js';

// Create a new router
const vibeRouter = express.Router();

vibeRouter.get("/", getAllVibes);
vibeRouter.get("/:id", getVibeById);
vibeRouter.get("/mood/:moodId", getVibesByMoodId);
vibeRouter.post("/create", upload.single('image'), createVibe);

export default vibeRouter;
