import { Injectable } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/common/interfaces/auth-data.interface';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private user: User;

  constructor(
    private storageService: StorageService,
    private router: Router,
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
  
}
