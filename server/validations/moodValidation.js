import { body } from "express-validator";

const createMoodValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Mood name is required")
        .isString()
        .withMessage("Mood name must be a string")
        .isLength({ max: 50 })
        .withMessage("Mood name must be at most 50 characters long"),
];
export { createMoodValidation };
