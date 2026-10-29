import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nextflix_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('nextflix_token') || sessionStorage.getItem('nextflix_token') || '';
  });

  const [loading, setLoading] = useState(true);

  // Verify session on initial load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/session', {
          headers: { 'x-token': token }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('nextflix_user', JSON.stringify(data.user));
          }
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.warn('Backend session verification error:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (username, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Invalid credentials');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('nextflix_token', data.token);
    localStorage.setItem('nextflix_user', JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    try {
      if (token) {
        fetch('/api/logout', {
          method: 'POST',
          headers: { 'x-token': token }
        }).catch(() => {});
      }
    } catch {}

    setToken('');
    setUser(null);
    localStorage.removeItem('nextflix_token');
    localStorage.removeItem('nextflix_user');
    sessionStorage.removeItem('nextflix_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
