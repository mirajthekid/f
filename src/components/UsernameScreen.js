import React, { useState } from 'react';
import GameButton from './GameButton';
import GameInfo from './GameInfo';

const UsernameScreen = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const inputRef = React.useRef(null);

  return (
    <div 
      className="app-bg center fade-in username-row" 
      style={{gap: '1px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, minHeight: '100vh'}}
      onClick={() => inputRef.current?.focus()}
      role="main"
      aria-label="Username entry screen"
    >
      <GameInfo description="Enter your username to start playing the games. Your username will be used for your scores." />
      <h1 className="headline" id="username-label" style={{ color: '#fff', textShadow: '0 0 3px #fff', fontWeight: 700, fontFamily: 'Roboto, sans-serif', fontSize: 10, margin: 0, letterSpacing: 0, display: 'inline-block', verticalAlign: 'middle', lineHeight: '20px', paddingRight: 8, paddingLeft: 8 }}>
        enter username:
      </h1>
      <form 
        onSubmit={e => {
          e.preventDefault();
          if (username.trim()) onSubmit(username);
        }}
        style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}
        aria-labelledby="username-label"
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
          aria-label="Username"
          aria-required="true"
        />
        <GameButton type="submit" aria-label="Submit username">
          submit
        </GameButton>
      </form>
    </div>
  );
};

export default UsernameScreen;
