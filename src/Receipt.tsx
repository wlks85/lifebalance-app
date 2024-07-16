import React, {useEffect, useState} from 'react';
import {AppProvider} from './context';
import AppNavigator from './navigation';
import {ThemeProvider} from './theme';
import AppLoginScreen from './screens/AuthScreen';
import {UserService} from './services';
import Providers from './providers';
import { LocalStorage } from './utils';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: userDetails } = await LocalStorage.get('auth.credentials.details');
      if (!userDetails) return;
      try {
        const data = JSON.parse(userDetails || "{}");
        setUser(data);
      } catch (err) {}
    })()
  }, [])

  useEffect(()=>{
    LocalStorage.subscribe(({type})=>{
      if(type === 'delete')setUser(null);
    })
  }, [])
  
  return (
    <ThemeProvider>
      <AppProvider>
        <Providers user={user}>
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
