import express from 'express';
import { getAllVibes, getVibeById, getVibesByMoodId, createVibe } from '../controllers/vibeController.js';
import upload from '../middelware/upload.js';
import handleValidationErrors from '../middelware/handleValidationErrors.js';
import { createVibeValidation } from '../validations/vibeValidation.js';

// Create a new router
const vibeRouter = express.Router();

vibeRouter.get("/", getAllVibes);
vibeRouter.get("/:id", getVibeById);
vibeRouter.get("/mood/:moodId", getVibesByMoodId);
vibeRouter.post("/", upload.single('image'), createVibeValidation, handleValidationErrors, createVibe);

export default vibeRouter;
