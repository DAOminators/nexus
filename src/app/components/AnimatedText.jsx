import React, { useState, useRef } from 'react';

const AnimatedText = ({ text, className = '', customText = '', time = 1, preStyle = '' }) => {
  const [animatedTitle, setAnimatedTitle] = useState(text || '');
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const finalClass = isHovered ? preStyle || className : className;

  // Emojis work too :))
  const letters = customText === '' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : customText;

  const handleMouseOver = () => {
    let iteration = 0;
    setIsHovered(true);

    function animateText() {
      intervalRef.current = setInterval(() => {
        const randomText = text
          .split('')
          .map((char, index) => {
            return index < iteration
              ? char
              : letters[Math.floor(Math.random() * letters.length)];
          })
          .join('');
        
        setAnimatedTitle(randomText);

        iteration += 0.5/time;

        if (iteration >= text.length) {
          clearInterval(intervalRef.current);
          setAnimatedTitle(text);
        }
      }, 30);
    }

    animateText();
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    clearInterval(intervalRef.current);
    setAnimatedTitle(text);
  };

  return (
      <div>
        <p className={`${finalClass} inline`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {animatedTitle}
        </p>
      </div>
  );
};

export default AnimatedText;