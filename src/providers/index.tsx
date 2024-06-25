import React from 'react';
import {PropsWithChildren} from 'react';
import AuthProvider from './auth-provider';
import AxiosProvider from './axios-provider';

export default function Providers({children}: PropsWithChildren) {
  return (
    <AuthProvider>
      <AxiosProvider>{children}</AxiosProvider>
    </AuthProvider>
  );
}
