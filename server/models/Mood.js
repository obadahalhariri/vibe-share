import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  }
}, { versionKey: false });

const MoodModel = mongoose.model('moods', moodSchema);
export default MoodModel;
