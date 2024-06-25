import React, {useContext} from 'react';
import {PropsWithChildren, createContext, useState} from 'react';

const AuthContext = createContext(null);

export default function AuthProvider({children}: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userDetails,
        setUserDetails,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const res = useContext(AuthContext);
  if (!res) {
    throw new Error('Components needs to be wrapped With AuthProvider');
  }
  return res;
}
