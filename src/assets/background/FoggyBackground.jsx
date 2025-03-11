import React from 'react';
import './canvasParticle.css';

const DrippingLiquid = () => {
  return (
    <div className="drip-container">
      {/* Plusieurs gouttes positionnées à différents endroits avec des délais d'animation */}
      <div className="drip" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="drip" style={{ left: '30%', animationDelay: '0.5s' }}></div>
      <div className="drip" style={{ left: '50%', animationDelay: '1s' }}></div>
      <div className="drip" style={{ left: '70%', animationDelay: '1.5s' }}></div>
      <div className="drip" style={{ left: '90%', animationDelay: '2s' }}></div>
    </div>
  );
};

export default DrippingLiquid;
