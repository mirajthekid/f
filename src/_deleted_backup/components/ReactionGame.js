import React, { useState } from 'react';
import GameButton from './GameButton';
import GameInfo from './GameInfo';

const ReactionGame = ({ onComplete, onNext }) => {
  const [step, setStep] = useState('wait');
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const timeoutRef = React.useRef(null);
  const handleStart = () => {
    setStep('waitingForGreen');
    const minDelay = 200;  // 0.2 seconds
    const maxDelay = 2000; // 2 seconds
    const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
    timeoutRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setStep('ready');
    }, randomDelay);
  };

  if (step === 'wait') {
    return (
      <div className="app-bg center fade-in" role="main" aria-label="Reaction game" style={{position: 'relative'}}>
        <GameInfo description="Tap as soon as the screen turns green. Try to react as fast as possible!" />
        <h1 className="headline" id="reaction-instruction" style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 0, textShadow: '0 0 3px #fff', margin: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, textTransform: 'lowercase' }}>
          tap when <span style={{ color: '#fff', fontSize: 14, textTransform: 'lowercase' }}>green</span> <span role="img" aria-label="green square">🟩</span>
        </h1>
        <GameButton onClick={handleStart} autoFocus aria-label="Start reaction game">start</GameButton>
      </div>
    );
  }

  if (step === 'waitingForGreen') {
    return <div className="app-bg center fade-in" style={{ background: '#000', color: '#fff', minHeight: '100vh' }} />;
  }

  if (step === 'ready') {
    return (
      <div
        className="app-bg center fade-in"
        style={{ background: '#00cc66', color: '#000', cursor: 'pointer' }}
        onClick={() => {
          const reaction = (Date.now() - startTime) / 1000;
          setResult(reaction);
          setStep('result');
          timeoutRef.current = null;
        }}
      />
    );
  }

  if (step === 'result') {
    return (
      <div className="app-bg center fade-in" style={{ position: 'relative' }} role="main" aria-label="Reaction game result">
        <h1 className="headline">your reaction time</h1>
        <div style={{ fontSize: 32, color: '#00ff88', margin: '24px 0', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}>{result.toFixed(3)}s</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
          <GameButton onClick={() => { setStep('wait'); setResult(null); }} aria-label="Play again">again</GameButton>
          <GameButton onClick={onNext} aria-label="Next game">next game</GameButton>
        </div>
      </div>
    );
  }
  // ...existing code...
};

export default ReactionGame;
