import React, { useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_MOVIES, isMovieAllowlisted, shuffleWithSeed } from '../data/moviesData';
import BackgroundVideo from '../components/BackgroundVideo';

export default function LandingPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroError, setHeroError] = useState('');
  const [faqEmail, setFaqEmail] = useState('');
  const [faqError, setFaqError] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleEmailSubmit = (email, setError, e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    navigate(`/signup?email=${encodeURIComponent(cleanEmail)}`);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openMovieModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieModal = () => {
    setSelectedMovie(null);
  };

  const handleModalPlay = () => {
    if (!selectedMovie) return;
    if (isMovieAllowlisted(selectedMovie.id)) {
      navigate(`/watch/${selectedMovie.id}`);
    } else {
      navigate('/database-not-connected');
    }
  };

  // Stable session seed for Landing Trending Carousel
  const sessionSeed = useMemo(() => {
    try {
      let seed = sessionStorage.getItem('nextflix_landing_seed');
      if (!seed) {
        seed = String(Math.floor(Math.random() * 900000) + 100000);
        sessionStorage.setItem('nextflix_landing_seed', seed);
      }
      return parseInt(seed, 10);
    } catch {
      return 654321;
    }
  }, []);

  // Top 10 movies for Trending Carousel with session-stable varied order
  const top10Movies = useMemo(() => {
    const pool = shuffleWithSeed(ALL_MOVIES, sessionSeed);
    return pool.slice(0, 10);
  }, [sessionSeed]);

  const faqData = [
    {
      q: 'What is Netflix?',
      a: [
        'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
        "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
      ]
    },
    {
      q: 'How much does Netflix cost?',
      a: [
        'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649/month (pre-tax).'
      ]
    },
    {
      q: 'Where can I watch?',
      a: [
        'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
        'You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you’re on the go and without an internet connection. Take Netflix with you anywhere.'
      ]
    },
    {
      q: 'How do I cancel?',
      a: [
        'Netflix is flexible. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
      ]
    },
    {
      q: 'What can I watch on Netflix?',
      a: [
        'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.'
      ]
    },
    {
      q: 'Is Netflix good for kids?',
      a: [
        'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.',
        'Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.'
      ]
    }
  ];

  return (
    <div className="landing-page-root">
      {/* ─── SITE HEADER ─── */}
      <header className="site-header" id="siteHeader">
        <div className="header-inner">
          <Link to="/" className="logo-link" aria-label="NEXTFLIX Home">
            <img src="/images/nextflix-logo.png" alt="NEXTFLIX" className="logo-img" />
          </Link>
          <div className="header-right">
            <div className="lang-picker-wrapper">
              <svg className="globe-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m5.93 5H10.8a12.7 12.7 0 0 0-1.39-3.72A6.98 6.98 0 0 1 13.93 5M8 1.05c.87 1.07 1.56 2.45 1.94 3.95H6.06c.38-1.5 1.07-2.88 1.94-3.95M1.32 9.5a7.03 7.03 0 0 1 0-3h3.36c-.08 1-.08 2 0 3zm.75 1.5h3.13a12.7 12.7 0 0 0 1.39 3.72A7 7 0 0 1 2.07 11M5.2 5H2.07a7 7 0 0 1 4.52-3.72A12.7 12.7 0 0 0 5.2 5m2.8 9.95c-.87-1.07-1.56-2.45-1.94-3.95h3.88c-.38 1.5-1.07 2.88-1.94 3.95M6.06 9.5c-.08-.98-.08-2.02 0-3h3.88c.08.98.08 2.02 0 3zm4.53 4.22c.62-1.08 1.1-2.33 1.39-3.72h3.13a7 7 0 0 1-4.52 3.72M11.32 9.5c.08-1 .08-2 0-3h3.36a7.03 7.03 0 0 1 0 3z"/>
              </svg>
              <select 
                className="lang-select" 
                aria-label="Language selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
              </select>
              <svg className="chevron-icon" viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
                <path d="M3 6l5 5 5-5z"/>
              </svg>
            </div>
            <Link to="/signup" className="btn btn-signin" id="headerSignInBtn">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION WITH REUSABLE BACKGROUND VIDEO ─── */}
      <section className="hero-section" id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <BackgroundVideo 
          src="/images/gemini_generated_video_35d56ebe.mp4" 
          poster="/images/hero-bg.jpg"
          overlayOpacity={0.65}
        />

        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="hero-headline">Unlimited movies, TV shows, and more</h1>
          <p className="hero-subheadline">Starts at ₹149. Cancel anytime.</p>
          
          <div className="cta-form-container">
            <h3 className="cta-label">Ready to watch? Enter your email to create or restart your membership.</h3>
            <form className="email-form" id="heroForm" onSubmit={(e) => handleEmailSubmit(heroEmail, setHeroError, e)} noValidate>
              <div className="email-input-group">
                <div className="floating-input-wrap">
                  <input 
                    type="email" 
                    id="heroEmail" 
                    className={`floating-input ${heroError ? 'has-error' : ''}`}
                    placeholder=" " 
                    value={heroEmail}
                    onChange={(e) => {
                      setHeroEmail(e.target.value);
                      if (heroError) setHeroError('');
                    }}
                    autoComplete="email" 
                  />
                  <label htmlFor="heroEmail" className="floating-label">Email address</label>
                  {heroError && <div className="input-error-msg" id="heroError">{heroError}</div>}
                </div>
                <button type="submit" className="btn btn-cta">
                  <span>Get Started</span>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" className="cta-arrow" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="m15.586 12-7.293 7.293 1.414 1.414 8-8a1 1 0 0 0 0-1.414l-8-8-1.414 1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Netflix Curved Bottom Arc */}
        <div className="curve-container">
          <div className="curve-arc"></div>
        </div>
      </section>

      {/* ─── TRENDING NOW ─── */}
      <section className="section trending-section" id="trending">
        <div className="section-inner">
          <h2 className="section-title">Trending Now</h2>
          
          <div className="carousel-container">
            <button className="carousel-nav-btn prev-btn" onClick={() => scrollCarousel('prev')} aria-label="Scroll backward">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>

            <div className="carousel-viewport" id="carouselViewport" ref={carouselRef}>
              <div className="carousel-track" id="carouselTrack">
                {top10Movies.map((movie, index) => (
                  <div 
                    key={movie.id} 
                    className="top10-card" 
                    data-index={index + 1}
                    onClick={() => openMovieModal(movie)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={`card-num ${index + 1 === 10 ? 'card-num--10' : ''}`} data-content={index + 1}>
                      {index + 1}
                    </div>
                    <div className="card-poster">
                      <img src={movie.poster} alt={movie.title} loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-nav-btn next-btn" onClick={() => scrollCarousel('next')} aria-label="Scroll forward">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ─── MORE REASONS TO JOIN ─── */}
      <section className="section reasons-section" id="reasons">
        <div className="section-inner">
          <h2 className="section-title">More reasons to join</h2>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-body">
                <h3 className="reason-heading">Enjoy on your TV</h3>
                <p className="reason-desc">Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
              </div>
              <div className="reason-icon-wrap">
                <img src="/images/reason-tv.png" alt="Smart TV Icon" className="reason-icon" />
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-body">
                <h3 className="reason-heading">Download your shows to watch offline</h3>
                <p className="reason-desc">Save your favourites easily and always have something to watch.</p>
              </div>
              <div className="reason-icon-wrap">
                <img src="/images/reason-download.png" alt="Download Icon" className="reason-icon" />
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-body">
                <h3 className="reason-heading">Watch everywhere</h3>
                <p className="reason-desc">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
              </div>
              <div className="reason-icon-wrap">
                <img src="/images/reason-watch.png" alt="Watch Everywhere Icon" className="reason-icon" />
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-body">
                <h3 className="reason-heading">Create profiles for kids</h3>
                <p className="reason-desc">Send kids on adventures with their favourite characters in a space made just for them — free with your membership.</p>
              </div>
              <div className="reason-icon-wrap">
                <img src="/images/reason-kids.png" alt="Kids Profiles Icon" className="reason-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="section faq-section" id="faq">
        <div className="section-inner">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          
          <div className="faq-accordion-list">
            {faqData.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="faq-item">
                  <button 
                    className="faq-question-btn" 
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{item.q}</span>
                    <svg className="faq-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={isOpen ? "M4 12h16" : "M12 4v16m-8-8h16"} />
                    </svg>
                  </button>
                  <div 
                    className="faq-answer-panel"
                    style={{ maxHeight: isOpen ? '400px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}
                  >
                    <div className="faq-answer-content">
                      {item.a.map((p, pIndex) => (
                        <p key={pIndex}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second CTA Form */}
          <div className="cta-form-container cta-form-container--faq">
            <h3 className="cta-label">Ready to watch? Enter your email to create or restart your membership.</h3>
            <form className="email-form" id="faqForm" onSubmit={(e) => handleEmailSubmit(faqEmail, setFaqError, e)} noValidate>
              <div className="email-input-group">
                <div className="floating-input-wrap">
                  <input 
                    type="email" 
                    id="faqEmail" 
                    className={`floating-input ${faqError ? 'has-error' : ''}`}
                    placeholder=" " 
                    value={faqEmail}
                    onChange={(e) => {
                      setFaqEmail(e.target.value);
                      if (faqError) setFaqError('');
                    }}
                    autoComplete="email" 
                  />
                  <label htmlFor="faqEmail" className="floating-label">Email address</label>
                  {faqError && <div className="input-error-msg" id="faqError">{faqError}</div>}
                </div>
                <button type="submit" className="btn btn-cta">
                  <span>Get Started</span>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" className="cta-arrow" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="m15.586 12-7.293 7.293 1.414 1.414 8-8a1 1 0 0 0 0-1.414l-8-8-1.414 1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── SITE FOOTER ─── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-call">Questions? Call <a href="tel:000-800-919-1743" className="footer-phone">000-800-919-1743</a></p>
          
          <ul className="footer-links-grid">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Account</a></li>
            <li><a href="#">Media Center</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Ways to Watch</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Cookie Preferences</a></li>
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Speed Test</a></li>
            <li><a href="#">Legal Notices</a></li>
            <li><a href="#">Only on NEXTFLIX</a></li>
          </ul>

          <div className="footer-lang-wrap">
            <div className="lang-picker-wrapper lang-picker-wrapper--footer">
              <svg className="globe-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m5.93 5H10.8a12.7 12.7 0 0 0-1.39-3.72A6.98 6.98 0 0 1 13.93 5M8 1.05c.87 1.07 1.56 2.45 1.94 3.95H6.06c.38-1.5 1.07-2.88 1.94-3.95M1.32 9.5a7.03 7.03 0 0 1 0-3h3.36c-.08 1-.08 2 0 3zm.75 1.5h3.13a12.7 12.7 0 0 0 1.39 3.72A7 7 0 0 1 2.07 11M5.2 5H2.07a7 7 0 0 1 4.52-3.72A12.7 12.7 0 0 0 5.2 5m2.8 9.95c-.87-1.07-1.56-2.45-1.94-3.95h3.88c-.38 1.5-1.07 2.88-1.94 3.95M6.06 9.5c-.08-.98-.08-2.02 0-3h3.88c.08.98.08 2.02 0 3zm4.53 4.22c.62-1.08 1.1-2.33 1.39-3.72h3.13a7 7 0 0 1-4.52 3.72M11.32 9.5c.08-1 .08-2 0-3h3.36a7.03 7.03 0 0 1 0 3z"/>
              </svg>
              <select 
                className="lang-select" 
                aria-label="Footer language selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
              </select>
              <svg className="chevron-icon" viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
                <path d="M3 6l5 5 5-5z"/>
              </svg>
            </div>
          </div>

          <p className="footer-country">NEXTFLIX India</p>
        </div>
      </footer>

      {/* ─── MOVIE DETAILS MODAL ─── */}
      {selectedMovie && (
        <div className="modal-backdrop open" id="movieModal" aria-hidden="false">
          <div className="modal-dialog" role="dialog" aria-modal="true">
            <button className="modal-close-btn" onClick={closeMovieModal} aria-label="Close modal">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <div className="modal-header-banner">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="modal-banner-img" />
              <div className="modal-banner-overlay"></div>
              <div className="modal-title-wrap">
                <h2 className="modal-title">{selectedMovie.title}</h2>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-tags">
                <span className="tag">{selectedMovie.year}</span>
                <span className="tag">{selectedMovie.rating}</span>
                <span className="tag">{selectedMovie.duration || 'Movie'}</span>
                <span className="tag">{selectedMovie.category}</span>
              </div>
              
              <p className="modal-desc">{selectedMovie.desc}</p>

              <div className="modal-action">
                <button className="btn btn-cta" onClick={handleModalPlay}>
                  <span>▶ Play</span>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" className="cta-arrow" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="m15.586 12-7.293 7.293 1.414 1.414 8-8a1 1 0 0 0 0-1.414l-8-8-1.414 1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
