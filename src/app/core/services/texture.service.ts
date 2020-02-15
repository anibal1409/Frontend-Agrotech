import { Injectable } from '@angular/core';
import { Texture } from 'src/app/common/models/texture.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';

@Injectable({
  providedIn: 'root'
})
export class TextureService {

  private nameService = "TextureService";
  private textures: Texture[] = [];
  private texturesTrashed: Texture[] = [];
  itemsChanged = new Subject<Texture[]>();
  itemsTrashedChanged = new Subject<Texture[]>();
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


  Create(item: Texture) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_CREATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Texture);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: Texture) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_UPDATE,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as Texture);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: Texture) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_DELETE,
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
          const response = await this.http.get<Texture[]>(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_LIST
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.textures = response;
          this.itemsChanged.next(this.textures);
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
          const response = await this.http.get<Texture[]>(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_LIST_TRASHED
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.texturesTrashed = response;
          this.itemsTrashedChanged.next(this.texturesTrashed);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error ListTrashed: ' + err);
          reject(err);
        }
      }
    );
  }

  get Items() {
    return this.textures.slice();
  }

  get ItemsTrashed() {
    return this.texturesTrashed.slice();
  }

  GetItemtID(idItem: String) {
    return this.textures.find(
      (itemValue, index: number, obj) => {
        if (itemValue._id === idItem) {
          this.index = index;
          return true;
        }
      }
    );
  }

  GetItemtTrashedID(idItemTrashed: String) {
    return this.texturesTrashed.find(
      (itemTrashedValue, index: number, obj) => {
        if (itemTrashedValue._id === idItemTrashed) {
          this.indexTrashed = index;
          return true;
        }
      }
    );
  }

  private Add(item: Texture) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.textures[this.index] = item;
      this.itemsChanged.next(this.textures);
    } else {
      this.textures.push(item);
      this.itemsChanged.next(this.textures);
    }
  }

  private AddTrashed(itemTrashed: Texture) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.texturesTrashed[this.indexTrashed] = itemTrashed;
      this.itemsTrashedChanged.next(this.texturesTrashed);
    } else {
      this.texturesTrashed.push(itemTrashed);
      this.itemsTrashedChanged.next(this.texturesTrashed);
    }
  }

  private Remove(item: Texture) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.textures.splice(this.index, 1);
      this.itemsChanged.next(this.textures);
    }
  }

  private RemoveTrashed(itemTrashed: Texture) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.texturesTrashed.splice(this.indexTrashed, 1);
      this.itemsTrashedChanged.next(this.texturesTrashed);
    }
  }
}
