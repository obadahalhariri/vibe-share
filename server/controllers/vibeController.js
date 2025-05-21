import VibeModel from '../models/Vibe.js';

// get all vibes
const getAllVibes = async (req, res) => {
    try {
        const vibes = await VibeModel.find().populate('moodIds');
        vibes.length === 0 ? res.status(404).send('No vibes found') : res.status(200).json(vibes);
        res.status(200).json(vibes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get vibe by id
const getVibeById = async (req, res) => {
    try {
        const { id } = req.params;
        const vibe = await VibeModel.findById(id).populate('moodIds');
        if (!vibe) {
            return res.status(404).json({ message: 'Vibe not found' });
        }
        res.status(200).json(vibe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get vibes by mood id
const getVibesByMoodId = async (req, res) => {
    try {
        const { moodId } = req.params;
        const vibes = await VibeModel.find({ moodIds: moodId }).populate('moodIds');
        if (vibes.length === 0) {
            return res.status(404).json({ message: 'No vibes found for this mood' });
        }
        res.status(200).json(vibes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// create a new vibe
const createVibe = async (req, res) => {
    try {
        const { nickname, text, moodIds } = req.body;
        const image = req.file ? req.file.path : null;

        const moodIdArray = Array.isArray(moodIds)
            ? moodIds
            : moodIds.split(',').map(id => id.trim());

        const newVibe = new VibeModel({
            nickname,
            text,
            image,
            moodIds: moodIdArray
        });

        const savedVibe = await newVibe.save();
        res.status(201).json(savedVibe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getAllVibes, getVibeById, getVibesByMoodId, createVibe };
