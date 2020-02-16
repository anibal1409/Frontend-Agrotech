export class SectorLight {

  public _id: string;
  public month: number;
  public min: number;
  public max: string;
  public average: number = 0;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
