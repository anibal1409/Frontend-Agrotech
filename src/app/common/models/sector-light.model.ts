export class SectorLight {

  public _id: string;
  public month: number;
  public min: number;
  public max: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
