import { useContext } from "react";
import { AppContext } from '../contexts/AppContext';
import MoodList from "../components/MoodList";

const MoodPage = () => {
    const { moods } = useContext(AppContext);
    return (
        <MoodList moods={moods} />
    )
}

export default MoodPage;
