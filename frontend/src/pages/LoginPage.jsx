import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get('email') || '';

  const [username, setUsername] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser) {
      setErrorMsg('Please enter your username or email address.');
      return;
    }
    if (!cleanPass) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const user = await login(cleanUser, cleanPass);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/browse');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="login-view-wrapper"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.8)), url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* ─── HEADER ─── */}
      <header 
        style={{
          padding: '1.5rem 4%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10
        }}
      >
        <Link to="/" aria-label="NEXTFLIX Home">
          <img 
            src="/images/nextflix-logo.png" 
            alt="NEXTFLIX" 
            style={{ height: '38px', width: 'auto' }} 
          />
        </Link>
      </header>

      {/* ─── MAIN SIGN-IN CARD ─── */}
      <main 
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem 4rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div 
          style={{
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(12px)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
            padding: '3rem 3.5rem',
            width: '100%',
            maxWidth: '450px',
            boxSizing: 'border-box'
          }}
        >
          <h1 
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1.75rem',
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}
          >
            Sign In
          </h1>

          {/* Error Notice */}
          {errorMsg && (
            <div 
              style={{
                background: 'rgba(229, 9, 20, 0.12)',
                border: '1px solid #e50914',
                color: '#ff6b6b',
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                lineHeight: 1.45,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}
              role="alert"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Username / Email Field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label 
                htmlFor="loginUsername"
                style={{
                  display: 'block',
                  fontSize: '0.825rem',
                  fontWeight: 500,
                  color: '#b3b3b3',
                  marginBottom: '6px'
                }}
              >
                Username or Email
              </label>
              <input 
                type="text" 
                id="loginUsername"
                style={{
                  width: '100%',
                  height: '50px',
                  background: 'rgba(22, 22, 22, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '4px',
                  color: '#ffffff',
                  padding: '0 16px',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, background-color 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ffffff';
                  e.target.style.background = 'rgba(30, 30, 30, 0.95)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.background = 'rgba(22, 22, 22, 0.9)';
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            {/* Password Field with Show/Hide toggle */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="loginPassword"
                style={{
                  display: 'block',
                  fontSize: '0.825rem',
                  fontWeight: 500,
                  color: '#b3b3b3',
                  marginBottom: '6px'
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="loginPassword"
                  style={{
                    width: '100%',
                    height: '50px',
                    background: 'rgba(22, 22, 22, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    padding: '0 48px 0 16px',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, background-color 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ffffff';
                    e.target.style.background = 'rgba(30, 30, 30, 0.95)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.background = 'rgba(22, 22, 22, 0.9)';
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                
                {/* Working Password Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#8c8c8c',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = '#8c8c8c'; }}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '48px',
                background: loading ? '#8a1015' : '#e50914',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '1rem'
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#f40612';
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#e50914';
              }}
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Remember Me and Assistance */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.825rem',
                color: '#b3b3b3',
                marginBottom: '2rem'
              }}
            >
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  style={{ accentColor: '#737373' }}
                />
                <span>Remember me</span>
              </label>

              <Link 
                to="/" 
                style={{ color: '#b3b3b3', textDecoration: 'none' }}
                onMouseOver={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseOut={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Back to Home
              </Link>
            </div>
          </form>

          {/* New to NEXTFLIX */}
          <div style={{ color: '#737373', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
            New to NEXTFLIX?{' '}
            <Link 
              to="/" 
              style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}
              onMouseOver={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseOut={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              Sign up now.
            </Link>
          </div>

          <p style={{ color: '#8c8c8c', fontSize: '0.75rem', lineHeight: 1.45, margin: 0 }}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </p>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer 
        style={{
          background: 'rgba(0, 0, 0, 0.75)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2rem 4%',
          color: '#737373',
          fontSize: '0.85rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>
            Questions? Call <a href="tel:000-800-919-1743" style={{ color: '#737373' }}>000-800-919-1743</a>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>FAQ</a>
            <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Help Centre</a>
            <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Terms of Use</a>
            <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Cookie Preferences</a>
            <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Corporate Information</a>
          </div>
          <p style={{ margin: 0 }}>NEXTFLIX India</p>
        </div>
      </footer>
    </div>
  );
}
