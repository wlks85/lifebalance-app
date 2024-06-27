import React, {useContext, useEffect} from 'react';
import {PropsWithChildren, createContext, useState} from 'react';

const AuthContext = createContext(null);

export default function AuthProvider({children, user}: PropsWithChildren<{ user: any }>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  
  useEffect(() => {
    setUserDetails(user);
  }, [user])

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
