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
        const { id } = req.params.id;
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

        // Validate name
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Mood name is required and must be a non-empty string' });
        }

        const newMood = new MoodModel({ name });
        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export { getAllMoods, getMoodById, createMood };
