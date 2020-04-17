import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesLogin } from './common/enum/routes/routes-login.enum';
import { LoginGuard } from './lobby/guards/login.guard';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
