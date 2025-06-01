import { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import { createMood } from '../api/api';

const CreateMoodModal = ({ show, onHide }) => {
    const { refreshMoods } = useContext(AppContext);

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await createMood(name);
            onHide();
            refreshMoods();
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
        setName('');
        setError('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} onExited={handleClose} centered>
            <Modal.Header closeButton><Modal.Title>Create Mood</Modal.Title></Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Mood Name</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} required />
                    </Form.Group>
                    <Button variant="success" type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateMoodModal
