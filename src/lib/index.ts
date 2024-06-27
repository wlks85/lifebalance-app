import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import base64 from 'react-native-base64';
import {LocalStorage} from '../utils';
export * from './storage';

export interface Response {
  status: number;
  data: any;
}

abstract class BaseClient {
  constructor() {
    if (new.target === BaseClient) {
      throw new TypeError('Cannot construct BaseClient instances directly');
    }
  }

  abstract get(url: string, params?: Record<string, any>): Promise<any>;
  abstract post(url: string, data: any): Promise<any>;
}

const API_BASE_URL = 'https://w3.lbplus.de';
export class RestClient extends BaseClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL, // replace with your API base URL
      timeout: 10000,
      headers: {'Content-Type': 'application/json'},
    });

    this.axiosInstance.interceptors.request.use(
      async config => {
        try {
          const {data: response} = await LocalStorage.get('auth.credentials');
          const parsedResponse = JSON.parse(response || '');
          const credentialsText = `${parsedResponse.username}:${parsedResponse.password}`;
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Basic ${base64.encode(
              credentialsText,
            )}`;
          }
        } catch (error) {
          console.log(error);
        }

        const {data: csrfToken} = await axios.get(
          `${API_BASE_URL}/session/token`,
        );

        return {
          ...config,
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        } as unknown as InternalAxiosRequestConfig;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  async get(url: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(url, {
        params,
      });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  private _handleError(error: any): void {
    // Handle error as needed
    if (error.response) {
      console.error('Server responded with a status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
}
