import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMovieById, isMovieAllowlisted } from '../data/moviesData';

export default function WatchPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      navigate('/browse');
      return;
    }

    if (!isMovieAllowlisted(movieId)) {
      // Non-allowlisted movies open the Database Not Connected error page
      navigate('/database-not-connected');
      return;
    }

    const m = getMovieById(movieId);
    setMovie(m);
    setLoadError(false);

    // Record view count
    fetch(`/api/videos/${movieId}/view`, { method: 'POST' }).catch(() => {});
  }, [movieId, navigate]);

  if (!movie) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading video...
      </div>
    );
  }

  // The video stream URL proxied through the backend
  const streamUrl = `/api/stream/${movieId}`;

  return (
    <div className="standalone-player-container">
      {/* ─── TOP OVERLAY CONTROLS ─── */}
      <div className="player-top-controls">
        <button 
          className="player-back-btn" 
          onClick={() => navigate('/browse')}
          aria-label="Back to browse"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <span>Back to Browse</span>
        </button>

        <div className="player-title-display">
          <span>{movie.title}</span>
          <span style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>({movie.year})</span>
        </div>

        <div style={{ width: '130px' }}></div>
      </div>

      {/* ─── VIDEO ELEMENT ─── */}
      {loadError ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '1.75rem', fontWeight: 700 }}>Playback Error</h2>
          <p style={{ color: '#aaa', maxWidth: '450px', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            The selected video stream could not be loaded. Please ensure the streaming service is active and try again.
          </p>
          <Link to="/browse" className="btn-error-return">
            Return to Browse
          </Link>
        </div>
      ) : (
        <video 
          ref={videoRef}
          className="player-video-element" 
          controls 
          autoPlay 
          playsInline
          onError={() => setLoadError(true)}
        >
          <source src={streamUrl} type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      )}
    </div>
  );
}
