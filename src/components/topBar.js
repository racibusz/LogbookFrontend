import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Link, NavLink } from 'react-router-dom';
import languageStrings from '../translationFile';
import { UserContext } from "../UserContext";
import { logoutEndpoint } from '../endpoints';
function TopBar(routes) {
    const {user, setUser} = useContext(UserContext);
    const {language, setLanguage} = React.useContext(UserContext)
    const text = languageStrings[language]['topBar'];

    const handleLogout = () => {
        fetch(logoutEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    }
    const logoutBtn = <button className="btn btn-danger" onClick={()=>{handleLogout();setUser(null);}}>{text['logout']}</button>;
    return(
        <nav className="navbar navbar-light navbar-expand-lg bg-light text-dark px-3">
            <Link class="navbar-brand border-end px-5" to="/">LogBook</Link>
            <div className='collapse navbar-collapse' id="navbarNav">
                <div>
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        {routes.routes.map((route, index) => {
                            if(!route.props.showInTopBar) return null;
                            return <li key={index} className='nav-item'>
                                <NavLink to={route.props.path} className='nav-link'>{route.props.name}</NavLink>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            {user?logoutBtn:""}
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
    )
}
export default TopBar;