import { Card, Row, Col, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { deleteMood } from '../api/api';
import { AppContext } from '../contexts/AppContext';
import { useContext, useState } from 'react';
import DeletingDialog from './DeletingDialog';

const MoodList = ({ moods }) => {
    const { refreshMoods } = useContext(AppContext);

    const [selectedMoodId, setSelectedMoodId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);


    const handleConfirmDelete = async () => {
        try {
            await deleteMood(selectedMoodId);
            refreshMoods();
        } catch (error) {
            console.error("Failed to delete mood:", error);
        } finally {
            setShowConfirmDialog(false);
        }
    };

    return (
        <>
            <Row xs={2} md={3} className="g-3">
                {moods.map(m => (
                    <Col key={m._id}>
                        <Card>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <span>{m.name}</span>
                                <Button variant="outline-danger" size="sm" onClick={() => {
                                    setSelectedMoodId(m._id);
                                    setShowConfirmDialog(true);
                                }}>
                                    <Trash />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <DeletingDialog
                show={showConfirmDialog}
                onHide={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmDelete}
                itemType="mood"
            />
        </>
    );
};

export default MoodList;
