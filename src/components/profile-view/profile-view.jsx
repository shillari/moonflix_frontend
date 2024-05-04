import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Nav, Tab, Row, Alert, Modal } from "react-bootstrap";

export const ProfileView = ({ movies, onDelete }) => {
    const user = localStorage.getItem("user");
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const token = localStorage.getItem("token");
    const [activeTab, setActiveTab] = useState('data');
    const [userLogged, setUserLogged] = useState(null);
    const [alert, setAlert] = useState(null);

    // Function to hide the alert after a certain time
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(null);  // Hide the alert after 3000 milliseconds (3 seconds)
        }, 7000);

        // Clear the timer when the component unmounts or when showAlert changes
        return () => clearTimeout(timer);
    }, [alert]);

    useEffect(() => {
        if (!token) {
            <div>You are not authorized!</div>
            return;
        }

        const fetchUser = async () => {
            await fetch("https://moonflix-97228dafe8d1.herokuapp.com/users/" + encodeURIComponent(user), {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((userReturned) => {
                    const userObj = {
                        id: userReturned._id,
                        username: userReturned.username,
                        email: userReturned.email,
                        birthday: userReturned.birthday
                    };
                    setUserLogged(userObj);
                    setUsername(userObj.username);
                    setEmail(userObj.email);
                    setBirthday(userObj.birthday ? new Date(userObj.birthday).toISOString().split('T')[0] : "");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchUser();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            birthday: birthday
        }

        const updateUser = async () => {
            await fetch("https://moonflix-97228dafe8d1.herokuapp.com/users/"
                + encodeURIComponent(user), {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
                ,
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((userReturned) => {
                    if (userReturned) {
                        localStorage.setItem("user", userReturned.username);
                        console.log('User updated');
                        setAlert(<Alert key='success' variant='success' className='alert-fade'>User updated!</Alert>);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setAlert(<Alert key='danger' variant='danger'>
                        Something is not right.
                    </Alert>);
                })

        }
        updateUser();
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        const data = {
            oldpassword: oldpassword,
            newpassword: newpassword
        }

        const updatePassword = async () => {
            await fetch("https://moonflix-97228dafe8d1.herokuapp.com/users/"
                + encodeURIComponent(user) + "/password", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
                ,
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.status === 200) {
                        setAlert(<Alert key='success' variant='success'>
                            Password updated!
                        </Alert>);
                    } else if (response.status === 400) {
                        setAlert(<Alert key='warning' variant='warning'>
                            Old password does not match.
                        </Alert>);
                    }
                }).catch((err) => {
                    <Alert key='danger' variant='danger'>
                        Something is not right.
                    </Alert>
                })

        }
        updatePassword();
    }

    const deleteAccount = (e) => {
        e.preventDefault();

        const deleteAction = async () => {
            await fetch("https://moonflix-97228dafe8d1.herokuapp.com/users/"
                + encodeURIComponent(user), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response) {
                        onDelete();
                    }
                }).catch((err) => {
                    <Alert key='danger' variant='danger'>
                        Something is not right.
                    </Alert>
                })

        }
        deleteAction();
    }

    return (
        <>
            {alert}
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                <Nav variant="tabs" className='tab-cards'>
                    <Nav.Item>
                        <Nav.Link className='custom-link__navbar' eventKey="data">Data</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='custom-link__navbar' eventKey="password">Change Password</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="data">
                        <Col className="h-100 mx-auto" md={5}>
                            <Form className="form-update" onSubmit={handleUpdate}>
                                <h1>Profile</h1>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        className="form-control-input"
                                        type="text"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        minLength={5}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        className="form-control-input"
                                        type="email"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        className="form-control-input"
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-between">
                                    <Button className="custom-button" type="submit">
                                        Update
                                    </Button>
                                    <Button variant='outline-danger' onClick={handleShow}>Delete user</Button>
                                </div>
                            </Form>
                        </Col>
                    </Tab.Pane>
                    <Tab.Pane eventKey="password">
                        <Col className="h-100 mx-auto" md={5}>
                            <Form className="form-signup" onSubmit={handleChangePassword}>
                                <Form.Group controlId="formOldPassword">
                                    <Form.Label>Old Password:</Form.Label>
                                    <Form.Control
                                        className="form-control-input"
                                        type="password"
                                        placeholder="old password"
                                        value={oldpassword}
                                        name="oldpassword"
                                        onChange={(e) => setOldpassword(e.target.value)}
                                        minLength={8}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>New Password:</Form.Label>
                                    <Form.Control
                                        className="form-control-input"
                                        type="password"
                                        placeholder="new password"
                                        value={newpassword}
                                        onChange={(e) => setNewpassword(e.target.value)}
                                        minLength={8}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="custom-button">
                                    Update
                                </Button>
                            </Form>
                        </Col>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            {show &&
                <>
                    <Modal className='text-light' show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="outline-danger" onClick={deleteAccount}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    )
}