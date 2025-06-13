import React from 'react';

const GameButton = ({ children, onClick, style = {}, className = '', ...props }) => (
  <button
    className={`game-btn ${className}`}
    style={style}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default GameButton;
