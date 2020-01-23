export class SectorLight {

  public _id: string;
  public sectorId: string;
  public month: number;
  public min: number;
  public max: string;
  public average: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
