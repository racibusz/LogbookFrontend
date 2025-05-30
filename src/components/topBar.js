import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Link, NavLink } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { logoutEndpoint } from '../endpoints';
function TopBar(routes) {
    console.log(routes)
    const {user, setUser} = useContext(UserContext);
    const handleLogout = () => {
        fetch(logoutEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    }
    const logoutBtn = <button className="btn btn-danger" onClick={()=>{handleLogout();setUser(null);}}>Wyloguj się</button>;
    const loginBtn = <Link to="/login" className="btn btn-primary">Zaloguj się</Link>;
    return(
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark py-2 text-light">
            {user!=null ? user.email : "Niezalogowano"}
            <div className='container-fluid d-flex justify-content-between'>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className='navbar-brand'>LogBook</li>
                        {routes.routes.map((route, index) => {
                            if(!route.props.showInTopBar) return null;
                            return <li key={index} className='nav-item'>
                                <NavLink to={route.props.path} className='nav-link'>{route.props.name}</NavLink>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="col-lg-2 px-4 text-end">
                    {user===null ? loginBtn : logoutBtn}
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    )
}
export default TopBar;