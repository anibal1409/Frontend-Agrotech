import { Injectable } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/common/interfaces/auth-data.interface';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';
import { HttpClient } from '@angular/common/http';
import { IUpdateAccount } from 'src/app/common/interfaces/update-account.interface';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';
import { AuthData } from 'src/app/auth/models/auth-data.model';
import { authStorage } from 'src/app/common/constants/storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private user: User;
  private nameService = "AccountService";

  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {
    if(!this.user) {
      this.SearchUser();
    }
  }

  private SearchUser() {
    const authData: IAuthData = this.storageService.apiAuthorization;
    if (!authData) {
      this.router.navigate([RoutesLogin.SIGN_IN]);
    }
    this.user = authData.user;
  }

  public User(): User {
    return this.user;
  }

  Update(newName: string) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!newName) {
            reject({message: 'No data'});
          }
          let myUser: IUpdateAccount = {_id: this.User()._id, name: newName}
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.ACCOUNT_UPDATE,
            myUser
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.UpdateStorage(newName);
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error Update: ' + err);
          reject(err);
        }
      }
    );
  }

  private UpdateStorage(newName: string) {
    const authData: IAuthData = this.storageService.apiAuthorization;
    if (!authData) {
      return;
    }
    let loadedUser = new AuthData(authData.access_token, authData.expiresIn, authData.user);
    loadedUser.user.name = newName;
    StorageService.SetItem(authStorage, loadedUser);
  }

  
}
