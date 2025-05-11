import mongoose from "mongoose";

const vibeSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String, // Path or URL to image
        required: false
    },
    moodIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "moods", // Reference to the Mood model
        required: true
    }]
}, { versionKey: false });

const VibeModel = mongoose.model("vibes", vibeSchema);
export default VibeModel;
