import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';
import { Document } from 'src/app/common/models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private nameService = "DocumentService";
  private items: Document[] = [];
  private itemsTrashed: Document[] = [];
  itemsChanged = new Subject<Document[]>();
  itemsTrashedChanged = new Subject<Document[]>();
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


  Create(item: Document) {
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
          this.Add(response as Document);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: Document) {
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
          this.Add(response as Document);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: Document) {
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
          const response = await this.http.get<Document[]>(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_LIST
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
          const response = await this.http.get<Document[]>(
            RoutesHttp.BASE + RoutesHttp.TEXTURE_LIST_TRASHED
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

  private Add(item: Document) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.items[this.index] = item;
      this.itemsChanged.next(this.items);
    } else {
      this.items.push(item);
      this.itemsChanged.next(this.items);
    }
  }

  private AddTrashed(itemTrashed: Document) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.itemsTrashed[this.indexTrashed] = itemTrashed;
      this.itemsTrashedChanged.next(this.itemsTrashed);
    } else {
      this.itemsTrashed.push(itemTrashed);
      this.itemsTrashedChanged.next(this.itemsTrashed);
    }
  }

  private Remove(item: Document) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.items.splice(this.index, 1);
      this.itemsChanged.next(this.items);
    }
  }

  private RemoveTrashed(itemTrashed: Document) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.itemsTrashed.splice(this.indexTrashed, 1);
      this.itemsTrashedChanged.next(this.itemsTrashed);
    }
  }
}
