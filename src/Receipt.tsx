import React from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';
import AppLoginScreen from './screens/Login';

const App = () => {
  const userLoggedIn = true;
  return (
    <ThemeProvider>
      <AppProvider>
        {userLoggedIn ? <AppNavigator /> : <AppLoginScreen />}
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
