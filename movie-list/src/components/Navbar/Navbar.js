// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // Importe o CSS para estilização

const Navbar = () => {
    return (
        <nav className="navbar">
            <img className="navbar__logo" src="/path/to/logo.png" alt="Prime Video" />
            <div className="navbar__links">
                <a href="/">Home</a>
                <a href="/browse">Browse</a>
                <a href="/your-list">Your List</a>
            </div>
            <div className="navbar__profile">
                <img src="/path/to/profile-pic.png" alt="Profile" />
            </div>
        </nav>
    );
};

export default Navbar;