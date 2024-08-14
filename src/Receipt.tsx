import React, {useEffect, useState} from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';
import AppLoginScreen from './screens/AuthScreen';
import Providers from './providers';
import {LocalStorage} from './utils';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // SplashScreen.hide();
    (async () => {
      const {data: userDetails} = await LocalStorage.get(
        'auth.credentials.details',
      );
      if (!userDetails) {
        return;
      }
      try {
        const data = JSON.parse(userDetails || '{}');
        setUser(data);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    LocalStorage.subscribe(({type}) => {
      if (type === 'delete') {
        setUser(null);
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <Providers user={user}>
          {user !== null ? (
            <AppNavigator />
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-shadow
            <AppLoginScreen onSubmit={user => setUser(user)} />
          )}
        </Providers>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
