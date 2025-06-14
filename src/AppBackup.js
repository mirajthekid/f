import React, { useState } from 'react';
import './App.css';

const UsernameScreen = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const inputRef = React.useRef(null);

  return (
    <div 
      className="app-bg center fade-in username-row" 
      style={{gap: '1px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, minHeight: '100vh', touchAction: 'manipulation', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none'}}
      onClick={() => inputRef.current?.focus()}
      onTouchStart={() => inputRef.current?.focus()}
    >
      <h1 className="headline" style={{ color: '#fff', textShadow: '0 0 3px #fff', fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: 10, margin: 0, letterSpacing: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, paddingLeft: 8 }}>
        enter username:
      </h1>
      <form 
        onSubmit={e => {
          e.preventDefault();
          if (username.trim()) onSubmit(username);
        }}
        style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}
      >
        <input
          className="input username-input"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            fontSize: 10,
            background: '#000',
            color: '#fff',
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            borderRadius: 8,
            width: 180,
            margin: 0,
            padding: '8px 16px',
            verticalAlign: 'middle',
            textAlign: 'left',
            textShadow: '0 0 3px #fff',
            lineHeight: '20px',
            caretColor: '#fff',
            fontWeight: 700,
            fontFamily: 'Roboto, sans-serif',
            letterSpacing: 0,
            transition: 'box-shadow 0.2s'
          }}
          autoFocus
          autoComplete="off"
          inputMode="text"          
          ref={inputRef}
          maxLength={15}
          tabIndex={1}
        />
      </form>
    </div>
  );
};

