export class SectorTemperature {

  public _id: string;
  public month: string;
  public min: number;
  public max: number;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
