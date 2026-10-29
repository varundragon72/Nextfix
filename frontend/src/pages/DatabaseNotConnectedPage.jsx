import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function DatabaseNotConnectedPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="error-page-container"
      style={{
        minHeight: '100vh',
        background: '#141414',
        display: 'flex',
        flexDirection: 'column',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* ─── HEADER ─── */}
      <header 
        style={{
          padding: '1.5rem 4%',
          borderBottom: '1px solid #222222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Link to="/browse" aria-label="NEXTFLIX Home">
          <img src="/images/nextflix-logo.png" alt="NEXTFLIX" style={{ height: '36px', width: 'auto' }} />
        </Link>
        <Link 
          to="/browse" 
          style={{
            color: '#e5e5e5',
            textDecoration: 'none',
            fontSize: '0.9rem',
            padding: '6px 14px',
            borderRadius: '4px',
            border: '1px solid #444'
          }}
        >
          Return to Browse
        </Link>
      </header>

      {/* ─── DELIBERATE POLISHED ERROR SCREEN ─── */}
      <main 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 1.5rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <div 
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'rgba(229, 9, 20, 0.12)',
            border: '2px solid rgba(229, 9, 20, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e50914',
            marginBottom: '1.75rem'
          }}
        >
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            <line x1="1" y1="1" x2="23" y2="23" stroke="#e50914" strokeWidth="2.5"></line>
          </svg>
        </div>

        <h1 
          style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}
        >
          Database Not Connected
        </h1>

        <p 
          style={{
            fontSize: '1.15rem',
            color: '#b3b3b3',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          This movie is not available in the current demo because the database has been removed.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            type="button" 
            onClick={() => navigate('/browse')}
            style={{
              background: '#e50914',
              color: '#ffffff',
              border: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f40612'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#e50914'; }}
          >
            ← Return to Dashboard
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            style={{
              background: 'transparent',
              color: '#cccccc',
              border: '1px solid #444444',
              fontSize: '1rem',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { 
              e.currentTarget.style.color = '#ffffff'; 
              e.currentTarget.style.borderColor = '#ffffff'; 
            }}
            onMouseOut={(e) => { 
              e.currentTarget.style.color = '#cccccc'; 
              e.currentTarget.style.borderColor = '#444444'; 
            }}
          >
            Previous Page
          </button>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer 
        style={{
          borderTop: '1px solid #222222',
          padding: '1.5rem 4%',
          textAlign: 'center',
          color: '#666666',
          fontSize: '0.85rem'
        }}
      >
        NEXTFLIX India
      </footer>
    </div>
  );
}
