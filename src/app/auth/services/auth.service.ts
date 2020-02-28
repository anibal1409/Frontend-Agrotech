import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutesHttp } from '../../common/enum/routes/routes-http.enum';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../common/models/user.model';
import { AuthData } from '../models/auth-data.model';
import { StorageService } from '../../core/services/storage.service';
import { IAuthData } from '../../common/interfaces/auth-data.interface';
import { UserSignIn } from '../models/user-sign-in.model';
import { authStorage } from '../../common/constants/storage.constant';
import { Router } from '@angular/router';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<AuthData>(null);
  usuario: User = null;
  private tokenExpiration: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
  ) { }

  async ChangePassword(uuidV: string, newPassword: string) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!uuidV || !newPassword) {
            reject({message: 'No data'});
          }
          const response = await this.http.post<IAuthData>(
            RoutesHttp.BASE + RoutesHttp.CHANGE_PASSWORD,
            {
              uuid: uuidV,
              password: newPassword
            }
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          resolve(response);
        } catch (err) {
          console.log('Error ChangePassword: ' + err);
          reject(err);
        }
      }
    );
  }

  async ForgotPassword(emailV: string) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!emailV) {
            reject({message: 'No email'});
          }
          const response = await this.http.post<IAuthData>(
            RoutesHttp.BASE + RoutesHttp.PASSWORD_RESET,
            {
              email: emailV
            }
            ).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          resolve(response);
        } catch (err) {
          console.log('Error ForgotPassword: ' + err);
          reject(err);
        }
      }
    );
  }

  async SignIn(user: UserSignIn) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!user) {
            reject({message: 'No user'});
          }
          const response = await this.http.post<IAuthData>(RoutesHttp.BASE + RoutesHttp.SIGN_IN, user).toPromise();
          if (!response) {
            reject({message: 'No data back'});
          }
          if (this.Login(response)) {
            resolve(response);
          } else {
            reject({message: 'token expirate'});
          }
        } catch (err) {
          console.log('Error SignIn: ' + err);
          reject(err);
        }
      }
    );
  }

  async SignUp(user: UserSignIn) {
    return new Promise<any>(
      async (resolve, reject) => {
        try {
          if (!user) {
            reject({message: 'No user'});
          }
          const response = await this.http.post<IAuthData>(RoutesHttp.BASE + RoutesHttp.SIGN_UP, user).toPromise();
          console.log('SignUp', response);
          if (!response) {
            reject({message: 'No data back'});
          }
          if (this.Login(response)) {
            resolve(response);
          } else {
            reject({message: 'token expirate'});
          }
        } catch (err) {
          console.log('Error SignUp: ' + err);
          reject(err);
        }
      }
    );
  }

  private Login(data: IAuthData): boolean {
    try {
      const loadedUser = new AuthData(data.access_token, data.expiresIn, data.user);
      console.log(loadedUser, loadedUser.Token);
      if (loadedUser.Token) {
        this.user.next(loadedUser);
        // this.userService.User(loadedUser.user);
        StorageService.SetItem(authStorage, data);
        const expDuration =  data.expiresIn - (new Date().getTime() / 1000);
        this.AutoLogout(expDuration * 1000);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error login', error);
      return false;
    }
  }

  AutoLogin() {
    const authData: IAuthData = this.storageService.apiAuthorization;
    if (!authData) {
      return;
    }
    const loadedUser = new AuthData(authData.access_token, authData.expiresIn, authData.user);
    if (loadedUser.Token) {
      this.user.next(loadedUser);
      // this.userService.User(loadedUser.user);
      const expDuration =  authData.expiresIn - (new Date().getTime() / 1000);
      this.AutoLogout(expDuration * 1000);
    }
  }

  async Logout() {
    try {
      const response: any = await this.http.post(RoutesHttp.BASE + RoutesHttp.LOGOUT, null).toPromise();
      this.user.next(null);
      // this.userService.User(null);
      this.storageService.DeleteAuthorization();

      if (this.tokenExpiration) {
        clearTimeout(this.tokenExpiration);
      }
      this.tokenExpiration = null;
      this.router.navigate([RoutesLogin.SIGN_IN]);
    } catch (error) {

    }
  }

  tokenException() {
    try {

      this.user.next(null);
      // this.userService.User(null);
      this.storageService.DeleteAuthorization();
      if (this.tokenExpiration) {
        clearTimeout(this.tokenExpiration);
      }
      this.tokenExpiration = null;
    } catch (error) {

    }
  }

  AutoLogout(expDuration: number) {
    this.tokenExpiration = setTimeout( () => {
      this.Logout();
    }, expDuration);
  }

}
