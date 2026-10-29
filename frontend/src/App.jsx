import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import WatchPage from './pages/WatchPage';
import DatabaseNotConnectedPage from './pages/DatabaseNotConnectedPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing / Entry routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/index.html" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />

          {/* Authentication routes */}
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/signup.html" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* User Dashboard / Browse routes */}
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/browse.html" element={<BrowsePage />} />
          <Route path="/home" element={<BrowsePage />} />
          <Route path="/home.html" element={<BrowsePage />} />

          {/* Video Player route */}
          <Route path="/watch/:movieId" element={<WatchPage />} />

          {/* Database Not Connected fallback route */}
          <Route path="/database-not-connected" element={<DatabaseNotConnectedPage />} />

          {/* Admin Studio routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin.html" element={<AdminPage />} />

          {/* Fallback to browse */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
