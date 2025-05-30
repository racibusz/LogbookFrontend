import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { loginEndpoint } from '../../endpoints';
import { UserContext } from '../../UserContext';

function Login(props) {
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        setProcessing(true);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            setProcessing(false);
            if (data.user) {
                setUser(data.user);
                navigate('/')
            } else {
                setError(data.message['pl']);
            }
        })
        .catch(error => {
            setProcessing(false);
            setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
            console.error('Error:', error);
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4 mt-5" style={{ width: '20rem' }}>
                {processing?<div className="position-absolute top-0 start-0 rounded text-center" style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                    <div class="spinner-border text-primary" style={{marginTop: '45%'}} role="status"></div>
                </div>:""}
                <h1 className='text-center'>ZALOGUJ SIĘ</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Hasło</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Zaloguj się</button>
                    <span className="text-danger">{error || '\u00A0'}</span>
                </form>
            </div>
        </div>
    );
}

export default Login;