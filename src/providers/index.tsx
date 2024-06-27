import React from 'react';
import {PropsWithChildren} from 'react';
import AuthProvider from './auth-provider';

export default function Providers({children, user}: PropsWithChildren<{ user: any }>) {
  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  );
}
