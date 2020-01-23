import { User } from 'src/app/common/models/user.model';

export class AuthData {

  constructor(
    private token: string,
    private exp: number,
    public user: User
  ) {}

  get Token() {
    if (!this.exp  || (new Date().getTime() / 1000 ) > this.exp) {
      return null;
    }
    return this.token;
  }

}
