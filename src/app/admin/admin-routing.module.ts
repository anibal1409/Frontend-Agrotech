import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseAdminComponent } from './pages/base-admin/base-admin.component';
import { HomeComponent } from '../core/pages/home/home.component';
import { RoutesAdmin } from '../common/enum/routes/routes-admin.enum';


export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: BaseAdminComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: RoutesAdmin.HOME,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: RoutesAdmin.HOME,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
