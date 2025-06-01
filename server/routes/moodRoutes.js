import express from 'express';
import { getAllMoods, getMoodById, createMood, deleteMoodById } from '../controllers/moodController.js';
import handleValidationErrors from '../middelware/handleValidationErrors.js';
import { createMoodValidation } from '../validations/moodValidation.js';

// Create a new router
const moodsRouter = express.Router();

moodsRouter.get("/", getAllMoods);
moodsRouter.get("/:id", getMoodById);
moodsRouter.post("/", createMoodValidation, handleValidationErrors, createMood);
moodsRouter.delete("/:id", deleteMoodById);

export default moodsRouter;
