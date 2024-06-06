import React, {useEffect, useState} from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';
import AppLoginScreen from './screens/AuthScreen';
import {UserService} from './services';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  function fetchUserDetails(id?: string) {
    UserService.getUserDetails(id).then(data => {
      setUser(data);
    });
  }
  return (
    <ThemeProvider>
      <AppProvider>
        {user !== null ? (
          <AppNavigator />
        ) : (
          <AppLoginScreen onSubmit={() => fetchUserDetails('1')} />
        )}
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
