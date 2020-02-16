export class SectorTemperature {

  public _id: string;
  public month: string;
  public min: number;
  public max: number;
  public average: number = 0;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
