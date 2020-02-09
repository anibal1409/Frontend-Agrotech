import { Component, OnInit } from '@angular/core';
import { nameApp } from 'src/app/common/constants/app.constant';
import { RoutesCommunity } from 'src/app/common/enum/routes/routes-community.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/common/alert/alert.service';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-base-community',
  templateUrl: './base-community.component.html',
  styleUrls: ['./base-community.component.scss']
})
export class BaseCommunityComponent implements OnInit {

  nameApp = nameApp;
  routeHome = RoutesCommunity.HOME;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
  }
  
  async Logout() {
    this.alertService.showConfirm(
      {
        title: 'Salir',
        description: 'Esta seguro que desea salir del sistema?'
      }
    ).subscribe(
      async (resp) => {
        if (resp) {
          await this.authService.Logout();
        }
        console.log('response', resp);
      }
    );
  }

  get User() {
    return this.accountService.User();
  }

}
