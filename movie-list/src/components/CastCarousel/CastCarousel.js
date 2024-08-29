import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import './CastCarousel.css';

const CastCarousel = ({ cast }) => {
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200; // Ajuste o valor conforme necessário
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!cast || cast.length === 0) return <div>No cast data available</div>;

    return (
        <div className="cast-carousel">
            <h2>Elenco</h2>
            <div className="cast-carousel__controls">
                <button className="cast-carousel__control cast-carousel__control--left" onClick={() => scroll('left')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="cast-carousel__container" ref={carouselRef}>
                    {cast.map(actor => (
                        <div key={actor.id} className="cast-carousel__item">
                            {actor.profile_path ? (
                                <img
                                    className="cast-carousel__image"
                                    src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                                    alt={actor.name}
                                />
                            ) : (
                                <div className="cast-carousel__image no-profile-image">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            )}
                            <p className="cast-carousel__name">{actor.name}</p>
                        </div>
                    ))}
                </div>
                <button className="cast-carousel__control cast-carousel__control--right" onClick={() => scroll('right')}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
};

export default CastCarousel;
