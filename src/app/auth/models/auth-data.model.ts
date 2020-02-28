import { User } from 'src/app/common/models/user.model';

export class AuthData {

  constructor(
    private access_token: string,
    private expiresIn: number,
    public user: User
  ) {}

  get Token() {
    if (!this.expiresIn  || (new Date().getTime() / 1000 ) > this.expiresIn) {
      return null;
    }
    return this.access_token;
  }

}
