import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Link, NavLink } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { logoutEndpoint } from '../endpoints';
function Footer(routes) {
    return(
        <footer className='bg-dark text-white p-3 mt-3'>
            <div className='row'>
                <div className='col-md-2 border-end border-secondary m-1'>
                    <nav className='navbar-dark'>
                        <ul className="navbar-nav mb-2 mb-lg-0 px-2">
                            {routes.routes.map((route, index) => {
                                if(!route.props.showInTopBar) return null;
                                return <li key={index} className='nav-item'>
                                    <NavLink to={route.props.path} className='nav-link bottomNav'>{route.props.name}</NavLink>
                                </li>
                            })}
                        </ul>
                    </nav>
                </div>
                <div className='col-md-4'>

                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 text-center'>
                    <p className='mb-0'>© 2025</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;