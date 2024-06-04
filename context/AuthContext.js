import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setLoading(true)
    setUser(null);
    setToken(null);
    setLoading(false)
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading, setLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
