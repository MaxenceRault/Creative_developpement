import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './mystere.css';
import hinataImg from '../assets/images/hinata.png';
import gokuImg from '../assets/images/goku.png';
import luffyImg from '../assets/images/luffy.png';
import pikachuImg from '../assets/images/pikachu.png';
import marioImg from '../assets/images/mario.png';

// Génération des éléments interactifs avec des positions aléatoires sur toute la fenêtre
const generateElements = () => {
  return [
    {
      id: 1,
      x: Math.floor(Math.random() * (window.innerWidth - 100)) + 'px',
      y: Math.floor(Math.random() * (window.innerHeight - 100)) + 'px',
      correctAnswer: 'hinata',
      name: 'Hinata',
      universe: 'Haikyuu',
      options: ['Hinata', 'Kageyama', 'Oikawa'],
      image: hinataImg,
    },
    {
      id: 2,
      x: Math.floor(Math.random() * (window.innerWidth - 100)) + 'px',
      y: Math.floor(Math.random() * (window.innerHeight - 100)) + 'px',
      correctAnswer: 'goku',
      name: 'Goku',
      universe: 'Dragon Ball',
      options: ['Goku', 'Vegeta', 'Gohan'],
      image: gokuImg,
    },
    {
      id: 3,
      x: Math.floor(Math.random() * (window.innerWidth - 100)) + 'px',
      y: Math.floor(Math.random() * (window.innerHeight - 100)) + 'px',
      correctAnswer: 'luffy',
      name: 'Luffy',
      universe: 'One Piece',
      options: ['Luffy', 'Zoro', 'Sanji'],
      image: luffyImg,
    },
    {
      id: 4,
      x: Math.floor(Math.random() * (window.innerWidth - 100)) + 'px',
      y: Math.floor(Math.random() * (window.innerHeight - 100)) + 'px',
      correctAnswer: 'pikachu',
      name: 'Pikachu',
      universe: 'Pokemon',
      options: ['Pikachu', 'Charmander', 'Bulbasaur'],
      image: pikachuImg,
    },
    {
      id: 5,
      x: Math.floor(Math.random() * (window.innerWidth - 100)) + 'px',
      y: Math.floor(Math.random() * (window.innerHeight - 100)) + 'px',
      correctAnswer: 'mario',
      name: 'Mario',
      universe: 'Mario',
      options: ['Mario', 'Luigi', 'Peach'],
      image: marioImg,
    },
  ];
};

const Mystere = () => {
  const [elements, setElements] = useState([]);
  const [found, setFound] = useState([]); // IDs des éléments trouvés
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heat, setHeat] = useState(0); // 0 = froid, 1 = chaud
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeHead, setActiveHead] = useState(null); // L'élément dont la tête est affichée

  // Générer les éléments au montage
  useEffect(() => {
    setElements(generateElements());
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Suivre la souris pour l'effet "lampe torche"
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      let minDist = Infinity;
      elements.forEach((el) => {
        if (!found.includes(el.id)) {
          const dist = Math.hypot(e.clientX - parseInt(el.x), e.clientY - parseInt(el.y));
          if (dist < minDist) minDist = dist;
        }
      });
      if (minDist < 100) setHeat(1);
      else if (minDist < 200) setHeat(0.5);
      else setHeat(0);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [elements, found]);

  // Lors du clic sur un élément, affichage la tête en overlay sur tout l'écran
  const handleElementClick = (id) => {
    if (!found.includes(id)) {
      const element = elements.find(el => el.id === id);
      setActiveHead(element);
      // Après 3 secondes, marquer l'élément comme trouvé et masquer l'overlay
      setTimeout(() => {
        setFound([...found, id]);
        setActiveHead(null);
        if (found.length + 1 === elements.length) {
          setTimeout(() => setShowQuestionnaire(true), 500);
        }
      }, 3000);
    }
  };

  const handleInputChange = (id, value) => {
    setAnswers({ ...answers, [id]: value.toLowerCase().trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sc = 0;
    elements.forEach((el) => {
      if (answers[el.id] === el.correctAnswer.toLowerCase()) sc += 1;
    });
    setScore(sc);
  };

  return (
    <div className="mystere-container">
      {/* Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            <h2>Le sens du mystere : Trouver les 5 élements et répondez au questionnaire</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet de lampe torche */}
      {!showQuestionnaire && (
        <div
          className="torch"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: `radial-gradient(circle, rgba(255,0,0,${heat}) 10%, rgba(255,165,0,${heat * 0.8}) 30%, rgba(0,0,255,0.3) 80%)`,
            pointerEvents: 'none'
          }}
        ></div>
      )}

     
      <div className="mystere-body">
        {/* Éléments interactifs - les cercles sont cachés et le curseur de la souris ne change que quand on passe dessus*/}
        {!showQuestionnaire && (
          <div className="elements-container">
            {elements.map((el) => (
              <motion.div
                key={el.id}
                className={`mystere-element ${found.includes(el.id) ? 'found' : ''}`}
                style={{ left: el.x, top: el.y }}
                onClick={() => handleElementClick(el.id)}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        )}

       
        <AnimatePresence>
          {showQuestionnaire && (
            <motion.div
              className="questionnaire"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 1 }}
            >
              <h2>Questionnaire</h2>
              <form onSubmit={handleSubmit}>
                {elements.map((el) => (
                  <div key={el.id} className="question">
                    <label>
                      Qui est présent dans l'univers {el.universe}? <br />
                      {el.options.map((opt, i) => (
                        <span key={i} style={{ marginRight: '10px' }}>
                          <input
                            type="radio"
                            name={`q-${el.id}`}
                            value={opt.toLowerCase()}
                            onChange={(e) => handleInputChange(el.id, e.target.value)}
                          />{' '}
                          {opt}
                        </span>
                      ))}
                    </label>
                  </div>
                ))}
                <button type="submit">Valider</button>
              </form>
              {score !== null && <p>Votre score : {score} / {elements.length}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay pour afficher la tête en grand lorsqu'un élément est cliqué */}
      <AnimatePresence>
        {activeHead && (
          <motion.div
            className="head-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src={activeHead.image}
              alt={activeHead.name}
              className="head-image"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mystere;