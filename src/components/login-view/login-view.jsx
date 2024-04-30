import { useState } from "react";

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}