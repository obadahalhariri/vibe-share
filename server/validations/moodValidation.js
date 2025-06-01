import { body } from "express-validator";
import MoodModel from "../models/Mood.js";

const createMoodValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Mood name is required")
        .isString().withMessage("Mood name must be a string")
        .isLength({ max: 50 }).withMessage("Mood name must be at most 50 characters long")
        .custom(async (value) => {
            const existingMood = await MoodModel.findOne({ name: { $regex: `^${value}$`, $options: "i" } });
            if (existingMood) {
                throw new Error("Mood with this name already exists");
            }
            return true;
        })
];
export { createMoodValidation };
