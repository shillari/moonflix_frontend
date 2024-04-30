import { useState } from "react"

export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        }

        fetch("https://moonflix-97228dafe8d1.herokuapp.com/users", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert('Signup successful');
                window.location.reload();
            } else {
                alert('Signup failed');
            }
        });
    }

    return (
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
    )
}