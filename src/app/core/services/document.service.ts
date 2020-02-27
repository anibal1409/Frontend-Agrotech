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
  itemsChanged = new Subject<Document[]>();
  itemsTrashedChanged = new Subject<Document[]>();
  private index: number;
  private requesetHttp = false;

  constructor(
    private http: HttpClient,
  ) {
    this.Init();
  }

  async Init() {
    if(!this.requesetHttp) {
      await this.List();
    }
  }


  Create(item: Document, data: any) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          let headersV = new Headers(); 
          console.log('data', data);
          headersV.set('Content-Type', 'multipart/form-data');
          const myBlob = new Blob([data], {type: 'application/pdf'});
          console.log('myBlob', myBlob);
          const formData = new FormData();
          formData.append('document', data, item.name + '.pdf');
          formData.append('name', item.name);
          formData.append('cropId', item.cropId);
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.DOCUMENT_CREATE,
            formData
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

  Update(item: Document, data: File) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          await this.Delete(item);
          await this.Create(item, data);
          resolve(true);
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
            RoutesHttp.BASE + RoutesHttp.DOCUMENT_DELETE,
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
          const response = await this.http.get<Document[]>(
            RoutesHttp.BASE + RoutesHttp.DOCUMENT_LIST
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

  get Items() {
    return this.items.slice();
  }

  GetItemsIDCrop(idCrop: String): Document[] {
    return this.items.filter((itemV) => itemV.cropId === idCrop).slice();
  }

  GetItemIDCrop(idCrop: String) {
    return this.items.find(
      (itemValue, index: number, obj) => {
        if (itemValue.cropId === idCrop) {
          this.index = index;
          return true;
        }
      }
    );
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

  private Remove(item: Document) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.items.splice(this.index, 1);
      this.itemsChanged.next(this.items);
    }
  }
}
