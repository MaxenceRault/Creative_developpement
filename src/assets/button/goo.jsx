import React from 'react';
import './goo.css';

const Goo = ({ buttonText = "Explorer" }) => {
  return (
    <div className="goo-wrapper">
      <div className="container">
        <button className="calme-button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <p>{buttonText}</p>
        </button>
      </div>
      
      {/* Filtre SVG pour l'effet goo */}
      <svg className="goo-svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix 
              type="matrix" 
              values="1 0 0 0 0 
                     0 1 0 0 0 
                     0 0 1 0 0 
                     0 0 0 100 -15" 
            />
            <feBlend in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Goo;