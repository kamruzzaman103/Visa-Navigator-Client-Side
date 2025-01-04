

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, loginWithGoogle, logout } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show the spinner while the authentication state is loading
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading h-full size-24 loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
