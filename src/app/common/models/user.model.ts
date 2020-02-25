export class User {
  
  public _id: string;
  public name: string;
  public email: string;
  public role: string;
  public deleted: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
