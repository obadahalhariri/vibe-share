import { createContext, useEffect, useState } from 'react'
import { fetchVibes, fetchVibesByMoodId, fetchMoods } from '../api/api';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [vibes, setVibes] = useState([]);
    const [moods, setMoods] = useState([]);
    const [filterMoodId, setFilterMoodId] = useState(null);

    const loadVibes = async () => {
        try {
            const res = filterMoodId ? await fetchVibesByMoodId(filterMoodId) : await fetchVibes();
            setVibes(res.data);
        } catch (err) {
            console.error(err.response?.data?.message || "Failed to load vibes.");
            setVibes([]); // Clear vibes on error
        }
    }

    const loadMoods = async () => {
        const res = await fetchMoods();
        setMoods(res.data);
    };

    useEffect(() => {
        loadVibes();
    }, [filterMoodId]);

    useEffect(() => { loadMoods() }, []);

    return (
        <AppContext.Provider value={{
            vibes,
            moods,
            filterMoodId,
            setVibes,
            setFilterMoodId,
            refreshVibes: loadVibes,
            refreshMoods: loadMoods
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
