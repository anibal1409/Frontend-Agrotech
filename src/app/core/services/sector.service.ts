import { Injectable } from '@angular/core';
import { Sector } from 'src/app/common/models/sector.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';

@Injectable({
  providedIn: 'root'
})
export class SectorService  {

  
  private nameService = "SectorService";
  private sectors: Sector[] = [];
  private sectorsTrashed: Sector[] = [];
  sectorsChanged = new Subject<Sector[]>();
  sectorsTrashedChanged = new Subject<Sector[]>();
  private index: number;
  private indexTrashed: number;

  constructor(
    private http: HttpClient,
  ) { }


  Create(item: Sector) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.CROP_CREATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Sector);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: Sector) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.CROP_UPDATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Sector);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: Sector) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.CROP_DELETE,
            item._id
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Delete(item);
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
          const response = await this.http.get<Sector[]>(
            RoutesHttp.BASE + RoutesHttp.CROP_LIST
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.sectors = response;
          this.sectorsChanged.next(this.sectors);
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
          const response = await this.http.get<Sector[]>(
            RoutesHttp.BASE + RoutesHttp.CROP_LIST_TRASHED
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.sectorsTrashed = response;
          this.sectorsTrashedChanged.next(this.sectorsTrashed);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error ListTrashed: ' + err);
          reject(err);
        }
      }
    );
  }

  get Items() {
    return this.sectors.slice();
  }

  get ItemsTrashed() {
    return this.sectorsTrashed.slice();
  }

  GetItemtID(idItem: String) {
    return this.sectors.find(
      (itemValue, index: number, obj) => {
        if (itemValue._id === idItem) {
          this.index = index;
          return true;
        }
      }
    );
  }

  GetItemtTrashedID(idItemTrashed: String) {
    return this.sectorsTrashed.find(
      (itemTrashedValue, index: number, obj) => {
        if (itemTrashedValue._id === idItemTrashed) {
          this.indexTrashed = index;
          return true;
        }
      }
    );
  }

  private Add(item: Sector) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.sectors[this.index] = item;
      this.sectorsChanged.next(this.sectors);
    } else {
      this.sectors.push(item);
      this.sectorsChanged.next(this.sectors);
    }
  }

  private AddTrashed(itemTrashed: Sector) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.sectorsTrashed[this.indexTrashed] = itemTrashed;
      this.sectorsTrashedChanged.next(this.sectorsTrashed);
    } else {
      this.sectorsTrashed.push(itemTrashed);
      this.sectorsTrashedChanged.next(this.sectorsTrashed);
    }
  }

  private Remove(item: Sector) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.sectors.splice(this.index, 1);
      this.sectorsChanged.next(this.sectors);
    }
  }

  private RemoveTrashed(itemTrashed: Sector) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.sectorsTrashed.splice(this.indexTrashed, 1);
      this.sectorsTrashedChanged.next(this.sectorsTrashed);
    }
  }
}
