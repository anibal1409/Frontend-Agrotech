import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';
import { Study } from 'src/app/common/models/study.model';
import { SectorService } from './sector.service';
import { LocationService } from './location.service';
import { DocumentService } from './document.service';
import { CropService } from './crop.service';
import { IResultStudy } from 'src/app/common/interfaces/result-study.interface';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  private nameService = "StudyService";
  private items: Study[] = [];
  private itemsTrashed: Study[] = [];
  itemsChanged = new Subject<Study[]>();
  itemsTrashedChanged = new Subject<Study[]>();
  private index: number;
  private indexTrashed: number;
  private requesetHttp = false;

  constructor(
    private http: HttpClient,
    private sectorService: SectorService,
    private locationService: LocationService,
    private documentService: DocumentService,
    private cropService: CropService,
  ) {
    this.Init();
  }

  async Init() {
    if(!this.requesetHttp) {
      await this.List();
      await this.ListTrashed();
    }
  }


  Create(item: Study) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.STUDY_CREATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Study);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: Study) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.STUDY_UPDATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Study);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: Study) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.STUDY_DELETE,
            item._id
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Remove(item);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Delete: ' + err);
          reject(err);
        }
      }
    );
  }

  List() {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          const response = await this.http.get<Study[]>(
            RoutesHttp.BASE + RoutesHttp.STUDY_LIST
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.items = response;
          this.itemsChanged.next(this.items);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error List: ' + err);
          reject(err);
        }
      }
    );
  }

  ListTrashed() {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          const response = await this.http.get<Study[]>(
            RoutesHttp.BASE + RoutesHttp.STUDY_LIST_TRASHED
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.itemsTrashed = response;
          this.itemsTrashedChanged.next(this.itemsTrashed);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error ListTrashed: ' + err);
          reject(err);
        }
      }
    );
  }

  get Items() {
    return this.items.slice();
  }

  get ItemsTrashed() {
    return this.itemsTrashed.slice();
  }

  Result(item: Study) {
    if(!item) {
      return;
    }
    let results: IResultStudy[] = [];
    let crops = this.cropService.Items;
    let sector = this.sectorService.GetItemtID(item.sectorId);
    if (sector) {
      let humidity = this.sectorService.GetSectorHumidityMonth(item.sectorId, item.month);
      let temperature = this.sectorService.GetSectorTemperatureMonth(item.sectorId, item.month);
      let light = this.sectorService.GetSectorLightMonth(item.sectorId, item.month);
      let ASNM = this.locationService.GetItemtID(item.locationId).ASNM;
      let texture = item.texturesId;
      let ph = item.ph;
      let mo = item.mo;
      let ce = item.ce;
      for (let myCrop of crops) {
        let textureReady = false;
        for (let textureMyCrop of myCrop.texturesId) {
          if (textureMyCrop == texture) {
            textureReady  = true;
            break;
          }
        }
        console.log('textureReady', textureReady);
        console.log(myCrop.phSince , ph , myCrop.phUntil , ph, myCrop.phSince <= ph && myCrop.phUntil >= ph);
        console.log(myCrop.organicMaterialMinPercentage , mo , myCrop.organicMaterialMaxPercentage , mo, myCrop.organicMaterialMinPercentage <= mo && myCrop.organicMaterialMaxPercentage >= mo);
        console.log(myCrop.conductivitySince , ce , myCrop.conductivityUntil , ce, myCrop.conductivitySince <= ce && myCrop.conductivityUntil >= ce);
        console.log(myCrop.altitudeSince , ASNM , myCrop.altitudeUntil , ASNM, myCrop.altitudeSince <= ASNM && myCrop.altitudeUntil >= ASNM);
        console.log(myCrop.temperatureSince , temperature.min , myCrop.temperatureUntil , temperature.max, myCrop.temperatureSince <= temperature.min && myCrop.temperatureUntil >= temperature.max);
        console.log(myCrop.hoursSince , light.min , myCrop.hoursUntil , light.max, myCrop.hoursSince <= light.min && myCrop.hoursUntil >= light.max);
        console.log(myCrop.humiditySince , humidity.min , myCrop.humidityUntil , humidity.max, myCrop.humiditySince <= humidity.min && myCrop.humidityUntil >= humidity.max);
        console.log(myCrop.typographySince , sector.pendingSince , myCrop.typographyUntil , sector.pendingUntil, myCrop.typographySince <= sector.pendingSince && myCrop.typographyUntil >= sector.pendingUntil);
        console.log(myCrop.weatherId , sector.weatherId, myCrop.weatherId === sector.weatherId);
        if (
          textureReady &&
          (myCrop.phSince <= ph && myCrop.phUntil >= ph) &&
          (myCrop.organicMaterialMinPercentage <= mo && myCrop.organicMaterialMaxPercentage >= mo) &&
          (myCrop.conductivitySince <= ce && myCrop.conductivityUntil >= ce) &&
          (myCrop.altitudeSince <= ASNM && myCrop.altitudeUntil >= ASNM) &&
          (myCrop.temperatureSince <= temperature.min && myCrop.temperatureUntil >= temperature.max) &&
          (myCrop.hoursSince <= light.min && myCrop.hoursUntil >= light.max) &&
          (myCrop.humiditySince <= humidity.min && myCrop.humidityUntil >= humidity.max) &&
          ((myCrop.typographySince >= sector.pendingSince && myCrop.typographySince <= sector.pendingUntil) || 
          (myCrop.typographyUntil >= sector.pendingSince && myCrop.typographyUntil <= sector.pendingUntil))  &&
          (myCrop.weatherId === sector.weatherId)
        ) {
          console.log(myCrop, this.documentService.GetItemIDCrop(myCrop._id));
          results.push({
            crop: myCrop,
            document: this.documentService.GetItemIDCrop(myCrop._id)
          });
        }
      }
    }
    return results;
    
  }

  GetItemtID(idItem: String) {
    return this.items.find(
      (itemValue, index: number, obj) => {
        if (itemValue._id === idItem) {
          this.index = index;
          return true;
        }
      }
    );
  }

  GetItemtTrashedID(idItemTrashed: String) {
    return this.itemsTrashed.find(
      (itemTrashedValue, index: number, obj) => {
        if (itemTrashedValue._id === idItemTrashed) {
          this.indexTrashed = index;
          return true;
        }
      }
    );
  }

  private Add(item: Study) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.items[this.index] = item;
      this.itemsChanged.next(this.items);
    } else {
      this.items.push(item);
      this.itemsChanged.next(this.items);
    }
  }

  private AddTrashed(itemTrashed: Study) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.itemsTrashed[this.indexTrashed] = itemTrashed;
      this.itemsTrashedChanged.next(this.itemsTrashed);
    } else {
      this.itemsTrashed.push(itemTrashed);
      this.itemsTrashedChanged.next(this.itemsTrashed);
    }
  }

  private Remove(item: Study) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.items.splice(this.index, 1);
      this.itemsChanged.next(this.items);
    }
  }

  private RemoveTrashed(itemTrashed: Study) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.itemsTrashed.splice(this.indexTrashed, 1);
      this.itemsTrashedChanged.next(this.itemsTrashed);
    }
  }
}
