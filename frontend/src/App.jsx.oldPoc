import React, { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);

  // Fetch our mock movie list from our Node backend server when the browser tab opens
  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error communicating with backend:", err));
  }, []);

  // Send a hidden network request containing the specific file path to our launcher server
  const handleDoubleClick = async (filePath) => {
    try {
      await fetch('http://localhost:5000/api/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: filePath })
      });
    } catch (err) {
      console.error("Failed to signal launcher backend:", err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>🎬 My Local Movie Browser</h1>
      <p style={{ color: '#aaa', fontSize: '14px' }}>💡 Single-click to select. <b>Double-click</b> an item card to execute local playback in VLC.</p>
      
      <div style={{ display: 'flex', gap: '25px', marginTop: '30px' }}>
        {movies.map(movie => (
          <div 
            key={movie.id}
            onDoubleClick={() => handleDoubleClick(movie.filePath)}
            style={{
              border: '1px solid #444',
              borderRadius: '12px',
              padding: '24px',
              width: '220px',
              cursor: 'pointer',
              backgroundColor: '#1e1e1e',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              userSelect: 'none', // Critical: stops double-clicks from turning the text blue
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#3b82f6' }}>{movie.title}</h3>
            <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#333', color: '#bbb' }}>
              {movie.year}
            </span>
            <p style={{ fontSize: '11px', color: '#666', marginTop: '15px', wordBreak: 'break-all' }}>
              📍 {movie.filePath}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
