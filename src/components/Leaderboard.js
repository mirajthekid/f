import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../firebase';

export default function Leaderboard({ game, onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard(game).then(data => {
      setScores(data);
      setLoading(false);
    });
  }, [game]);

  return (
    <div className="app-bg center fade-in" style={{ minHeight: '100vh', color: '#fff', padding: 24 }}>
      <h1 className="headline" style={{ color: '#00ff88', fontSize: 24, marginBottom: 16 }}>Leaderboard</h1>
      <div style={{ marginBottom: 16, color: '#fff', fontSize: 16 }}>
        Top 500 for <b>{game}</b>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ol style={{ maxWidth: 320, margin: '0 auto', padding: 0, listStyle: 'decimal', color: '#fff' }}>
          {scores.map((entry, i) => (
            <li key={i} style={{ marginBottom: 4, fontWeight: i < 3 ? 700 : 400, color: i < 3 ? '#00ff88' : '#fff' }}>
              <span style={{ marginRight: 8 }}>{entry.username || 'anon'}</span>
              <span style={{ color: '#00ff88' }}>{entry.score}</span>
            </li>
          ))}
        </ol>
      )}
      <button onClick={onBack} style={{ marginTop: 32, background: 'transparent', color: '#00ff88', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, padding: '8px 32px', cursor: 'pointer', textShadow: '0 0 8px #00ff88, 0 0 2px #00ff88' }}>back</button>
    </div>
  );
}
