import React from 'react';
import './navigation.css';

const Navigation = ({ currentComponent, setCurrentComponent }) => {
  const components = ['Intro', 'Calme', 'Mystere', 'Frustration'];

  const handleNext = () => {
    const currentIndex = components.indexOf(currentComponent);
    const nextIndex = (currentIndex + 1) % components.length;
    setCurrentComponent(components[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = components.indexOf(currentComponent);
    const prevIndex = (currentIndex - 1 + components.length) % components.length;
    setCurrentComponent(components[prevIndex]);
  };

  return (
    <div className="navigation">
      <button onClick={handlePrev}>&larr;</button>
      <button onClick={handleNext}>&rarr;</button>
    </div>
  );
};

export default Navigation;