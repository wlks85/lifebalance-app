import React, {createContext, useContext, useState} from 'react';
import {AuxProps} from '../types';

interface User {
  name: string;
  balance: number;
  avatar?: string;
  location?: string;
}

export interface AppContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AuxProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{user, setUser}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
