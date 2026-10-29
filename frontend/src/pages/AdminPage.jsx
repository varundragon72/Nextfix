import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ALLOWLISTED_MOVIES } from '../data/moviesData';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, token, login, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('library');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bannerMovieId, setBannerMovieId] = useState('dude');
  const [adminVideos, setAdminVideos] = useState(ALLOWLISTED_MOVIES);

  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    if (isAdmin && token) {
      fetch('/api/admin/videos', {
        headers: { 'x-token': token }
      })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data)) {
          // Merge with video list if available
        }
      })
      .catch(() => {});
    }
  }, [isAdmin, token]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setLoginError('Password is required.');
      return;
    }
    setLoggingIn(true);
    setLoginError('');

    try {
      const loggedUser = await login('admin', password);
      if (loggedUser.role !== 'admin') {
        logout();
        setLoginError('Access denied: Administrator privileges required.');
      }
    } catch (err) {
      setLoginError(err.message || 'Incorrect administrator password.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signup');
  };

  const handleSetBanner = (id) => {
    setBannerMovieId(id);
  };

  const filteredVideos = adminVideos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalViews = adminVideos.reduce((acc, cur) => acc + (cur.views || 45000), 0);
  const currentBanner = adminVideos.find(v => v.id === bannerMovieId) || adminVideos[0];

  return (
    <div className="admin-body" style={{ minHeight: '100vh', background: '#111111', color: '#ffffff' }}>
      {/* ─── TOP NAVBAR ─── */}
      <header className="admin-navbar">
        <div className="admin-nav-left">
          <Link to="/browse" className="admin-brand">
            <img src="/images/nextflix-logo.png" alt="NEXTFLIX" className="logo-img" style={{ height: '28px' }} />
          </Link>
          <span className="admin-pill-badge">ADMIN STUDIO</span>
        </div>

        <div className="admin-nav-right">
          <Link to="/browse" className="btn-nav-browse">
            ← Browse Catalog
          </Link>
          {isAdmin && (
            <button className="btn-nav-logout" onClick={handleLogout}>
              Logout ({user.username})
            </button>
          )}
        </div>
      </header>

      {/* ─── MAIN CONTAINER ─── */}
      {!isAdmin ? (
        /* Sign-in screen for Admin */
        <div className="admin-auth-wrap">
          <div className="admin-auth-card">
            <h1>Admin Studio</h1>
            <p>Enter administrator credentials to manage library titles, spotlight banners, and analytics.</p>

            <form className="admin-auth-form" onSubmit={handleAdminLogin}>
              <label className="admin-field-label">Administrator Password</label>
              <input 
                type="password" 
                className="admin-input" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              {loginError && (
                <div className="admin-error-box" style={{ color: '#ff4d4d' }}>
                  {loginError}
                </div>
              )}

              <button type="submit" className="btn-admin-submit" disabled={loggingIn}>
                {loggingIn ? 'Authenticating...' : 'Sign In to Studio'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Admin Dashboard */
        <main className="admin-main">
          <h1 className="admin-header-title">Studio Overview</h1>
          <p className="admin-header-subtitle">
            Manage library titles, spotlight banners, and monitor streaming performance.
          </p>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div style={{ color: '#999', fontSize: '0.85rem' }}>Active Catalog Titles</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>{adminVideos.length}</div>
              <div style={{ color: '#46d369', fontSize: '0.8rem', marginTop: '4px' }}>✓ Online &amp; Streaming</div>
            </div>

            <div className="metric-card">
              <div style={{ color: '#999', fontSize: '0.85rem' }}>Total Video Streams</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>{totalViews.toLocaleString()}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '4px' }}>All-time impressions</div>
            </div>

            <div className="metric-card">
              <div style={{ color: '#999', fontSize: '0.85rem' }}>Featured Banner Spotlight</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '8px', color: '#e50914' }}>
                {currentBanner.title}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '4px' }}>Active on browse hero</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #2e2e2e', marginBottom: '2rem' }}>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'library' ? '#fff' : '#888',
                borderBottom: activeTab === 'library' ? '2px solid #e50914' : '2px solid transparent',
                padding: '10px 16px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('library')}
            >
              Library Titles ({adminVideos.length})
            </button>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'system' ? '#fff' : '#888',
                borderBottom: activeTab === 'system' ? '2px solid #e50914' : '2px solid transparent',
                padding: '10px 16px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('system')}
            >
              Platform Information
            </button>
          </div>

          {activeTab === 'library' && (
            <div>
              {/* Search Bar */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Filter titles..." 
                  className="admin-input" 
                  style={{ maxWidth: '350px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Video Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filteredVideos.map(v => {
                  const isFeatured = v.id === bannerMovieId;
                  return (
                    <div 
                      key={v.id} 
                      style={{ 
                        background: '#1a1a1a', 
                        border: '1px solid #2e2e2e', 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ position: 'relative', height: '180px', background: '#000' }}>
                        <img 
                          src={v.poster} 
                          alt={v.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {isFeatured && (
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#e50914', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '3px' }}>
                            ★ Spotlight Banner
                          </span>
                        )}
                        <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '3px' }}>
                          {v.views || 45000} views
                        </span>
                      </div>

                      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '4px' }}>{v.title}</div>
                          <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            {v.year} • {v.category} • {v.rating}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #292929', paddingTop: '12px' }}>
                          <button 
                            type="button" 
                            style={{ 
                              flex: 1, 
                              background: isFeatured ? '#333' : '#262626', 
                              border: '1px solid #444', 
                              color: isFeatured ? '#e50914' : '#fff', 
                              borderRadius: '4px', 
                              padding: '8px 12px', 
                              cursor: 'pointer',
                              fontWeight: isFeatured ? 700 : 400
                            }}
                            onClick={() => handleSetBanner(v.id)}
                          >
                            {isFeatured ? '★ Active Banner' : '☆ Set Banner'}
                          </button>
                          
                          <Link 
                            to={`/watch/${v.id}`}
                            style={{ 
                              background: '#e50914', 
                              border: 'none', 
                              color: '#fff', 
                              borderRadius: '4px', 
                              padding: '8px 16px', 
                              cursor: 'pointer',
                              textDecoration: 'none',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            ▶ Play
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: '8px', padding: '2rem', maxWidth: '800px' }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: '#fff' }}>Streaming Architecture</h2>
              <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li><strong>Frontend:</strong> React single-page application running on Vite with optimized client-side routing.</li>
                <li><strong>Backend:</strong> Python Flask microservice providing authentication and range-based media delivery.</li>
                <li><strong>Media Streaming:</strong> Native HTML5 video player with HTTP 206 Partial Content support for smooth seeking.</li>
                <li><strong>Profiles &amp; Personalization:</strong> Multi-profile session management with per-profile watchlists.</li>
              </ul>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
