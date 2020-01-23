import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LobbyModule } from '../lobby/lobby.module';
import { AuthModule } from '../auth/auth.module';
import { StorageService } from './services/storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    LobbyModule,
    AngularFontAwesomeModule,
    AuthModule,
  ],
  exports: [
    CoreRoutingModule
  ],
  providers: [
    StorageService,
  ]
})
export class CoreModule { }
