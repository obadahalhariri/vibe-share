import { Card, Badge, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { deleteVibe } from '../api/api';
import { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import DeletingDialog from './DeletingDialog';


const VibeCard = ({ vibe }) => {
    const { refreshVibes } = useContext(AppContext);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            await deleteVibe(vibe._id);
            refreshVibes();
        } catch (err) {
            alert('Failed to delete vibe');
        } finally {
            setShowConfirmDialog(false);
        }
    };

    return (
        <>
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Card.Title className="fw-bold">{vibe.nickname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                        {new Date(vibe.date).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </Card.Subtitle>
                    <div className="mb-2">is feeling {vibe.moodIds.map(m => (<Badge bg="primary" className="me-1" key={m._id}>{m.name}</Badge>))}</div>
                    {vibe.image && (<Card.Img variant="top" style={{ maxHeight: '400px', objectFit: 'cover', border: '1px solid black', borderRadius: '8px' }}
                        src={`http://localhost:5000/${vibe.image.replace(/\\/g, '/')}`} />
                    )}
                    <Card.Text style={{ border: '1px solid black', borderRadius: '8px', padding: '8px', marginTop: '8px' }}>{vibe.text}</Card.Text>
                    <Button className="position-absolute top-0 end-0 m-2" variant="outline-danger" size="sm" onClick={() => { setShowConfirmDialog(true) }} title="Delete Vibe">
                        <Trash />
                    </Button>
                </Card.Body>
            </Card>
            <DeletingDialog
                show={showConfirmDialog}
                onHide={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmDelete}
                itemType="vibe"
            />
        </>
    );
};

export default VibeCard;
