import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ALLOWLISTED_MOVIES, OTHER_CATALOG_MOVIES, ALL_MOVIES, isMovieAllowlisted, shuffleWithSeed } from '../data/moviesData';
import BackgroundVideo from '../components/BackgroundVideo';

export default function BrowsePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedModalMovie, setSelectedModalMovie] = useState(null);
  const [myListIds, setMyListIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nextflix_mylist');
      return saved ? JSON.parse(saved) : ['dude', 'dragon', 'amaran'];
    } catch {
      return ['dude', 'dragon', 'amaran'];
    }
  });

  // Default profiles
  const [profiles, setProfiles] = useState([
    { id: 'me', name: user?.name || user?.username || 'Member', initial: (user?.name || user?.username || 'M')[0].toUpperCase(), tone: 'sunset' },
    { id: 'guest', name: 'Chris', initial: 'C', tone: 'ocean' },
    { id: 'teens', name: 'Ronnie', initial: 'R', tone: 'violet' },
    { id: 'kids', name: 'Kids', initial: 'K', tone: 'mint' }
  ]);
  const [activeProfile, setActiveProfile] = useState(profiles[0]);
  const [showProfileOverlay, setShowProfileOverlay] = useState(false);

  // Toggle My List
  const toggleMyList = (id, e) => {
    if (e) e.stopPropagation();
    setMyListIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('nextflix_mylist', JSON.stringify(next));
      return next;
    });
  };

  // Movie click handler: Allowlisted -> /watch/:id; Non-allowlisted -> /database-not-connected
  const handleMovieClick = (movie) => {
    if (isMovieAllowlisted(movie.id)) {
      navigate(`/watch/${movie.id}`);
    } else {
      navigate('/database-not-connected');
    }
  };

  // Stable session seed: randomized per browser session, but consistent while navigating/scrolling
  const sessionSeed = useMemo(() => {
    try {
      let seed = sessionStorage.getItem('nextflix_browse_seed');
      if (!seed) {
        seed = String(Math.floor(Math.random() * 900000) + 100000);
        sessionStorage.setItem('nextflix_browse_seed', seed);
      }
      return parseInt(seed, 10);
    } catch {
      return 123456;
    }
  }, []);

  // Featured hero movie chosen from playable allowlisted movies based on session seed
  const heroMovie = useMemo(() => {
    const idx = sessionSeed % ALLOWLISTED_MOVIES.length;
    return ALLOWLISTED_MOVIES[idx];
  }, [sessionSeed]);

  // Section 1: Blockbuster hits with independent session-stable shuffle
  const rawBlockbusters = useMemo(() => {
    return shuffleWithSeed(ALLOWLISTED_MOVIES, sessionSeed + 101);
  }, [sessionSeed]);

  // Section 2: Top 10 in India Today with distinct independent order
  const rawTop10 = useMemo(() => {
    const pool = shuffleWithSeed(ALL_MOVIES, sessionSeed + 202);
    return pool.slice(0, 10);
  }, [sessionSeed]);

  // Section 3: Trending Now with independent sequence
  const rawTrending = useMemo(() => {
    return shuffleWithSeed(ALL_MOVIES, sessionSeed + 303);
  }, [sessionSeed]);

  // Section 4: Kollywood & Tamil Cinema Hits
  const rawTamil = useMemo(() => {
    const tamilMovies = ALL_MOVIES.filter(m => 
      m.category.toLowerCase().includes('tamil') ||
      (m.tags && m.tags.some(t => t.toLowerCase() === 'tamil')) ||
      ['dude', 'dragon', 'lik', 'amaran', 'moonu', 'ponniyin-selvan', 'jigarthanda-doublex', 'karuppu', 'mandaadi', 'modha-rathri'].includes(m.id)
    );
    return shuffleWithSeed(tamilMovies, sessionSeed + 404);
  }, [sessionSeed]);

  // Section 5: Anime Masterpieces
  const rawAnime = useMemo(() => {
    const anime = ALL_MOVIES.filter(m => m.category.toLowerCase().includes('anime') || (m.tags && m.tags.includes('Anime')));
    return shuffleWithSeed(anime, sessionSeed + 505);
  }, [sessionSeed]);

  // Section 6: Romance & Drama
  const rawRomance = useMemo(() => {
    const romance = ALL_MOVIES.filter(m => m.category.includes('Romance') || m.category.includes('Drama'));
    return shuffleWithSeed(romance, sessionSeed + 606);
  }, [sessionSeed]);

  // Filtered lists for active search query
  const searchLower = searchQuery.toLowerCase().trim();
  const filterList = (list) => {
    if (!searchLower) return list;
    return list.filter(m => 
      m.title.toLowerCase().includes(searchLower) ||
      m.category.toLowerCase().includes(searchLower) ||
      (m.tags && m.tags.some(t => t.toLowerCase().includes(searchLower)))
    );
  };

  const blockbusterMovies = filterList(rawBlockbusters);
  const top10List = filterList(rawTop10);
  const trendingList = filterList(rawTrending);
  const tamilList = filterList(rawTamil);
  const animeList = filterList(rawAnime);
  const romanceList = filterList(rawRomance);
  const myListMovies = filterList(ALL_MOVIES.filter(m => myListIds.includes(m.id)));

  // Carousel scroll helper
  const handleScrollRow = (trackId, direction) => {
    const el = document.getElementById(trackId);
    if (el) {
      const amount = el.clientWidth * 0.75;
      el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="browse-body" style={{ minHeight: '100vh', background: '#141414', color: '#fff', position: 'relative' }}>
      
      {/* ─── BROWSE NAVBAR ─── */}
      <header className="browse-nav" id="browseNav">
        <div className="browse-nav-left">
          <Link to="/browse" className="browse-logo-link" aria-label="NEXTFLIX Home">
            <img src="/images/nextflix-logo.png" alt="NEXTFLIX" className="browse-logo-img" />
          </Link>
          
          <ul className="browse-nav-menu">
            <li className="browse-nav-item">
              <a href="#home" className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</a>
            </li>
            <li className="browse-nav-item">
              <a href="#blockbusters" className={activeTab === 'blockbusters' ? 'active' : ''} onClick={() => setActiveTab('blockbusters')}>Blockbusters</a>
            </li>
            <li className="browse-nav-item">
              <a href="#trending" className={activeTab === 'trending' ? 'active' : ''} onClick={() => setActiveTab('trending')}>Trending</a>
            </li>
            <li className="browse-nav-item">
              <a href="#tamil" className={activeTab === 'tamil' ? 'active' : ''} onClick={() => setActiveTab('tamil')}>Tamil Hits</a>
            </li>
            <li className="browse-nav-item">
              <a href="#top10" className={activeTab === 'top10' ? 'active' : ''} onClick={() => setActiveTab('top10')}>Top 10</a>
            </li>
            <li className="browse-nav-item">
              <a href="#mylist" className={activeTab === 'mylist' ? 'active' : ''} onClick={() => setActiveTab('mylist')}>My List</a>
            </li>
          </ul>
        </div>

        <div className="browse-nav-right">
          {/* Search Box */}
          <div className="browse-search-wrap">
            <div className="browse-search-box active" id="searchBox">
              <button className="browse-search-btn" aria-label="Search titles">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <input 
                type="search" 
                className="browse-search-input" 
                placeholder="Titles, genres..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off" 
              />
            </div>
          </div>

          {/* Admin Studio shortcut */}
          <Link 
            to="/admin" 
            style={{ 
              color: '#fff', 
              fontSize: '0.8rem', 
              textDecoration: 'none', 
              padding: '6px 14px', 
              borderRadius: '4px', 
              background: 'rgba(255,255,255,0.08)', 
              border: '1px solid rgba(255,255,255,0.2)',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            Admin Studio
          </Link>

          {/* Profile Dropdown */}
          <div className="browse-profile-container" style={{ position: 'relative' }}>
            <button 
              className="browse-profile-btn" 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              aria-expanded={profileDropdownOpen} 
              aria-label="User profile menu"
            >
              <div className="browse-avatar-box" id="navAvatar">
                {activeProfile.initial}
              </div>
              <span className="browse-caret"></span>
            </button>

            {profileDropdownOpen && (
              <div className="browse-profile-dropdown" style={{ display: 'block', position: 'absolute', right: 0, top: '48px', zIndex: 100 }}>
                <div className="dropdown-user-info">
                  <div className="dropdown-user-name">{activeProfile.name}</div>
                  <div className="dropdown-user-email">{user?.username || 'Member'}</div>
                </div>
                
                <button 
                  className="dropdown-item" 
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowProfileOverlay(true);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <span>Switch Profile</span>
                </button>

                <Link to="/admin" className="dropdown-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                  </svg>
                  <span>Admin Studio</span>
                </Link>

                <Link to="/" className="dropdown-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                  <span>Landing Page</span>
                </Link>

                <div className="dropdown-divider"></div>

                <button 
                  className="dropdown-item signout-item" 
                  onClick={() => {
                    logout();
                    navigate('/signup');
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <span>Sign Out of NEXTFLIX</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── HERO FEATURE BANNER WITH REUSABLE BACKGROUND VIDEO ─── */}
      <section className="browse-hero" id="heroSection" style={{ position: 'relative', overflow: 'hidden' }}>
        <BackgroundVideo 
          src="/images/gemini_generated_video_35d56ebe.mp4" 
          poster="/images/hero-bg.jpg"
          overlayOpacity={0.6}
        />

        <div className="browse-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="browse-badge">
            <span className="browse-badge-n">N</span>
            <span>Featured Title</span>
          </div>
          <h1 className="browse-hero-title">{heroMovie.title.toUpperCase()}</h1>
          <p className="browse-hero-desc">{heroMovie.desc}</p>

          <div className="browse-hero-actions">
            <button 
              className="btn-hero-play" 
              onClick={() => handleMovieClick(heroMovie)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Play</span>
            </button>

            <button 
              className="btn-hero-info" 
              onClick={() => setSelectedModalMovie(heroMovie)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>More Info</span>
            </button>
          </div>
        </div>

        <div className="browse-hero-controls" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-maturity-badge">{heroMovie.rating}</div>
        </div>
      </section>

      {/* ─── CONTENT ROWS ─── */}
      <main className="browse-content" id="browseContent" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* ROW 1: BLOCKBUSTERS (THE 6 PLAYABLE TITLES WITH CLEAN NATIVE ARTWORK) */}
        <section className="content-row" id="blockbusters">
          <div className="row-header">
            <h2 className="row-title">Blockbuster Hits</h2>
          </div>
          <div className="carousel-viewport-wrap">
            <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackBlockbusters', 'left')} aria-label="Previous titles">&#8249;</button>
            <div className="carousel-row-track" id="trackBlockbusters">
              {blockbusterMovies.map((movie) => {
                const inList = myListIds.includes(movie.id);
                return (
                  <div 
                    key={movie.id} 
                    className="content-card" 
                    onClick={() => handleMovieClick(movie)}
                    tabIndex={0}
                  >
                    <div className="card-media">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                      <div className="card-media-title">{movie.title}</div>
                    </div>
                    <div className="card-hover-panel">
                      <div className="card-actions-row">
                        <button 
                          className="card-icon-btn btn-play-quick" 
                          onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                          title="Play"
                        >
                          ▶
                        </button>
                        <button 
                          className="card-icon-btn" 
                          onClick={(e) => toggleMyList(movie.id, e)} 
                          title={inList ? 'Remove from My List' : 'Add to My List'}
                        >
                          {inList ? '✓' : '+'}
                        </button>
                        <button 
                          className="card-icon-btn btn-more-quick" 
                          onClick={(e) => { e.stopPropagation(); setSelectedModalMovie(movie); }} 
                          title="More info"
                        >
                          ⌄
                        </button>
                      </div>
                      <div className="card-meta-row">
                        <span className="card-match">{movie.match}% Match</span>
                        <span className="card-maturity">{movie.rating}</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="card-tags-row">
                        <span>{movie.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackBlockbusters', 'right')} aria-label="Next titles">&#8250;</button>
          </div>
        </section>

        {/* ROW 2: TOP 10 MOVIES TODAY (RANKED CARDS) */}
        <section className="content-row top10-row" id="top10">
          <div className="row-header">
            <h2 className="row-title">Top 10 Movies in India Today</h2>
          </div>
          <div className="carousel-viewport-wrap">
            <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackTop10', 'left')} aria-label="Previous titles">&#8249;</button>
            <div className="carousel-row-track" id="trackTop10">
              {top10List.map((movie, index) => {
                const inList = myListIds.includes(movie.id);
                return (
                  <div 
                    key={movie.id} 
                    className="content-card top10-card" 
                    onClick={() => handleMovieClick(movie)}
                    tabIndex={0}
                  >
                    <div className={`card-num ${index + 1 === 10 ? 'card-num--10' : ''}`} data-content={index + 1}>
                      {index + 1}
                    </div>
                    <div className="card-media">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                      <div className="card-media-title">{movie.title}</div>
                    </div>
                    <div className="card-hover-panel">
                      <div className="card-actions-row">
                        <button 
                          className="card-icon-btn btn-play-quick" 
                          onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                          title="Play"
                        >
                          ▶
                        </button>
                        <button 
                          className="card-icon-btn" 
                          onClick={(e) => toggleMyList(movie.id, e)} 
                          title={inList ? 'Remove from My List' : 'Add to My List'}
                        >
                          {inList ? '✓' : '+'}
                        </button>
                        <button 
                          className="card-icon-btn btn-more-quick" 
                          onClick={(e) => { e.stopPropagation(); setSelectedModalMovie(movie); }} 
                          title="More info"
                        >
                          ⌄
                        </button>
                      </div>
                      <div className="card-meta-row">
                        <span className="card-match">{movie.match}% Match</span>
                        <span className="card-maturity">{movie.rating}</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="card-tags-row">
                        <span>{movie.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackTop10', 'right')} aria-label="Next titles">&#8250;</button>
          </div>
        </section>

        {/* ROW 3: TRENDING NOW */}
        <section className="content-row" id="trending">
          <div className="row-header">
            <h2 className="row-title">Trending Now</h2>
          </div>
          <div className="carousel-viewport-wrap">
            <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackTrending', 'left')} aria-label="Previous titles">&#8249;</button>
            <div className="carousel-row-track" id="trackTrending">
              {trendingList.map((movie) => {
                const inList = myListIds.includes(movie.id);
                return (
                  <div 
                    key={movie.id} 
                    className="content-card" 
                    onClick={() => handleMovieClick(movie)}
                    tabIndex={0}
                  >
                    <div className="card-media">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                      <div className="card-media-title">{movie.title}</div>
                    </div>
                    <div className="card-hover-panel">
                      <div className="card-actions-row">
                        <button 
                          className="card-icon-btn btn-play-quick" 
                          onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                          title="Play"
                        >
                          ▶
                        </button>
                        <button 
                          className="card-icon-btn" 
                          onClick={(e) => toggleMyList(movie.id, e)} 
                          title={inList ? 'Remove from My List' : 'Add to My List'}
                        >
                          {inList ? '✓' : '+'}
                        </button>
                        <button 
                          className="card-icon-btn btn-more-quick" 
                          onClick={(e) => { e.stopPropagation(); setSelectedModalMovie(movie); }} 
                          title="More info"
                        >
                          ⌄
                        </button>
                      </div>
                      <div className="card-meta-row">
                        <span className="card-match">{movie.match}% Match</span>
                        <span className="card-maturity">{movie.rating}</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="card-tags-row">
                        <span>{movie.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackTrending', 'right')} aria-label="Next titles">&#8250;</button>
          </div>
        </section>

        {/* ROW 4: KOLLYWOOD & TAMIL CINEMA HITS */}
        {tamilList.length > 0 && (
          <section className="content-row" id="tamil">
            <div className="row-header">
              <h2 className="row-title">Kollywood &amp; Tamil Cinema Hits</h2>
            </div>
            <div className="carousel-viewport-wrap">
              <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackTamil', 'left')} aria-label="Previous titles">&#8249;</button>
              <div className="carousel-row-track" id="trackTamil">
                {tamilList.map((movie) => {
                  const inList = myListIds.includes(movie.id);
                  return (
                    <div 
                      key={movie.id} 
                      className="content-card" 
                      onClick={() => handleMovieClick(movie)}
                      tabIndex={0}
                    >
                      <div className="card-media">
                        <img src={movie.poster} alt={movie.title} loading="lazy" />
                        <div className="card-media-title">{movie.title}</div>
                      </div>
                      <div className="card-hover-panel">
                        <div className="card-actions-row">
                          <button 
                            className="card-icon-btn btn-play-quick" 
                            onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                            title="Play"
                          >
                            ▶
                          </button>
                          <button 
                            className="card-icon-btn" 
                            onClick={(e) => toggleMyList(movie.id, e)} 
                            title={inList ? 'Remove from My List' : 'Add to My List'}
                          >
                            {inList ? '✓' : '+'}
                          </button>
                          <button 
                            className="card-icon-btn btn-more-quick" 
                            onClick={(e) => { e.stopPropagation(); setSelectedModalMovie(movie); }} 
                            title="More info"
                          >
                            ⌄
                          </button>
                        </div>
                        <div className="card-meta-row">
                          <span className="card-match">{movie.match}% Match</span>
                          <span className="card-maturity">{movie.rating}</span>
                          <span>{movie.duration}</span>
                        </div>
                        <div className="card-tags-row">
                          <span>{movie.category}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackTamil', 'right')} aria-label="Next titles">&#8250;</button>
            </div>
          </section>
        )}

        {/* ROW 5: ANIME MASTERPIECES */}
        {animeList.length > 0 && (
          <section className="content-row" id="anime">
            <div className="row-header">
              <h2 className="row-title">Acclaimed Anime Masterpieces</h2>
            </div>
            <div className="carousel-viewport-wrap">
              <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackAnime', 'left')} aria-label="Previous titles">&#8249;</button>
              <div className="carousel-row-track" id="trackAnime">
                {animeList.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="content-card" 
                    onClick={() => handleMovieClick(movie)}
                    tabIndex={0}
                  >
                    <div className="card-media">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                      <div className="card-media-title">{movie.title}</div>
                    </div>
                    <div className="card-hover-panel">
                      <div className="card-actions-row">
                        <button 
                          className="card-icon-btn btn-play-quick" 
                          onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                        >
                          ▶
                        </button>
                        <button 
                          className="card-icon-btn btn-more-quick" 
                          onClick={(e) => { e.stopPropagation(); setSelectedModalMovie(movie); }}
                        >
                          ⌄
                        </button>
                      </div>
                      <div className="card-meta-row">
                        <span className="card-match">{movie.match}% Match</span>
                        <span className="card-maturity">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackAnime', 'right')} aria-label="Next titles">&#8250;</button>
            </div>
          </section>
        )}

        {/* ROW 5: ROMANCE & DRAMA */}
        {romanceList.length > 0 && (
          <section className="content-row" id="romance">
            <div className="row-header">
              <h2 className="row-title">Heartfelt Romance &amp; Drama</h2>
            </div>
            <div className="carousel-viewport-wrap">
              <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackRomance', 'left')} aria-label="Previous titles">&#8249;</button>
              <div className="carousel-row-track" id="trackRomance">
                {romanceList.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="content-card" 
                    onClick={() => handleMovieClick(movie)}
                    tabIndex={0}
                  >
                    <div className="card-media">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                      <div className="card-media-title">{movie.title}</div>
                    </div>
                    <div className="card-hover-panel">
                      <div className="card-actions-row">
                        <button 
                          className="card-icon-btn btn-play-quick" 
                          onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                        >
                          ▶
                        </button>
                        <button 
                          className="card-icon-btn btn-more-quick" 
                          onClick={(e) => { e.stopPropagation(); setSelectedModalMovie(movie); }}
                        >
                          ⌄
                        </button>
                      </div>
                      <div className="card-meta-row">
                        <span className="card-match">{movie.match}% Match</span>
                        <span className="card-maturity">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackRomance', 'right')} aria-label="Next titles">&#8250;</button>
            </div>
          </section>
        )}

        {/* ROW 6: MY LIST */}
        {myListMovies.length > 0 && (
          <section className="content-row" id="mylist">
            <div className="row-header">
              <h2 className="row-title">My List</h2>
            </div>
            <div className="carousel-viewport-wrap">
              <button className="row-arrow-btn arrow-left" onClick={() => handleScrollRow('trackMyList', 'left')} aria-label="Previous titles">&#8249;</button>
              <div className="carousel-row-track" id="trackMyList">
                {myListMovies.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="content-card" 
                    onClick={() => handleMovieClick(movie)}
                    tabIndex={0}
                  >
                    <div className="card-media">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                      <div className="card-media-title">{movie.title}</div>
                    </div>
                    <div className="card-hover-panel">
                      <div className="card-actions-row">
                        <button 
                          className="card-icon-btn btn-play-quick" 
                          onClick={(e) => { e.stopPropagation(); handleMovieClick(movie); }}
                        >
                          ▶
                        </button>
                        <button 
                          className="card-icon-btn" 
                          onClick={(e) => toggleMyList(movie.id, e)}
                        >
                          ✓
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="row-arrow-btn arrow-right" onClick={() => handleScrollRow('trackMyList', 'right')} aria-label="Next titles">&#8250;</button>
            </div>
          </section>
        )}

      </main>

      {/* ─── SITE FOOTER ─── */}
      <footer className="site-footer" style={{ borderTop: '1px solid #222', marginTop: '4rem', position: 'relative', zIndex: 2 }}>
        <div className="footer-inner">
          <p className="footer-call">Questions? Call <a href="tel:000-800-919-1743" className="footer-phone">000-800-919-1743</a></p>
          <ul className="footer-links-grid">
            <li><a href="#home">Audio Description</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Media Center</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Legal Notices</a></li>
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
          <p className="footer-country">&copy; NEXTFLIX India. Watch TV Shows Online, Watch Movies Online.</p>
        </div>
      </footer>

      {/* ─── MOVIE DETAILS MODAL ─── */}
      {selectedModalMovie && (
        <div className="modal-backdrop open" style={{ display: 'flex', zIndex: 200 }}>
          <div className="modal-dialog">
            <button className="modal-close-btn" onClick={() => setSelectedModalMovie(null)}>
              ✕
            </button>
            
            <div className="modal-header-banner">
              <img src={selectedModalMovie.poster} alt={selectedModalMovie.title} className="modal-banner-img" />
              <div className="modal-banner-overlay"></div>
              <div className="modal-title-wrap">
                <h2 className="modal-title">{selectedModalMovie.title}</h2>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-tags">
                <span className="tag">{selectedModalMovie.year}</span>
                <span className="tag">{selectedModalMovie.rating}</span>
                <span className="tag">{selectedModalMovie.duration || 'Feature Film'}</span>
                <span className="tag">{selectedModalMovie.category}</span>
              </div>
              
              <p className="modal-desc">{selectedModalMovie.desc}</p>

              <div className="modal-action">
                <button 
                  className="btn btn-cta" 
                  onClick={() => handleMovieClick(selectedModalMovie)}
                >
                  <span>▶ Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── PROFILES OVERLAY ─── */}
      {showProfileOverlay && (
        <section className="profiles-overlay open" style={{ display: 'flex', zIndex: 300 }}>
          <div className="profiles-top-bar">
            <Link to="/browse" className="browse-logo-link">
              <img src="/images/nextflix-logo.png" alt="NEXTFLIX" className="browse-logo-img" />
            </Link>
            <button 
              type="button" 
              onClick={() => setShowProfileOverlay(false)} 
              style={{ background: 'none', border: '1px solid #777', color: '#fff', borderRadius: '4px', padding: '6px 14px', cursor: 'pointer' }}
            >
              Done
            </button>
          </div>

          <div className="profiles-content-center">
            <h1 className="profiles-heading">Who's watching?</h1>
            <div className="profiles-grid">
              {profiles.map(p => (
                <div key={p.id} className="profile-item-wrap">
                  <button 
                    className="profile-avatar-btn" 
                    onClick={() => {
                      setActiveProfile(p);
                      setShowProfileOverlay(false);
                    }}
                  >
                    <div className={`profile-avatar-box-lg ${p.tone}`}>{p.initial}</div>
                    <span>{p.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
