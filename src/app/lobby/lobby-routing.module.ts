import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RoutesLogin } from '../common/enum/routes/routes-login.enum';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';


export const lobbyRoutes: Routes = [
  {
    path: 'auth',
    component: LobbyComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent,
      },
      {
        path: 'password-reset/:token',
        component: PasswordResetComponent,
      },
      {
        path: '',
        redirectTo: RoutesLogin.SIGN_IN,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: RoutesLogin.SIGN_IN,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(lobbyRoutes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
