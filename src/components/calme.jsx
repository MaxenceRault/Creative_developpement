import React, { useRef, useState, useEffect } from 'react';
import './calme.css';
import dropSound from '../assets/sounds/drop.mp3';
import oceanSound from '../assets/sounds/ocean.mp3';
import treeSound from '../assets/sounds/tree.mp3';
import '../assets/button/goo.css';

const GooButton = ({ soundType, soundFile, buttonText, onToggle }) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    onToggle(soundType, soundFile, buttonRef);
    if (buttonRef.current) {
      buttonRef.current.classList.add('pulse');
      setTimeout(() => {
        buttonRef.current.classList.remove('pulse');
      }, 500);
    }
  };

  return (
    <div ref={buttonRef} className="goo-button-wrapper">
      <div className="goo-wrapper">
        <div className="container">
          <button className="calme-button" onClick={handleClick}>
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
    </div>
  );
};

const Calm = () => {
  const [activeSound, setActiveSound] = useState(null);
  const audioRef = useRef(null);

  const handleToggleSound = (soundType, soundFile, buttonRef) => {
    // Si le son cliqué est déjà actif, l'arrêter
    if (activeSound === soundType) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setActiveSound(null);
    } else {
      // Sinon, arrêter le son précédent puis jouer le nouveau
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const newAudio = new Audio(soundFile);
      newAudio.play().catch((error) =>
        console.error("Error playing audio:", error)
      );
      audioRef.current = newAudio;
      setActiveSound(soundType);
    }
  };

  // Lorsque le composant se démonte, arrêter le son s'il est en cours
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Définir dynamiquement le fond en fonction du son actif
  let backgroundStyle = {};
  if (activeSound === 'drop') {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      transition: 'background 0.5s ease',
    };
  } else if (activeSound === 'ocean') {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #FF7E5F, #FEB47B)',
      transition: 'background 0.5s ease',
    };
  } else if (activeSound === 'tree') {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #4CAF50, #81C784)',
      transition: 'background 0.5s ease',
    };
  } else {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #A1C6EA, #F0F8FF)',
      transition: 'background 0.5s ease',
    };
  }

  return (
    <div className="calm-container" style={backgroundStyle}>
      {/* Afficher le soleil pour Ocean et Tree */}
      {(activeSound === 'ocean' || activeSound === 'tree') && (
        <div className="sun-element"></div>
      )}
      {/* Pour le mode Tree, afficher aussi des feuilles tombantes */}
      {activeSound === 'tree' && (
        <div className="leaves-container">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
      )}

      <div className="content">
        <h1>Calme</h1>
        <p>
          Un horizon serein et apaisant où des teintes pastel et un léger mouvement de fond invitent à la détente.
        </p>
      </div>
      <div className="goo-buttons">
        <GooButton
          soundType="drop"
          soundFile={dropSound}
          buttonText="Drop"
          onToggle={handleToggleSound}
        />
        <GooButton
          soundType="ocean"
          soundFile={oceanSound}
          buttonText="Ocean"
          onToggle={handleToggleSound}
        />
        <GooButton
          soundType="tree"
          soundFile={treeSound}
          buttonText="Tree"
          onToggle={handleToggleSound}
        />
      </div>
    </div>
  );
};

export default Calm;
