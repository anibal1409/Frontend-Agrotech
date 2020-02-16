import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseAdminComponent } from './pages/base-admin/base-admin.component';
import { HomeComponent } from '../core/pages/home/home.component';
import { RoutesAdmin } from '../common/enum/routes/routes-admin.enum';
import { CropListComponent } from './pages/crop/list/list.component';
import { TextureListComponent } from './pages/texture/list/list.component';
import { UserListComponent } from './pages/user/list/list.component';
import { WeatherListComponent } from './pages/weather/list/list.component';
import { SectorListComponent } from './pages/sector/list/list.component';
import { StudyListComponent } from './pages/study/list/list.component';
import { LocationListComponent } from './pages/location/list/list.component';


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
        path: 'crop',
        component: CropListComponent
      },
      {
        path: 'texture',
        component: TextureListComponent
      },
      {
        path: 'user',
        component: UserListComponent
      },
      {
        path: 'weather',
        component: WeatherListComponent
      },
      {
        path: 'sector',
        // component: SectorListComponent,
        children: [
          {
            path: '',
            component: SectorListComponent,
          },
          {
            path: 'location',
            component: LocationListComponent,
          },
          {
            path: '',
            redirectTo: RoutesAdmin.SECTOR,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'study',
        component: StudyListComponent
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
