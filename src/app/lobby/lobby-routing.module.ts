import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


export const lobbyRoutes: Routes = [
  {
    path: 'lobby',
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(lobbyRoutes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
