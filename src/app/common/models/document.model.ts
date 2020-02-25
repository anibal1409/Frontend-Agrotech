export class Document {

  public _id: string;
  public name: string;
  public cropId: string;
  public path: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
