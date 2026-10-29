import React, { useRef, useEffect, useState } from 'react';

export default function BackgroundVideo({ 
  src = '/images/gemini_generated_video_35d56ebe.mp4', 
  poster = '/images/hero-bg.jpg',
  className = '',
  overlayOpacity = 0.55
}) {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div 
      className={`app-background-video-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {!hasError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          onError={() => setHasError(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Dual directional gradients for cinematic contrast & readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at center, rgba(20,20,20,${overlayOpacity * 0.4}) 0%, rgba(20,20,20,${overlayOpacity * 0.95}) 100%)`,
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(20,20,20,0.7) 0%, transparent 40%, rgba(20,20,20,0.85) 85%, #141414 100%)',
        }}
      />
    </div>
  );
}
