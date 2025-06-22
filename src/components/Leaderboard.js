import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../firebase';

export default function Leaderboard({ game }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard(game).then(data => {
      let sorted = data;
      if (game === 'tapcircle') {
        sorted = [...data].sort((a, b) => b.score - a.score);
      } else {
        sorted = [...data].sort((a, b) => a.score - b.score);
      }
      setScores(sorted.slice(0, 50));
      setLoading(false);
    });
  }, [game]);

  return (
    <div
      className="leaderboard-scroll"
      style={{
        maxWidth: 340,
        margin: '32px auto 0',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: 12,
        padding: 16,
        overflowY: 'auto',
        maxHeight: 320
      }}
    >
      <h2 style={{ color: '#00ff88', fontSize: 18, margin: '0 0 8px 0', fontWeight: 700, letterSpacing: 1 }}>Leaderboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ol style={{ maxWidth: 320, margin: '0 auto', padding: 0, listStyle: 'none', color: '#fff', fontSize: 14, overflow: 'auto' }}>
          {scores.map((entry, i) => (
            <li
              key={i}
              style={{
                marginBottom: 4,
                fontWeight: i < 3 ? 700 : 400,
                color: i < 3 ? '#00ff88' : '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 48 // More space between name and score
              }}
            >
              <span style={{ minWidth: 24, textAlign: 'right', marginRight: 8, color: '#00ff88', fontWeight: 700 }}>{i + 1}.</span>
              <span style={{ flex: 1 }}>{entry.username || 'anon'}</span>
              <span style={{ color: '#00ff88', minWidth: 60, textAlign: 'right', display: 'inline-block' }}>{entry.score}{game === 'tapcircle' ? '' : ' ms'}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
