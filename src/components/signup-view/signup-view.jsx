import { useState } from "react"
import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        }

        fetch(`${process.env.MOONFLIX_BACKEND}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert('Signup successful');
                navigate("/login");
            } else {
                alert('Signup failed');
            }
        }).catch((err) => {
            console.log(err);
            navigate("/error/" + 500);
        });
    }

    return (
        <>
            <Form className="form-signup" onSubmit={handleSignup}>
                <img id="logo-img" src={logo} alt="logo full moon with a pack of popcorn" />
                <h1>Sign Up</h1>
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
                <Button className="custom-button" type="submit">
                    Submit
                </Button>
            </Form>
            <Col className="text-center" md={12}>
                <Link to="/login">
                    <Button variant="link">Already have an account?</Button>
                </Link>
            </Col>
        </>
    )

    /* return (
         <div>
             <form onSubmit={handleSignup}>
                 <label>
                     Username:
                     <input type="text"
                         placeholder="username"
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         minLength={5}
                         required />
                 </label>
                 <label>
                     Password:
                     <input type="password"
                         placeholder="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         minLength={8}
                         required />
                 </label>
                 <label>
                     Email:
                     <input type="email"
                         placeholder="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         required />
                 </label>
                 <label>
                     Birthday:
                     <input type="date"
                         value={birthday}
                         onChange={(e) => setBirthday(e.target.value)} />
                 </label>
                 <button type="submit">Submit</button>
             </form>
         </div>
     )*/
}