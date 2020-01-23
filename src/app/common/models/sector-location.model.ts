export class SectorLocation {

  public _id: string;
  public sectorId: string;
  public name: string;
  public ASNM: number;
  public texturesId: string[];

  constructor(data: any) {
    Object.assign(this, data);
  }

}
