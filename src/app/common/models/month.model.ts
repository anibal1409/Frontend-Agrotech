export class Month {

  public _id: string;
  public name: string;
  public numValue: number;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
