import {RestClient} from '../lib';
import {LocalStorage} from '../utils';

class UserService {
  client: RestClient;
  path: string;
  constructor() {
    this.client = new RestClient();
    this.path = '/users';
  }

  async getUserDetails(id?: string) {
    return id ? {id: id, username: 'johndoe', name: 'John Doe'} : null;
  }

  async login(values: {username: string; password: string}) {
    try {
      await LocalStorage.save('auth.credentials', JSON.stringify(values));
      return this.getMe();
    } catch (err) {
      return {
        data: null,
        error: err?.message,
      };
    }
  }

  async logout() {
    try {
      await LocalStorage.delete('auth.credentials');
      await LocalStorage.delete('auth.credentials.details');
      return true;
    } catch (err) {
      return false;
    }
  }

  async getMe() {
    try {
      const res = await this.client.get(
        '/lbp/mobile-app/rest-service/v1.0/ep/node.json/?parameters[type]=account',
      );
      if (!res) {
        throw new Error('Invalid credentials');
      }
      if (res[0]?.nid) {
        const userDetails = await this.client.get(
          `/lbp/mobile-app/rest-service/v1.0/ep/node/${res[0]?.nid}.json`,
        );
        await LocalStorage.save(
          'auth.credentials.details',
          JSON.stringify(userDetails),
        );
        return {
          data: userDetails,
        };
      }
    } catch (err) {
      return {
        data: null,
        error: err?.message,
      };
    }
  }

  async get() {
    // this.client.get(this.path,)
    // .then((data)=> {

    // })
    return null;
  }
}
const userService = new UserService();
export default userService;
