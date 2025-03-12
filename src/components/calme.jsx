import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div 
      ref={buttonRef} 
      className="goo-button-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};

const Calm = () => {
  const [activeSound, setActiveSound] = useState(null);
  const audioRef = useRef(null);

  const handleToggleSound = (soundType, soundFile, buttonRef) => {
    if (activeSound === soundType) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setActiveSound(null);
    } else {
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

  // Définition la couleur des barres Goo 
  let gooButtonStyle = {};
  if (activeSound === 'drop') {
    gooButtonStyle = { '--goo-blue': '#7fb9e6' }; 
  } else if (activeSound === 'ocean') {
    gooButtonStyle = { '--goo-blue': '#FFB347' };
  } else if (activeSound === 'tree') {
    gooButtonStyle = { '--goo-blue': '#4CAF50' }; 
  } else {
    gooButtonStyle = { '--goo-blue': '#7fb9e6' };
  }

  // Background dynamique
  let backgroundStyle = {};
  if (activeSound === 'ocean') {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #FF7E5F, #FEB47B)',
    };
  } else if (activeSound === 'tree') {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #4CAF50, #81C784)',
    };
  } else {
    backgroundStyle = {
      background: 'linear-gradient(135deg, #A1C6EA, #F0F8FF)',
    };
  }

  return (
    <motion.div 
      className="calm-container" 
      style={backgroundStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Soleil : affiché pour Ocean et Tree avec animation de montée mais un peu bugué*/}
      <AnimatePresence>
        {(activeSound === 'ocean' || activeSound === 'tree') && (
          <motion.div 
            className="sun-element"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Feuilles tombantes pour "foret"*/}
      <AnimatePresence>
        {activeSound === 'tree' && (
          <motion.div 
            className="leaves-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* remplissage de couleur */}
      <motion.div 
        className="content"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h1>Le Calme</h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, transition: { duration: 0.5 } }}
        >
          Plongez dans un univers où chaque nuance de bleu, de doré ou de vert est pensée pour vous envelopper d'une sensation de sérénité profonde.
          Laissez-vous bercer par les sons d'ambiance de cascade , d'océan et de forêt.
        </motion.p>
      </motion.div>
      
      {/* Boutons animé */}
      <motion.div 
        className="goo-buttons" 
        style={gooButtonStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <GooButton soundType="drop" soundFile={dropSound} buttonText="Cascade en fond" onToggle={handleToggleSound} />
        <GooButton soundType="ocean" soundFile={oceanSound} buttonText="Ocean" onToggle={handleToggleSound} />
        <GooButton soundType="tree" soundFile={treeSound} buttonText="Foret" onToggle={handleToggleSound} />
      </motion.div>
    </motion.div>
  );
};

export default Calm;
