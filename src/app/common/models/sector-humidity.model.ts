export class SectorHumidity {

  public _id: string;
  public month: number;
  public min: number;
  public max: number;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
