import React, { useState } from "react";
import bgImage from '../assets/loginbackground.jpg';
import { useNavigate } from "react-router-dom";
import "../Components/Login.css"

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate('/Login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('Failed to register. Try again.');
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
                <h2 style={{color:"#303c6c"}}>Register to find a Perfect Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label style={{fontSize:"25px"}}>Name</label></td>
                                <td>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{height:"35px",}} />
                                </td>
                            </tr>
                            <tr>
                                <td><label style={{fontSize:"25px"}}>Phone</label></td>
                                <td>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{height:"30px",}} />
                                </td>
                            </tr>
                            <tr>
                                <td><label style={{fontSize:"25px"}}>Email</label></td>
                                <td>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{height:"30px",}} />
                                </td>
                            </tr>
                            <tr>
                                <td><label style={{fontSize:"25px"}}>Password</label></td>
                                <td>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{height:"30px",}} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: '10px' , marginLeft:"35%"}}>
                        <button type="submit" style={{ height:"30px", width:"70px" , 
                        border:"none", backgroundColor:"#c4dbF6", borderRadius:"25px"}} className="loginbtnhead">Register</button>
                    </div>
                </form>
                <div>
                    <h5 style={{marginRight:"15px"}}>Already registered?</h5>
                    <button onClick={() => navigate('/Login')} style={{  marginLeft:"17%", height:"30px", width:"70px" , 
                        border:"none", backgroundColor:"#c4dbF6", borderRadius:"25px"}} className="loginbtnhead" >Login</button>
                </div>
            </div>
        </div>
    );
}
