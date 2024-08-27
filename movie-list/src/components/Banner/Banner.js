import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <header className="banner">
            <div className="banner__contents">
                <h1 className="banner__title">Movie Title</h1>
                <h2 className="banner__description">
                    This is a description of the movie. It provides more detail about the content.
                </h2>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    );
};

export default Banner;
