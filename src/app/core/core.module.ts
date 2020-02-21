import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LobbyModule } from '../lobby/lobby.module';
import { AuthModule } from '../auth/auth.module';
import { StorageService } from './services/storage.service';
import { HomeComponent } from './pages/home/home.component';
import { CropService } from './services/crop.service';
import { SectorService } from './services/sector.service';
import { SnackBarService } from './services/snack-bar.service';
import { TextureService } from './services/texture.service';
import { UserService } from './services/user.service';
import { WeatherService } from './services/weather.service';
import { CommunityModule } from '../community/community.module';
import { AdminModule } from '../admin/admin.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from './services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/services/auth-interceptor.service';
import { AccountUserComponent } from './pages/account-user/account-user.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [HomeComponent, AccountUserComponent, AccountPasswordComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    LobbyModule,
    AngularFontAwesomeModule,
    AuthModule,
    CommunityModule,
    AdminModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    CoreRoutingModule
  ],
  providers: [
    StorageService,
    CropService,
    SectorService,
    SnackBarService,
    TextureService,
    UserService,
    WeatherService,
    AccountService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ]
})
export class CoreModule { }
