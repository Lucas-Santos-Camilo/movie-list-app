import React from 'react';
import './Navbar.css';
import logo from './img/logo.jpg';
import Search from '../Search/Search';

const Navbar = () => {
    return (
        <nav className="navbar">
            <a href='/'>
                <img className="navbar__logo" src={logo} alt="Lucas Camilo" />
            </a>
            <Search />
            <div className="navbar__links">
                <a href="/your-list">SUA LISTA</a>
            </div>
        </nav>
    );
};

export default Navbar;
