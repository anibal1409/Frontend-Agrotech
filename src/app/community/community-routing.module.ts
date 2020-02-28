import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseCommunityComponent } from './pages/base-community/base-community.component';
import { HomeComponent } from '../core/pages/home/home.component';
import { RoutesCommunity } from '../common/enum/routes/routes-community.enum';
import { StudyListComponent } from '../admin/pages/study/list/list.component';


export const communityRoutes: Routes = [
  {
    path: 'community',
    component: BaseCommunityComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'study',
        component: StudyListComponent,
      },
      {
        path: '',
        redirectTo: RoutesCommunity.HOME,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: RoutesCommunity.HOME,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(communityRoutes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
