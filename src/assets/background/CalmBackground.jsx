import React from 'react';
import './CalmBackground.css';

const CalmBackground = () => {
  return (
    <div className="calm-bg">
      <div className="sky">
        <div className="sun"></div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
      </div>
      <div className="mountains">
        <div className="mountain mountain-1"></div>
        <div className="mountain mountain-2"></div>
      </div>
      <div className="water"></div>
    </div>
  );
};

export default CalmBackground;
