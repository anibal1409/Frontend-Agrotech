export class SectorLocation {

  public _id: string;
  public sectorId: string;
  public name: string;
  public ASNM: number;
  public texturesIds: string[];

  constructor(data: any) {
    Object.assign(this, data);
  }

}
