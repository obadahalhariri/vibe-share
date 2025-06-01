import { body } from "express-validator";
import mongoose from "mongoose";

const createVibeValidation = [
    body('nickname').trim().notEmpty().withMessage('Nickname is required'),
    body('text').trim().notEmpty().withMessage('Text is required'),
    body('moodIds')
        .notEmpty().withMessage('You must select at least one mood or create your own')
        .custom((value) => {
            let ids;

            if (Array.isArray(value)) {
                ids = value;
                console.log(ids);
            } else if (typeof value === 'string') {
                ids = value.split(",").map(id => id.trim());
                console.log(ids);
            } else {
                throw new Error("Mood IDs must be a string or array");
            }

            const allValid = ids.every(id => mongoose.Types.ObjectId.isValid(id));
            if (!allValid) {
                throw new Error("All moods must be valid MongoDB ObjectIds");
            }

            return true;
        }).withMessage('All moods must be valid MongoDB ObjectIds')
];
export { createVibeValidation };
