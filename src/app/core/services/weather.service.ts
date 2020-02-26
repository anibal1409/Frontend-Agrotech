import { Injectable } from '@angular/core';
import { Weather } from 'src/app/common/models/weather.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private nameService = "WeatherService";
  private weathers: Weather[] = [];
  private weathersTrashed: Weather[] = [];
  itemsChanged = new Subject<Weather[]>();
  itemsTrashedChanged = new Subject<Weather[]>();
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


  Create(item: Weather) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.WEATHER_CREATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Weather);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: Weather) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.WEATHER_UPDATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Weather);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: Weather) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.WEATHER_DELETE,
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
          const response = await this.http.get<Weather[]>(
            RoutesHttp.BASE + RoutesHttp.WEATHER_LIST
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.weathers = response;
          this.itemsChanged.next(this.weathers);
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
          const response = await this.http.get<Weather[]>(
            RoutesHttp.BASE + RoutesHttp.WEATHER_LIST_TRASHED
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.weathersTrashed = response;
          this.itemsTrashedChanged.next(this.weathersTrashed);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error ListTrashed: ' + err);
          reject(err);
        }
      }
    );
  }

  get Items() {
    return this.weathers.slice();
  }

  get ItemsTrashed() {
    return this.weathersTrashed.slice();
  }

  GetItemtID(idItem: String) {
    return this.weathers.find(
      (itemValue, index: number, obj) => {
        if (itemValue._id === idItem) {
          this.index = index;
          return true;
        }
      }
    );
  }

  GetItemtTrashedID(idItemTrashed: String) {
    return this.weathersTrashed.find(
      (itemTrashedValue, index: number, obj) => {
        if (itemTrashedValue._id === idItemTrashed) {
          this.indexTrashed = index;
          return true;
        }
      }
    );
  }

  private Add(item: Weather) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.weathers[this.index] = item;
      this.itemsChanged.next(this.weathers);
    } else {
      this.weathers.push(item);
      this.itemsChanged.next(this.weathers);
    }
  }

  private AddTrashed(itemTrashed: Weather) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.weathersTrashed[this.indexTrashed] = itemTrashed;
      this.itemsTrashedChanged.next(this.weathersTrashed);
    } else {
      this.weathersTrashed.push(itemTrashed);
      this.itemsTrashedChanged.next(this.weathersTrashed);
    }
  }

  private Remove(item: Weather) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.weathers.splice(this.index, 1);
      this.itemsChanged.next(this.weathers);
    }
  }

  private RemoveTrashed(itemTrashed: Weather) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.weathersTrashed.splice(this.indexTrashed, 1);
      this.itemsTrashedChanged.next(this.weathersTrashed);
    }
  }
}
