import React, { createContext, useState } from 'react';

export const URLContext = createContext();

export const URLProvider = ({ children }) => {
  const [url, setUrl] = useState('http://59b3-181-54-0-175.ngrok-free.app');

  return (
    <URLContext.Provider value={{ url, setUrl }}>
      {children}
    </URLContext.Provider>
  );
};





