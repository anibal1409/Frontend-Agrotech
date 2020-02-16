import { SectorHumidity } from './sector-humidity.model';
import { SectorLight } from './sector-light.model';
import { SectorTemperature } from './sector-temperature.model';

export class Sector {

  public _id: string;
  public name: string;
  public pendingSince: number;
  public pendingUntil: number;
  public weatherId: string;
  public sectorHumidities: SectorHumidity[];
  public sectorLights: SectorLight[];
  public sectorTemperatures: SectorTemperature[];

  constructor(data: any) {
    Object.assign(this, data);
  }

}
