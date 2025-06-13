import React, { useState } from 'react';
import GameButton from './GameButton';
import GameInfo from './GameInfo';

const OddOneOutGame = ({ onComplete, onBack, onNext }) => {
  // ...existing code from OddOneOutGame in App.js...
  if (step === 'playing') {
    return (
      <div className="app-bg center fade-in" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }} role="main" aria-label="Odd one out game">
        <GameInfo description="Find and tap the circle that is a different color from the rest as quickly as you can." />
        {/* ...existing code... */}
      </div>
    );
  }
  if (step === 'result') {
    return (
      <div className="app-bg center fade-in" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} role="main" aria-label="Odd one out result">
        <h1 className="headline" style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 0, textShadow: '0 0 3px #fff', margin: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, textTransform: 'lowercase' }}>your time</h1>
        <div style={{ fontSize: 32, color: '#00ff88', margin: '24px 0', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}>{oddResult ? oddResult.toFixed(3) + 's' : ''}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
          <GameButton onClick={startGame} aria-label="Play again">again</GameButton>
          <GameButton onClick={onBack} aria-label="Previous game">previous game</GameButton>
          <GameButton onClick={onNext} aria-label="Next game">next game</GameButton>
        </div>
      </div>
    );
  }
  // ...existing code...
};

export default OddOneOutGame;
