export class Crop {

  public _id: string;
  public name: string;
  public scientificName: string;
  public phSince: number;
  public phUntil: number;
  public temperatureSince: number;
  public temperatureUntil: number;
  public altitudeSince: number;
  public altitudeUntil: number;
  public hoursSince: number;
  public hoursUntil: number;
  public typographySince: number;
  public typographyUntil: number;
  public humiditySince: number;
  public humidityUntil: number;
  public conductivitySince: number;
  public conductivityUntil: number;
  public organicMaterialMinPercentage: number;
  public organicMaterialMaxPercentage: number;
  public texturesId: string[];
  public weatherId: string;
  public deleted: boolean;
  public documentId?: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
