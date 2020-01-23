export class SectorTemperature {

  public _id: string;
  public sectorId: string;
  public month: string;
  public min: number;
  public max: number;
  public average: number;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
