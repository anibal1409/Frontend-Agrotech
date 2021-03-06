import { Injectable } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';
import { IChangeRole } from 'src/app/common/interfaces/change-role.interface';
import { UserSignIn } from 'src/app/auth/models/user-sign-in.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private nameService = "UserService";
  private items: User[] = [];
  private itemsTrashed: User[] = [];
  itemsChanged = new Subject<User[]>();
  itemsTrashedChanged = new Subject<User[]>();
  private index: number;
  private indexTrashed: number;
  private requesetHttp = false;

  private roles: {name: String, value: String}[] = [
    {name: 'Administrador', value: 'admin'},
    {name: 'Comunidad', value: 'basic'},
  ];

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


  Create(item: User) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.CREATE_USER,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as User);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }
  ChangeRol(item: User) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.  CHANGE_ROL_USER ,
          {userId: item._id , rol: item.role}
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as User);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Create: ' + err);
          reject(err);
        }
      }
    );
  }

  Update(item: IChangeRole) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.CHANGE_ROL_USER,
            item
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.Add(response as User);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  Delete(item: User) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!item) {
            reject({message: 'No data'});
          }
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.DELETE_USER,
            {userId: item._id}
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
          const response = await this.http.post<User[]>(
            RoutesHttp.BASE + RoutesHttp.LIST_USERS, null
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
          const response = await this.http.post<User[]>(
            RoutesHttp.BASE + RoutesHttp.LIST_USERS_TRASHED, null
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

  get Roles() {
    return this.roles.slice();
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

  private Add(item: User) {
    const itemLocal = this.GetItemtID(item._id);
    if (itemLocal) {
      this.items[this.index] = item;
      this.itemsChanged.next(this.items);
    } else {
      this.items.push(item);
      this.itemsChanged.next(this.items);
    }
  }

  private AddTrashed(itemTrashed: User) {
    const itemTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itemTrashedLocal) {
      this.itemsTrashed[this.indexTrashed] = itemTrashed;
      this.itemsTrashedChanged.next(this.itemsTrashed);
    } else {
      this.itemsTrashed.push(itemTrashed);
      this.itemsTrashedChanged.next(this.itemsTrashed);
    }
  }

  private Remove(item: User) {
    const itmeLocal = this.GetItemtID(item._id);
    if (itmeLocal) {
      this.AddTrashed(itmeLocal);
      this.items.splice(this.index, 1);
      this.itemsChanged.next(this.items);
    }
  }

  private RemoveTrashed(itemTrashed: User) {
    const itmeTrashedLocal = this.GetItemtTrashedID(itemTrashed._id);
    if (itmeTrashedLocal) {
      this.itemsTrashed.splice(this.indexTrashed, 1);
      this.itemsTrashedChanged.next(this.itemsTrashed);
    }
  }

  GetRoleValue(valueItem: String) {
    return this.roles.find(
      (itemValue, index: number, obj) => {
        if (itemValue.value === valueItem) {
          return true;
        }
      }
    );
  }
}
