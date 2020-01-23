export class UserSignIn {
  public name: string;
  public email: string;
  public password: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
