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
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private user: User;
  userChange = new Subject<User>();
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
          let myUser: IUpdateAccount = { name: newName}
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.ACCOUNT_UPDATE,
            myUser
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          this.userChange.next(response as User);
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

  ChangePassword(newPasswordV: string) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!newPasswordV) {
            reject({message: 'No data'});
          }
          let myUser = {newPassword: newPasswordV}
          const response = await this.http.post(
            RoutesHttp.BASE + RoutesHttp.ACCOUNT_CHANGE_PASSWORD,
            myUser
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          resolve(response);
        } catch (err) {
          console.log(this.nameService + 'Error ChangePassword: ' + err);
          reject(err);
        }
      }
    );
  }

  
}
