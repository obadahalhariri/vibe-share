import { AppContext } from "../contexts/AppContext";
import VibeList from "../components/VibeList";
import { Alert } from "react-bootstrap";
import { useContext } from "react";

const Dashboard = () => {
    const { vibes } = useContext(AppContext);
    return (
        <>
            {!vibes.length
                ? <Alert variant="info">No vibes to show!</Alert>
                : <VibeList vibes={vibes} />}
        </>
    );
};

export default Dashboard;
