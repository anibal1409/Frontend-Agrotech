export class Sector {

  public _id: string;
  public name: string;
  public pendingSince: number;
  public pendingUntil: number;
  public weatherId: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
