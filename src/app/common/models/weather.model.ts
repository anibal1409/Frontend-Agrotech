export class Weather {

  public _id: string;
  public name: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
