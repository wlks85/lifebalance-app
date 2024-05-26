import React from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';

const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
