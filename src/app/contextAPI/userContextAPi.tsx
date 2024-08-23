'use client'

import React, { createContext, useState, ReactNode } from 'react';



const UserContext = createContext(0);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser}}>
        {children }
      </UserContext.Provider>
    </>
  );
};

export default UserContext;
