import { useState, useEffect } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import { setUsername, setToken } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";

export const LoginView = () => {
    const [userinput, setUserinput] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const dispatch = useDispatch();

    // Function to hide the alert after a certain time
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(null);  // Hide the alert after 3000 milliseconds (3 seconds)
        }, 7000);

        // Clear the timer when the component unmounts or when showAlert changes
        return () => clearTimeout(timer);
    }, [alert]);

    const handleLogin = (e) => {
        e.preventDefault();

        const accessData = {
            username: userinput,
            password: password
        }

        fetch("https://moonflix-97228dafe8d1.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accessData)
        })
            .then((response) => {
                if (response && response.status === 400) {
                    setAlert(<Alert key='warning' variant='warning' className='alert-fade'>User not found</Alert>);
                }
                return response.json();
            })
            .then((userLogged) => {
                if (userLogged.message && userLogged.message.includes('Incorrect password')) {
                    setAlert(<Alert key='warning' variant='warning' className='alert-fade'>Username/password invalid</Alert>);
                }

                if (userLogged) {
                    dispatch(setUsername(userLogged.user));
                    dispatch(setToken(userLogged));
                }
            })
            .catch((err) => {
                console.error(err);
                navigate("/error/" + 500);
            })
    }

    return (
        <>
            {alert}
            <Col className="h-100" md={12}>
                <Form className="form-login" onSubmit={handleLogin}>
                    <img id="logo-img" src={logo} alt="logo full moon with a pack of popcorn" />
                    <h1>Login</h1>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            className="form-control-input"
                            type="text"
                            placeholder="username"
                            value={userinput}
                            onChange={(e) => setUserinput(e.target.value)}
                            minLength={5}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            className="form-control-input"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </Form.Group>
                    <Button className="custom-button" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col className="text-center" md={12}>
                <Link to="/signup">
                    <Button variant="link">Don't have an account yet? No worries!</Button>
                </Link>
            </Col>
        </>
    )
}