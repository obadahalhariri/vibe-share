import express from 'express';
import { getAllMoods, getMoodById, createMood } from '../controllers/moodController.js';
import handleValidationErrors from '../middelware/handleValidationErrors.js';
import { createMoodValidation } from '../validations/moodValidation.js';

// Create a new router
const moodsRouter = express.Router();

moodsRouter.get("/", getAllMoods);
moodsRouter.get("/:id", getMoodById);
moodsRouter.post("/", createMoodValidation, handleValidationErrors, createMood);

export default moodsRouter;
