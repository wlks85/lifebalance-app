import axios, {AxiosInstance, AxiosResponse} from 'axios';

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

export class RestClient extends BaseClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: 'https://api.example.com', // replace with your API base URL
      timeout: 10000,
      headers: {'Content-Type': 'application/json'},
    });
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
