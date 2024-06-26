import React, {createContext, useContext} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import axios from 'axios';

const AxiosContext = createContext(null);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const storage = useAsyncStorage('auth.credentials');

  const axiosClient = axios.create({
    baseURL: 'https://w3.lbplus.de',
  });

  axiosClient.interceptors.request.use(
    async config => {
      try {
        const response = (await storage.getItem()) as any;
        const parsedResponse = JSON.parse(response || "{}");
        const credentialsText = `${parsedResponse.username}:${parsedResponse.password}`;
        if (!config.headers.Authorization) {
            config.headers.Authorization = `Basic ${base64.encode(
            credentialsText,
            )}`;
        }
      } catch (error) {
        console.log(error);
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        axiosClient,
      }}>
      {children}
    </Provider>
  );
};

export default AxiosProvider;

export function useAxios() {
  const res = useContext(AxiosContext);
  if (!res) {
    throw new Error('Components needs to be wrapped With AxiosProvider');
  }
  return res.axiosClient;
}
