export class Weather {

  public _id: string;
  public name: string;
  public deleted: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
