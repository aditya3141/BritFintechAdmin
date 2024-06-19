import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userName, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('https://www.britfintechawards.com/prod/api/userlogin/checklogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.response && data.responseCode === "00") {
                localStorage.setItem('token', data.data.token);  // Store token
                localStorage.setItem('user', JSON.stringify(data.data));  // Store user information
                window.location.replace('/Home');
            } else {
                setError(data.message || 'Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <div className="authincation h-100 vh-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">
                                                <NavLink to="/Home"><img src="images/logo-dark.svg" style={{ height: '50px' }} className="w-10" alt="" /></NavLink>
                                            </div>
                                            <h4 className="text-center mb-4">Sign in your account</h4>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Email</strong></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={userName} 
                                                        onChange={(e) => setEmail(e.target.value)} 
                                                    />
                                                </div>
                                                <div className="mb-3 position-relative">
                                                    <label className="mb-1"><strong>Password</strong></label>
                                                    <input
                                                        type={passwordVisible ? "text" : "password"}
                                                        id="dz-password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <span className="show-pass eye" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '38px' }}>
                                                        {passwordVisible ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                                                    </span>
                                                </div>
                                                {error && <div className="alert alert-danger">{error}</div>}
                                                <div className="row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="mb-3">
                                                        <div className="form-check custom-checkbox ms-1">
                                                            <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                                                            <label className="form-check-label" htmlFor="basic_checkbox_1">Remember me</label>
                                                        </div>
                                                    </div>
                                                    {/* <div className="mb-3">
                                                        <NavLink to="/">Forgot Password?</NavLink>
                                                    </div> */}
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
                                                </div>
                                            </form>
                                            {/* <div className="new-account mt-3">
                                                <p>Don't have an account? <NavLink className="text-primary" to="page-register.html">Sign up</NavLink></p>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
