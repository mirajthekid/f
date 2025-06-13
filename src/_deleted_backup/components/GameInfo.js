import React, { useState } from 'react';

const infoBtnStyle = {
  position: 'absolute',
  top: 16,
  right: 16,
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: '#222',
  color: '#00ff88',
  border: 'none',
  fontWeight: 700,
  fontSize: 20,
  cursor: 'pointer',
  boxShadow: '0 0 8px #00ff88',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const contentStyle = {
  background: '#111',
  color: '#fff',
  borderRadius: 16,
  padding: '32px 24px',
  maxWidth: 340,
  boxShadow: '0 0 24px #00ff88',
  textAlign: 'center',
  fontSize: 16,
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: 8,
  right: 12,
  background: 'none',
  border: 'none',
  color: '#00ff88',
  fontSize: 24,
  cursor: 'pointer',
  fontWeight: 700,
};
// ...existing code...
