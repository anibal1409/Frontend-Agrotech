import { Component, OnInit } from '@angular/core';
import { nameApp } from 'src/app/common/constants/app.constant';
import { RoutesAdmin } from 'src/app/common/enum/routes/routes-admin.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AccountService } from 'src/app/core/services/account.service';
import { AlertService } from 'src/app/common/alert/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountUserComponent } from 'src/app/core/pages/account-user/account-user.component';
import { AccountPasswordComponent } from 'src/app/core/pages/account-password/account-password.component';

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.scss']
})
export class BaseAdminComponent implements OnInit {

  nameApp = nameApp;
  routeHome = RoutesAdmin.HOME;
  routeCrop = RoutesAdmin.CROP;
  routeTexture = RoutesAdmin.TEXTURE;
  routeWeather = RoutesAdmin.WEATHER;
  routeStudy = RoutesAdmin.STUDY;
  routeSector = RoutesAdmin.SECTOR;
  routeUser = RoutesAdmin.USER;
  routeLocation = RoutesAdmin.LOCATION;
  routeDocument = RoutesAdmin.DOCUMENT;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private accountService: AccountService,
    private dialoge: MatDialog,
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

  DialogeFormUser() {
    const dialogRef = this.dialoge.open(AccountUserComponent, {
      width: '40rem',
      disableClose: true,
      data: this.User
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  DialogeFormPassword() {
    const dialogRef = this.dialoge.open(AccountPasswordComponent, {
      width: '40rem',
      disableClose: true,
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

}
