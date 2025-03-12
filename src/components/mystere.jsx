import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './mystere.css';

const elementsData = [
  { id: 1, x: 200, y: 300, correctAnswer: 'rouge', universe: 'mario' },
  { id: 2, x: 600, y: 150, correctAnswer: 'bleu', universe: 'starwars' },
  { id: 3, x: 400, y: 500, correctAnswer: 'vert', universe: 'dc' },
  { id: 4, x: 900, y: 350, correctAnswer: 'jaune', universe: 'harrypotter' },
  { id: 5, x: 700, y: 600, correctAnswer: 'violet', universe: 'lotr' },
];

const Mystere = () => {
  const [found, setFound] = useState([]);       // IDs des éléments trouvés
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heat, setHeat] = useState(0);           // 0 = froid, 1 = chaud
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Calculer la distance minimale entre la position de la souris et les éléments non trouvés
      let minDist = Infinity;
      elementsData.forEach((el) => {
        if (!found.includes(el.id)) {
          const dist = Math.hypot(e.clientX - el.x, e.clientY - el.y);
          if (dist < minDist) minDist = dist;
        }
      });
      // Mise à jour de la "chaleur"
      if (minDist < 100) setHeat(1); // très proche => chaud
      else if (minDist < 200) setHeat(0.5); // intermédiaire
      else setHeat(0); // éloigné => froid
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [found]);

  const handleElementClick = (id) => {
    if (!found.includes(id)) {
      setFound([...found, id]);
      if (found.length + 1 === elementsData.length) {
        setTimeout(() => setShowQuestionnaire(true), 500);
      }
    }
  };

  const handleInputChange = (id, value) => {
    setAnswers({ ...answers, [id]: value.toLowerCase().trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sc = 0;
    elementsData.forEach((el) => {
      if (answers[el.id] === el.correctAnswer) sc += 1;
    });
    setScore(sc);
  };

  return (
    <div className="mystere-container">
      {/* Effet lampe torche */}
      <div
        className="torch"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: `radial-gradient(circle, rgba(255,0,0,${heat}) 10%, rgba(255,165,0,${heat * 0.8}) 30%, rgba(0,0,255,0.3) 80%)`,
        }}
      ></div>

      {/* "Body" de la page Mystère */}
      <div className="mystere-body">
        {/* Éléments interactifs */}
        {!showQuestionnaire && (
          <div className="elements-container">
            {elementsData.map((el) => (
              <motion.div
                key={el.id}
                className={`mystere-element ${found.includes(el.id) ? 'found' : ''}`}
                style={{ left: `${el.x}px`, top: `${el.y}px` }}
                onClick={() => handleElementClick(el.id)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: found.includes(el.id) ? 1 : 0, scale: found.includes(el.id) ? 1.2 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {found.includes(el.id) && <span>{el.universe}</span>}
              </motion.div>
            ))}
          </div>
        )}

        {/* Questionnaire final */}
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
                {elementsData.map((el) => (
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
              {score !== null && <p>Votre score : {score} / {elementsData.length}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Mystere;
