import { Component, OnInit, ViewChild } from '@angular/core';
import { nameApp } from 'src/app/common/constants/app.constant';
import { RoutesCommunity } from 'src/app/common/enum/routes/routes-community.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/common/alert/alert.service';
import { AccountService } from 'src/app/core/services/account.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { RoutesAdmin } from 'src/app/common/enum/routes/routes-admin.enum';
import { User } from 'src/app/common/models/user.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/common/components/loader/loader.service';
import { LoaderState } from 'src/app/common/components/loader/loader';
import { AccountUserComponent } from 'src/app/core/pages/account-user/account-user.component';
import { AccountPasswordComponent } from 'src/app/core/pages/account-password/account-password.component';

@Component({
  selector: 'app-base-community',
  templateUrl: './base-community.component.html',
  styleUrls: ['./base-community.component.scss']
})
export class BaseCommunityComponent implements OnInit {
  @ViewChild('snav', {static: true}) sidenav: MatSidenav;
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
  routeStatistics = RoutesAdmin.STATISTICS;
  myUser: User;
  show = false;
  private subscription: Subscription;

  userSubs = new Subscription();
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private accountService: AccountService,
    private dialoge: MatDialog,
    private router: Router,
    private loader: LoaderService

  ) {
    this.closeSidenavOnRoutingEvent();
    this.subscription = this.loader.loaderState.subscribe((state: LoaderState) => {
      setTimeout(() => {
        this.show = state.show;
      });
    });
   }

  closeSidenavOnRoutingEvent() {
    this.router.events.subscribe(event => {
      // close sidenav on routing
      this.sidenav.close();
    });
  }

  ngOnInit() {
    this.myUser = this.accountService.User();
    this.userSubs = this.accountService.userChange.subscribe(
      (newUser: User) => {
        this.myUser = newUser;
      }
    );
  }


  ngOnDestroy(): void {

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
      }
    );
  }

  DialogeFormUser() {
    const dialogRef = this.dialoge.open(AccountUserComponent, {
      width: '40rem',
      disableClose: true,
      data: this.myUser
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
