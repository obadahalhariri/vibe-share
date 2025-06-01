import { Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import { useState, useContext } from 'react';
import { createVibe } from '../api/api';

const CreateVibeModal = ({ show, onHide }) => {
    const { moods, setFilterMoodId, refreshVibes } = useContext(AppContext);

    const [nickname, setNickname] = useState('');
    const [text, setText] = useState('');
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    const handleAddMood = (e) => {
        const selectedId = e.target.value;
        if (selectedId && !selectedMoods.includes(selectedId)) {
            setSelectedMoods([...selectedMoods, selectedId]);
        }
    };

    const handleRemoveMood = (idToRemove) => {
        setSelectedMoods(selectedMoods.filter(id => id !== idToRemove));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        const form = new FormData();
        form.append('nickname', nickname);
        form.append('text', text);
        selectedMoods.forEach(id => form.append('moodIds', id));
        if (imageFile) form.append('image', imageFile);

        try {
            await createVibe(form);
            onHide();
            setFilterMoodId(null);
            refreshVibes();
        } catch (err) {
            const resError = err.response?.data;
            if (resError?.errors) {
                setError(resError.errors[0].msg); // Show first error message from backend validation
            } else {
                setError(resError?.message || 'Submission failed');
            }
        }
    };

    // Reset form fields when modal is closed
    const handleClose = () => {
        setNickname('');
        setText('');
        setSelectedMoods([]);
        setImageFile(null);
        setError('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} onExited={handleClose} centered>
            <Modal.Header closeButton><Modal.Title>Create Vibe</Modal.Title></Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control value={nickname} onChange={e => setNickname(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} value={text} onChange={e => setText(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Moods</Form.Label>
                        <Form.Select onChange={handleAddMood} value="">
                            <option value="" disabled>Choose mood to add</option>
                            {moods.filter(m => !selectedMoods.includes(m._id)).map(m => (<option key={m._id} value={m._id}>{m.name}</option>))}
                        </Form.Select>
                        <div className="mt-2">
                            {selectedMoods.map(id => {
                                const mood = moods.find(m => m._id === id);
                                return (
                                    <Badge key={id} bg="primary" pill className="me-2" style={{ cursor: 'pointer' }} onClick={() => handleRemoveMood(id)}>
                                        {mood?.name}
                                    </Badge>
                                );
                            })}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image (optional)</Form.Label>
                        <Form.Control type="file" onChange={e => setImageFile(e.target.files[0])} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateVibeModal;
