import express from 'express';
import { getAllMoods, getMoodById, createMood } from '../controllers/moodController.js';

// Create a new router
const moodsRouter = express.Router();

moodsRouter.get("/", getAllMoods);
moodsRouter.get("/:id", getMoodById);
moodsRouter.post("/create", createMood);

export default moodsRouter;
