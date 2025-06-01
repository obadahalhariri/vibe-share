import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import CreateVibeModal from './CreateVibeModal';
import CreateMoodModal from './CreateMoodModal';
import { useContext, useState } from 'react'

const Header = () => {
    const { moods, filterMoodId, setFilterMoodId } = useContext(AppContext);
    const [showVibeModal, setShowVibeModal] = useState(false);
    const [showMoodModal, setShowMoodModal] = useState(false);
    const location = useLocation();

    const isDashboardActive = location.pathname === '/';
    const isMoodsActive = location.pathname === '/moods';

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" fixed='top'>
                <Container>
                    <Navbar.Brand as="span" role="button"
                        style={{ color: "#007bff", fontFamily: "'Dancing Script', cursive", cursor: 'pointer' }}
                        onClick={() => window.location.href = '/'}>
                        VibeShare
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/moods">Moods</Nav.Link>
                            {isDashboardActive && (
                                <NavDropdown title={filterMoodId ? moods.find(m => m._id === filterMoodId)?.name : 'All Vibes'}>
                                    <NavDropdown.Item onClick={() => setFilterMoodId(null)}>All Vibes</NavDropdown.Item>
                                    {moods.map(m => (
                                        <NavDropdown.Item key={m._id} onClick={() => setFilterMoodId(m._id)}>{m.name}</NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            )}
                        </Nav>
                        {isDashboardActive && (
                            <Button variant='outline-primary' className="me-2" onClick={() => setShowVibeModal(true)}>Create Vibe</Button>
                        )}
                        {isMoodsActive && (
                            <Button variant="outline-primary" onClick={() => setShowMoodModal(true)}>Create Mood</Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <CreateVibeModal show={showVibeModal} onHide={() => setShowVibeModal(false)} />
            <CreateMoodModal show={showMoodModal} onHide={() => setShowMoodModal(false)} />
        </>
    )
}

export default Header
