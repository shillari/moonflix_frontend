import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../img/lo.png";
import { Link, useNavigate } from 'react-router-dom';
import { Person, House } from 'react-bootstrap-icons';
import { useState } from 'react';
import { setUsername, setToken } from '../../redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

export const NavigationBar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.username);

    const handleToggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    const handleOffcanvasHide = () => {
        setShowOffcanvas(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    }

    const handleSearch = () => {
        if (searchInput) {
            handleOffcanvasHide();
            navigate(`/search/${encodeURIComponent(searchInput)}`);
        }
    }

    const onLogout = () => {
        dispatch(setUsername({ username: null }));
        dispatch(setToken({ token: null }));
    }

    const handleLogout = () => {
        handleOffcanvasHide();
        onLogout();
    }

    return (
        <>
            {['lg'].map((expand) => (
                <Navbar fixed="top" key={expand} expand={expand} className="custom-navigation-bar mb-3">
                    <Container fluid>
                        <Navbar.Brand href="/"><img src={logo} width={200} height={50} alt="logo full moon with a pack of popcorn" /></Navbar.Brand>
                        <Navbar.Toggle bg="dark" data-bs-theme="dark"
                            onClick={handleToggleOffcanvas}
                        />
                        <Navbar.Offcanvas
                            show={showOffcanvas}
                            onHide={handleOffcanvasHide}
                            placement="end"
                        >
                            <Offcanvas.Header bg="dark" data-bs-theme="dark" className='text-light' closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {!user && (
                                        <>
                                            <Nav.Link className='custom-link__navbar' as={Link} to="/login" onClick={handleOffcanvasHide}>Login</Nav.Link>
                                            <Nav.Link className='custom-link__navbar' as={Link} to="/signup" onClick={handleOffcanvasHide}>Sign Up</Nav.Link>
                                        </>
                                    )}
                                    {user && (
                                        <>
                                            <Nav.Link title='home' className='nav-dropdown__menu nav-item' as={Link} to="/" onClick={handleOffcanvasHide}><House /></Nav.Link>
                                            <NavDropdown
                                                className='nav-dropdown__menu nav-item'
                                                size="25px"
                                                title={<Person />}
                                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                                            >
                                                <NavDropdown.Item className='nav-dropdown__item' as={Link} to="/profile" onClick={handleOffcanvasHide}>
                                                    Profile
                                                </NavDropdown.Item>
                                                <NavDropdown.Item className='nav-dropdown__item' as={Link} to="/favorites" onClick={handleOffcanvasHide}>
                                                    Favorite Movies
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider className='nav-divider' />
                                                <NavDropdown.Item className='nav-dropdown__item' onClick={handleLogout}>
                                                    Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <Form className="d-flex">
                                                <Form.Control
                                                    type="search"
                                                    placeholder="Search"
                                                    className="me-2 search-control-input nav-item"
                                                    value={searchInput}
                                                    onChange={(e) => setSearchInput(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    aria-label="Search"
                                                />
                                                <Button className='custom-button search-button nav-item' onClick={handleSearch}>Search</Button>
                                            </Form>
                                        </>
                                    )}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}