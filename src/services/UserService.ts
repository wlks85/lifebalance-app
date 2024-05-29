import {RestClient} from '../lib';

class UserService {
  client: RestClient;
  path: string;
  constructor() {
    this.client = new RestClient();
    this.path = '/users';
  }

  async getUserDetails(id: string) {
    // this.client.get(this.path,)
    // .then((data)=> {

    // })
    return {id: id, username: 'johndoe', name: 'John Doe'};
  }
}
const userService = new UserService();
export default userService;
