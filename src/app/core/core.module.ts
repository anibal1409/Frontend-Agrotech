import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LobbyModule } from '../lobby/lobby.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    LobbyModule,
    AngularFontAwesomeModule,
  ],
  exports: [
    CoreRoutingModule
  ],
})
export class CoreModule { }
