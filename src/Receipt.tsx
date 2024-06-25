import React, {useEffect, useState} from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';
import AppLoginScreen from './screens/AuthScreen';
import {UserService} from './services';
import Providers from './providers';

const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <ThemeProvider>
      <AppProvider>
        <Providers>
          {user !== null ? (
            <AppNavigator />
          ) : (
            <AppLoginScreen onSubmit={(user) => setUser(user)} />
          )}
        </Providers>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
