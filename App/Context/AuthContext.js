// App/Context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Custom provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Any logic you need to handle authentication can be added here

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
