import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    LobbyComponent,
    ForgotPasswordComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    LobbyRoutingModule
  ],
})
export class LobbyModule { }
