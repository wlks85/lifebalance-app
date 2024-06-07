import {RestClient} from '../lib';

class UserService {
  client: RestClient;
  path: string;
  constructor() {
    this.client = new RestClient();
    this.path = '/users';
  }

  async getUserDetails(id?: string) {
    // this.client.get(this.path,)
    // .then((data)=> {

    // })
    return id ? {id: id, username: 'johndoe', name: 'John Doe'} : null;
  }

  async register(values: unknown) {
    // this.client.get(this.path,)
    // .then((data)=> {

    // })
    return {id: 0, username: 'johndoe', name: 'John Doe'};
  }

  async login(values: unknown) {
    // this.client.get(this.path,)
    // .then((data)=> {

    // })
    return {id: 0, username: 'johndoe', name: 'John Doe'};
  }

  async forgot(email: string) {
    // this.client.get(this.path,)
    // .then((data)=> {

    // })
    return null;
  }
}
const userService = new UserService();
export default userService;
