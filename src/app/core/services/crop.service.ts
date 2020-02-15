import { Injectable } from '@angular/core';
import { Crop } from 'src/app/common/models/crop.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';

@Injectable({
  providedIn: 'root'
})
export class CropService  {

  private nameService = "CropService";
  private crops: Crop[] = [];
  private cropsTrashed: Crop[] = [];
  itemsChanged = new Subject<Crop[]>();
  itemsTrashedChanged = new Subject<Crop[]>();
  private index: number;
  private indexTrashed: number;
  private requesetHttp = false;

  constructor(
    private http: HttpClient,
  ) {
    this.Init();
  }

  async Init() {
    if(!this.requesetHttp) {
      await this.List();
      await this.ListTrashed();
    }
  }


  Create(item: Crop) {
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
          this.Add(response as Crop);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: Crop) {
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
          this.Add(response as Crop);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: Crop) {
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
          const response = await this.http.get<Crop[]>(
            RoutesHttp.BASE + RoutesHttp.CROP_LIST
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.crops = response;
          this.itemsChanged.next(this.crops);
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
          const response = await this.http.get<Crop[]>(
            RoutesHttp.BASE + RoutesHttp.CROP_LIST_TRASHED
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.cropsTrashed = response;
          this.itemsTrashedChanged.next(this.cropsTrashed);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error ListTrashed: ' + err);
          reject(err);
        }
      }
    );
  }

  get Items() {
    return this.crops.slice();
  }

  get ItemsTrashed() {
    return this.cropsTrashed.slice();
  }

  GetItemtID(idItem: String) {
    return this.crops.find(
      (itemValue, index: number, obj) => {
        if (itemValue._id === idItem) {
          this.index = index;
          return true;
        }
      }
    );
  }

  GetItemtTrashedID(idItemTrashed: String) {
    return this.cropsTrashed.find(
      (itemTrashedValue, index: number, obj) => {
        if (itemTrashedValue._id === idItemTrashed) {
          this.indexTrashed = index;
          return true;
        }
      }
    );
  }

  private Add(item: Crop) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.crops[this.index] = item;
      this.itemsChanged.next(this.crops);
    } else {
      this.crops.push(item);
      this.itemsChanged.next(this.crops);
    }
  }

  private AddTrashed(itemTrashed: Crop) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.cropsTrashed[this.indexTrashed] = itemTrashed;
      this.itemsTrashedChanged.next(this.cropsTrashed);
    } else {
      this.cropsTrashed.push(itemTrashed);
      this.itemsTrashedChanged.next(this.cropsTrashed);
    }
  }

  private Remove(item: Crop) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.crops.splice(this.index, 1);
      this.itemsChanged.next(this.crops);
    }
  }

  private RemoveTrashed(itemTrashed: Crop) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.cropsTrashed.splice(this.indexTrashed, 1);
      this.itemsTrashedChanged.next(this.cropsTrashed);
    }
  }
}
