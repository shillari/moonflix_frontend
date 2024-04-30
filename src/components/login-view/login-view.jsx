import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const accessData = {
            username: username,
            password: password
        }

        fetch("https://moonflix-97228dafe8d1.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accessData)
        })
            .then((response) => response.json())
            .then((userLogged) => {
                if (userLogged) {
                    localStorage.setItem("user", userLogged.user.username);
                    localStorage.setItem("token", userLogged.token);
                    onLoggedIn(userLogged.user.username, userLogged.token);
                } else {
                    alert('Username or password invalid.');
                }
            })
            .catch((err) => {
                alert('Username or password invalid.');
                console.error(err);
            })
    }

    return (
        <>
            <Form className="form-login" onSubmit={handleLogin}>
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
                <Button variant="outline-light" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}