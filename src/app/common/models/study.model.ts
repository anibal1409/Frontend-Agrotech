export class Study {

  public _id: string;
  public texturesId: string;
  public sectorId: string;
  public locationId: string;
  public userId: string;
  public name: string;
  public month: number;
  public ph: number;
  public mo: number;
  public ce: number;
  public deleted: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
