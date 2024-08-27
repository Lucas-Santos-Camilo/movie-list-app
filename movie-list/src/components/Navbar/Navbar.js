import React from 'react';
import './Navbar.css'; // Importa o arquivo CSS para estilização

const Navbar = () => {
    return (
        <nav className="navbar">
            <img className="navbar__logo" src="/path/to/logo.png" alt="Lucas Camilo" />
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
