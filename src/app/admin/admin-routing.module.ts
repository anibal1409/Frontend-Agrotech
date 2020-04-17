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
import { DocumentListComponent } from './pages/document/list/list.component';
import { StatisticsComponent } from '../core/pages/statistics/statistics.component';
import { AdminGuard } from './guards/admin.guard';


export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: BaseAdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'crop',
        children: [
          {
            path: '',
            component: CropListComponent,
          },
          {
            path: 'document',
            component: DocumentListComponent,
          },
          {
            path: '',
            redirectTo: RoutesAdmin.CROP,
            pathMatch: 'full'
          }
        ]
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
        path: 'statistics',
        component: StatisticsComponent,
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
