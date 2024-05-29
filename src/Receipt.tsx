import React, {useEffect, useState} from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';
import AppLoginScreen from './screens/Login';
import {UserService} from './services';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    UserService.getUserDetails('1').then(data => {
      setUser(data);
    });
  }, []);
  return (
    <ThemeProvider>
      <AppProvider>
        {user !== null ? <AppNavigator /> : <AppLoginScreen />}
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
