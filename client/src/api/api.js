import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchVibes = () => axios.get(`${API_BASE}/vibes`);
export const fetchVibesByMoodId = (moodId) => axios.get(`${API_BASE}/vibes/mood/${moodId}`);
export const createVibe = (data) => axios.post(`${API_BASE}/vibes`, data);
export const deleteVibe = (id) => axios.delete(`${API_BASE}/vibes/${id}`);
export const fetchMoods = () => axios.get(`${API_BASE}/moods`);
export const createMood = (name) => axios.post(`${API_BASE}/moods`, { name });
export const deleteMood = (id) => axios.delete(`${API_BASE}/moods/${id}`);