const ReactionGame = ({ onComplete, onNext }) => {
  const [step, setStep] = useState('wait');
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const timeoutRef = React.useRef(null);

  const handleStart = () => {
    setStep('waitingForGreen');
    const minDelay = 200;  // 0.2 seconds
    const maxDelay = 2400; // 2.4 seconds
    const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
    timeoutRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setStep('ready');
    }, randomDelay);
  };

  if (step === 'wait') {
    return (
      <div className="app-bg center fade-in">
        <h1 className="headline" style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 0, textShadow: '0 0 3px #fff', margin: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 13, textTransform: 'lowercase' }}>
          tap when <span style={{ color: '#fff', fontSize: 14, textTransform: 'lowercase' }}>green</span> <span role="img" aria-label="green square">🟩</span>
        </h1>
        <button className="start-btn" style={{ marginTop: 24, background: 'transparent', color: '#00ff88', border: 'none', borderRadius: 8, fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: 14, padding: '8px 32px', boxShadow: 'none', cursor: 'pointer', outline: 'none', transition: 'box-shadow 0.2s', letterSpacing: 0, textTransform: 'lowercase', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }} onClick={handleStart} autoFocus>start</button>
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
      <div className="app-bg center fade-in" style={{ position: 'relative' }}>
        <h1 className="headline">your reaction time</h1>
        <div style={{ fontSize: 32, color: '#00ff88', margin: '24px 0', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}>{result.toFixed(3)}s</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
          <button 
            style={{ marginTop: 0, background: 'transparent', color: '#00ff88', border: 'none', borderRadius: 8, fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: 14, padding: '8px 32px', boxShadow: 'none', cursor: 'pointer', outline: 'none', transition: 'box-shadow 0.2s', letterSpacing: 0, textTransform: 'lowercase', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}
            onClick={() => { setStep('wait'); setResult(null); }}
          >
            again
          </button>
          <button 
            style={{ marginTop: 0, background: 'transparent', color: '#00ff88', border: 'none', borderRadius: 8, fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: 14, padding: '8px 32px', boxShadow: 'none', cursor: 'pointer', outline: 'none', transition: 'box-shadow 0.2s', letterSpacing: 0, textTransform: 'lowercase', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}
            onClick={onNext}
          >
            next game
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const OddOneOutGame = ({ onComplete, onBack, onNext }) => {
  const [step, setStep] = useState('playing');
  const [oddStartTime, setOddStartTime] = useState(null);
  const [oddResult, setOddResult] = useState(null);
  const [oddOddIndex, setOddOddIndex] = useState(null);
  const [oddGrid, setOddGrid] = useState([]);
  const [oddCountdown, setOddCountdown] = useState(3);
  const [oddCountdownActive, setOddCountdownActive] = useState(false);

  const [floatSeeds] = useState(() => Array.from({ length: 6 }, () => ({
    x: Math.random() * 60 + 20,
    y: Math.random() * 60 + 20,
    dur: Math.random() * 2 + 3,
    amp: Math.random() * 10 + 8,
    phase: Math.random() * Math.PI * 2
  })));

  React.useEffect(() => {
    startGame();
  }, []);

  React.useEffect(() => {
    if (step !== 'playing') return;
    
    setOddCountdown(3);
    setOddCountdownActive(true);
    const timer = setInterval(() => {
      setOddCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          setOddCountdownActive(false);
          setTimeout(() => setOddStartTime(Date.now()), 100);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const startGame = () => {
    const baseColor = '#00ff88';
    const oddColor = '#00994d';
    const gridSize = 6;
    const oddIndex = Math.floor(Math.random() * gridSize);
    const grid = Array(gridSize).fill(baseColor);
    grid[oddIndex] = oddColor;
    setOddGrid(grid);
    setOddOddIndex(oddIndex);
    setOddResult(null);
    setStep('playing');
    setOddStartTime(null);
  };

  if (step === 'playing') {
    const circleCount = 6;
    const radius = 90;
    const centerX = 130, centerY = 130, circleSize = 56, gap = 16;
    const positions = Array.from({ length: circleCount }, (_, i) => {
      const angle = (Math.PI * 2 / circleCount) * i;
      return {
        x: centerX + Math.cos(angle) * (radius + gap),
        y: centerY + Math.sin(angle) * (radius + gap)
      };
    });

    const blurStyle = oddCountdownActive
      ? { filter: 'blur(12px)', WebkitFilter: 'blur(12px)' }
      : {};
    const displayGrid = oddCountdownActive
      ? Array(6).fill('#00ff88')
      : oddGrid;

    return (
      <div className="app-bg center fade-in" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, width: 320, height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="headline" style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 0, textShadow: '0 0 3px #fff', margin: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, textTransform: 'lowercase', zIndex: 2 }}>tap the odd one out</h1>
          {oddCountdownActive && (
            <div style={{
              position: 'absolute',
              top: 80,
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 48,
              fontWeight: 700,
              textShadow: '0 0 16px #fff',
              zIndex: 10
            }}>{oddCountdown}</div>
          )}
          <div style={{ position: 'relative', width: 260, height: 260, margin: '32px 0', zIndex: 2, ...blurStyle, cursor: 'crosshair' }}>
            {displayGrid.map((color, i) => {
              const isOdd = !oddCountdownActive && i === oddOddIndex;
              const circleColor = color;
              const size = 56;
              const glow = `0 0 24px ${color}`;
              const style = {
                position: 'absolute',
                left: positions[i].x - size / 2,
                top: positions[i].y - size / 2,
                width: size,
                height: size,
                borderRadius: '50%',
                background: circleColor,
                boxShadow: glow,
                cursor: oddCountdownActive ? 'not-allowed' : 'pointer',
                border: 'none',
                transition: 'box-shadow 0.2s, width 0.2s, height 0.2s',
                zIndex: 2,
                pointerEvents: oddCountdownActive ? 'none' : 'auto',
                animation: `float${i} ${floatSeeds[i].dur}s ease-in-out infinite alternate`,
              };

              const styleSheet = document.styleSheets[0];
              const animName = `@keyframes float${i}`;
              if (![...styleSheet.cssRules].some(r => r.name === `float${i}`)) {
                try {
                  styleSheet.insertRule(`@keyframes float${i} { 0% { transform: translateY(0px); } 100% { transform: translateY(${floatSeeds[i].amp}px); } }`, styleSheet.cssRules.length);
                } catch (e) {}
              }

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (!oddCountdownActive && isOdd && oddStartTime) {
                      setOddResult(((Date.now() - oddStartTime) / 1000));
                      setTimeout(() => setStep('result'), 400);
                    }
                  }}
                  onTouchStart={() => {
                    if (!oddCountdownActive && isOdd && oddStartTime) {
                      setOddResult(((Date.now() - oddStartTime) / 1000));
                      setTimeout(() => setStep('result'), 400);
                    }
                  }}
                  style={{
                    ...style,
                    cursor: 'crosshair',
                    touchAction: 'manipulation',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="app-bg center fade-in" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h1 className="headline" style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 0, textShadow: '0 0 3px #fff', margin: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, textTransform: 'lowercase' }}>your time</h1>
        <div style={{ fontSize: 32, color: '#00ff88', margin: '24px 0', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}>{oddResult !== null ? oddResult.toFixed(3) + 's' : ''}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
          <button
            style={{
              background: 'transparent',
              color: '#00ff88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              padding: '8px 32px',
              boxShadow: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'box-shadow 0.2s',
              letterSpacing: 0,
              textTransform: 'lowercase',
              textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88'
            }}
            onClick={startGame}
          >
            again
          </button>
          <button
            style={{
              background: 'transparent',
              color: '#00ff88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              padding: '8px 32px',
              boxShadow: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'box-shadow 0.2s',
              letterSpacing: 0,
              textTransform: 'lowercase',
              textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88'
            }}
            onClick={onNext}
          >
            next game
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const MemoryGame = ({ onComplete, onBack, onNext }) => {
  const [memorySequence, setMemorySequence] = useState([]);
  const [memoryStep, setMemoryStep] = useState('show');
  const [memoryUserInput, setMemoryUserInput] = useState([]);
  const [memoryFlashIndex, setMemoryFlashIndex] = useState(-1);
  const [memoryResult, setMemoryResult] = useState(null);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [flashingCircle, setFlashingCircle] = useState(null);
  const timeoutRef = React.useRef(null);

  // Common colors and timing constants
  const BASE_COLOR = '#00ff88';  // Original green color
  const FLASH_COLOR = '#ff0000'; // Red flash color
  const FLASH_DURATION = 250;    // Consistent flash duration
  const GAP_DURATION = 150;      // Gap between sequence flashes

  // --- MOBILE-FIRST RESPONSIVE PATCH ---
  // Use viewport units for all sizing
  const vw = Math.max(window.innerWidth, 320);
  const vh = Math.max(window.innerHeight, 480);
  const isMobile = vw < 600;
  const areaSize = isMobile ? Math.min(vw, vh) * 0.8 : 320;
  const circleCount = 6;
  const radius = areaSize * 0.32;
  const center = areaSize / 2;
  const circleSize = areaSize * 0.18;
  const gap = areaSize * 0.02;

  const positions = React.useMemo(() => {
    return Array.from({ length: circleCount }, (_, i) => {
      const angle = (Math.PI * 2 / circleCount) * i;
      return {
        x: center + Math.cos(angle) * (radius + gap),
        y: center + Math.sin(angle) * (radius + gap)
      };
    });
  }, [areaSize]);

  const generateSequence = (length) => {
    const seq = [];
    let lastNumber = -1;
    
    for (let i = 0; i < length; i++) {
      let nextNumber;
      do {
        nextNumber = Math.floor(Math.random() * 6);
      } while (nextNumber === lastNumber);
      
      seq.push(nextNumber);
      lastNumber = nextNumber;
    }
    return seq;
  };

  const startGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const moves = 6;
    const seq = generateSequence(moves);
    setMemorySequence(seq);
    setMemoryUserInput([]);
    setMemoryFlashIndex(-1);
    setMemoryResult(null);
    setResult(null);
    setStartTime(null);
    setMemoryStep('show');
  };

  React.useEffect(() => {
    startGame();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (memoryStep !== 'show') return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (memoryFlashIndex < memorySequence.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setMemoryFlashIndex(i => i + 1);
      }, FLASH_DURATION + GAP_DURATION);
      
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else if (memoryFlashIndex === memorySequence.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setMemoryStep('input');
        setMemoryFlashIndex(-1);
        setStartTime(Date.now());
      }, FLASH_DURATION + 100);
      
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [memoryStep, memoryFlashIndex, memorySequence]);

  const handleCircleClick = (i) => {
    if (memoryStep === 'input') {
      setFlashingCircle(i);
      setTimeout(() => setFlashingCircle(null), FLASH_DURATION);
      
      setMemoryUserInput(inp => {
        const next = [...inp, i];
        if (next.length === memorySequence.length) {
          const correct = next.every((v, idx) => v === memorySequence[idx]);
          setMemoryResult(correct);
          if (correct) {
            setResult((Date.now() - startTime) / 1000);
          }
          setTimeout(() => setMemoryStep('result'), 500);
        }
        return next;
      });
    }
  };

  return (
    <div className="app-bg center fade-in" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', touchAction: 'manipulation', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', padding: isMobile ? '2vh 0' : 0 }}>
      <h1 className="headline" style={{ color: '#fff', fontSize: isMobile ? 20 : 24, fontWeight: 700, letterSpacing: 0, textShadow: '0 0 3px #fff', margin: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, textTransform: 'lowercase', zIndex: 2 }}>repeat the pattern</h1>
      <div style={{ position: 'relative', width: areaSize, height: areaSize, margin: isMobile ? '2vh 0' : '32px 0', zIndex: 2, cursor: 'crosshair', touchAction: 'manipulation', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', background: 'rgba(0,0,0,0.2)', borderRadius: '50%', boxShadow: isMobile ? '0 0 16px #00ff8844' : '0 0 24px #00ff8844' }}>
        {Array.from({length: 6}).map((_, i) => {
          let color = BASE_COLOR;
          if ((memoryStep === 'show' && memorySequence[memoryFlashIndex] === i) || i === flashingCircle) {
            color = FLASH_COLOR;
          }
          const style = {
            position: 'absolute',
            left: positions[i].x - circleSize / 2,
            top: positions[i].y - circleSize / 2,
            width: circleSize,
            height: circleSize,
            minWidth: 44,
            minHeight: 44,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 16px ${color}`,
            cursor: memoryStep === 'input' ? 'pointer' : 'default',
            border: 'none',
            transition: 'box-shadow 0.2s, background 0.2s',
            zIndex: 2,
            pointerEvents: memoryStep === 'input' ? 'auto' : 'none',
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          };

          return (
            <div
              key={i}
              style={style}
              onClick={() => handleCircleClick(i)}
              onTouchStart={() => handleCircleClick(i)}
            />
          );
        })}
      </div>
      {memoryStep === 'result' && (
        <div style={{ fontSize: isMobile ? 28 : 32, color: memoryResult ? '#00ff88' : '#ff4444', textShadow: `0 0 8px ${memoryResult ? '#00ff88' : '#ff4444'}`, marginTop: 16 }}>
          {memoryResult ? result.toFixed(3) + 's' : 'wrong'}
        </div>
      )}
      {memoryStep === 'result' && (
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
          <button
            style={{
              background: 'transparent',
              color: '#00ff88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? 18 : 14,
              padding: isMobile ? '12px 32px' : '8px 32px',
              boxShadow: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'box-shadow 0.2s',
              letterSpacing: 0,
              textTransform: 'lowercase',
              textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88'
            }}
            onClick={startGame}
          >
            again
          </button>
          <button
            style={{
              background: 'transparent',
              color: '#00ff88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? 18 : 14,
              padding: isMobile ? '12px 32px' : '8px 32px',
              boxShadow: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'box-shadow 0.2s',
              letterSpacing: 0,
              textTransform: 'lowercase',
              textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88'
            }}
            onClick={onBack}
          >
            previous game
          </button>
          <button
            style={{
              background: 'transparent',
              color: '#00ff88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? 18 : 14,
              padding: isMobile ? '12px 32px' : '8px 32px',
              boxShadow: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'box-shadow 0.2s',
              letterSpacing: 0,
              textTransform: 'lowercase',
              textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88'
            }}
            onClick={onNext}
          >
            next game
          </button>
        </div>
      )}
    </div>
  );
};

const TapTheCircleGame = ({ onBack, onNext }) => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [circle, setCircle] = useState(null); // {x, y}
  const [timeoutMs, setTimeoutMs] = useState(1000);
  const [missed, setMissed] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reaction, setReaction] = useState(null);
  const minTimeout = 1000; // was 400
  const maxTimeout = 1800; // was 1000
  const radius = 32; // was 28
  const gameAreaRef = React.useRef(null);
  const timeoutRef = React.useRef();

  // Helper to get random position
  function getRandomPosition() {
    const area = gameAreaRef.current?.getBoundingClientRect();
    if (!area) return { x: 100, y: 100 };
    const padding = radius + 10;
    const x = Math.random() * (area.width - 2 * padding) + padding;
    const y = Math.random() * (area.height - 2 * padding) + padding;
    return { x, y };
  }

  // Start game
  function startGame() {
    setScore(0);
    setTimeoutMs(maxTimeout);
    setMissed(false);
    setPlaying(true);
    setTimeout(() => showCircle(), 300);
  }

  // Show a new circle
  function showCircle() {
    const pos = getRandomPosition();
    setCircle({ ...pos, born: Date.now() });
    setStartTime(Date.now());
    // Remove the timeout that auto-misses after timeoutMs
    // The circle will disappear only if it shrinks to minimum size and is not tapped
  }

  // Animate shrinking
  let currentRadius = radius;
  let untappable = false;
  const [shrinkTick, setShrinkTick] = useState(0);
  React.useEffect(() => {
    if (playing && circle) {
      const interval = setInterval(() => setShrinkTick(t => t + 1), 16);
      return () => clearInterval(interval);
    }
  }, [playing, circle]);
  if (circle && circle.born) {
    const elapsed = Date.now() - circle.born;
    const shrinkMs = timeoutMs * 1.3; // slow down shrink, more time to tap
    const minR = 10;
    currentRadius = Math.max(minR, radius * (1 - elapsed / shrinkMs));
    if (currentRadius === minR) untappable = true;
  }

  // If circle is untappable and not already missed, end game
  React.useEffect(() => {
    if (circle && untappable && playing) {
      setMissed(true);
      setPlaying(false);
      setCircle(null);
    }
    // eslint-disable-next-line
  }, [circle, untappable, playing]);

  // Handle tap
  function handleTap(e) {
    if (!circle || missed) return;
    const area = gameAreaRef.current?.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - area.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - area.top;
    const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    if (dist <= radius) {
      // Success
      setScore(s => s + 1);
      setReaction(Date.now() - startTime);
      // Speed up, but not too fast
      setTimeoutMs(ms => Math.max(minTimeout, ms - 60));
      showCircle();
    } else {
      // Missed
      setMissed(true);
      setPlaying(false);
      setCircle(null);
    }
  }

  // End game on miss
  React.useEffect(() => {
    if (missed) clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [missed]);

  // Clean up
  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Responsive game area for mobile
  const gameAreaStyle = {
    width: '100vw',
    maxWidth: '100vw',
    height: '60vh',
    maxHeight: '60vh',
    minHeight: 240,
    minWidth: 240,
    position: 'relative',
    background: 'transparent',
    margin: '0 auto',
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'crosshair',
    WebkitTapHighlightColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 16,
    boxSizing: 'border-box',
    boxShadow: '0 0 24px #00ff8844',
    // For mobile landscape
    '@media (orientation: landscape)': {
      height: '80vw',
      maxHeight: 400
    }
  };

  return (
    <div className="app-bg center fade-in" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <h1 className="headline" style={{ fontSize: 16 }}>tap the circle!</h1>
      {(!playing && !missed) && (
        <button onClick={startGame} style={{ marginTop: 32, ...buttonStyle }}>start</button>
      )}
      {playing && (
        <div 
          ref={gameAreaRef} 
          style={gameAreaStyle}
          onMouseDown={e => e.preventDefault()} 
          onClick={handleTap} 
          onTouchStart={handleTap}
        >
          {circle && (
            <div style={{ position: 'absolute', left: circle.x - currentRadius, top: circle.y - currentRadius, width: currentRadius * 2, height: currentRadius * 2, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 16px #00ff88', zIndex: 2, transition: 'width 0.05s, height 0.05s, left 0.05s, top 0.05s' }} />
          )}
        </div>
      )}
      {missed && (
        <div style={{ marginTop: 32, color: '#ff4444', fontSize: 20, fontWeight: 700 }}>missed!<br />score: {score}</div>
      )}
      {(missed || !playing) && (
        <div style={{ display: 'flex', gap: 16, marginTop: 32, justifyContent: 'center' }}>
          <button onClick={startGame} style={buttonStyle}>again</button>
          <button onClick={onBack} style={buttonStyle}>previous game</button>
          <button onClick={onNext} style={buttonStyle}>next game</button>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  background: 'transparent',
  color: '#00ff88',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  padding: '8px 32px',
  boxShadow: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: 'box-shadow 0.2s',
  letterSpacing: 0,
  textTransform: 'lowercase',
  textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88'
};

export default function App() {
  const [currentGame, setCurrentGame] = useState('username');
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (name) => {
    setUsername(name);
    setCurrentGame('reaction');
  };

  const games = {
    username: <UsernameScreen onSubmit={handleUsernameSubmit} />,
    reaction: <ReactionGame onNext={() => setCurrentGame('odd')} />,
    odd: <OddOneOutGame 
      onBack={() => setCurrentGame('reaction')} 
      onNext={() => setCurrentGame('memory')} 
    />,
    memory: <MemoryGame
      onBack={() => setCurrentGame('odd')}
      onNext={() => setCurrentGame('tapcircle')}
    />,
    tapcircle: <TapTheCircleGame
      onBack={() => setCurrentGame('memory')}
      onNext={() => setCurrentGame('username')}
    />
  };

  return games[currentGame] || null;
}
