import MoodModel from '../models/Mood.js';

// get all moods
const getAllMoods = async (req, res) => {
    try {
        const moods = await MoodModel.find();
        moods.length === 0 ? res.status(404).send('No Moods found') : res.status(200).json(moods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// get mood by id
const getMoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const mood = await MoodModel.findById(id);
        if (!mood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        res.status(200).json(mood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// create a new mood
const createMood = async (req, res) => {
    try {
        const { name } = req.body;
        const newMood = new MoodModel({ name });
        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete mood by id
const deleteMoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMood = await MoodModel.findByIdAndDelete(id);
        if (!deletedMood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        res.status(200).json({ message: 'Mood deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export { getAllMoods, getMoodById, createMood, deleteMoodById };
