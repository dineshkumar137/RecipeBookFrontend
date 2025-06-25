import React, { useState } from "react";
import './Login.css';
import bgImage from '../assets/loginbackground.jpg';
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext"; 


export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            const user = { email: data.email };
            localStorage.setItem("user", JSON.stringify(user));

            if (response.ok) {
                console.log('Login successful', data);
                setUser({ email: data.email }); 
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div style={{
            height: '100vh',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div id="logindiv">
                <h2 style={{ color: "#303c6c" }}>Login to find a Perfect Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label style={{ fontSize: "25px" }}>Email</label></td>
                                <td>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ height: "35px" }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label style={{ fontSize: "25px" }}>Password</label></td>
                                <td>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{ height: "35px" }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button
                            type="submit"
                            style={{
                                marginTop: '20px',
                                marginLeft: "37%",
                                height: "30px",
                                width: "70px",
                                border: "none",
                                backgroundColor: "#c4dbF6",
                                borderRadius: "25px"
                            }}
                            className="loginbtnhead"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div>
                    <h3>New user?</h3>
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            marginLeft: "9%",
                            height: "30px",
                            width: "70px",
                            border: "none",
                            backgroundColor: "#c4dbF6",
                            borderRadius: "25px"
                        }}

                        className="loginbtnhead"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
