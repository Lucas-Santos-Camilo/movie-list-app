import React from 'react';
import './Footer.css'; // Adicione o CSS para o Footer

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
