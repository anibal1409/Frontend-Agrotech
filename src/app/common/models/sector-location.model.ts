export class SectorLocation {

  public _id: string;
  public sectorId: string;
  public name: string;
  public ASNM: number;
  public texturesIds: string[];
  public deleted: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
