import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCommunityComponent } from './pages/base-community/base-community.component';
import { CommunityRoutingModule } from './community-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { AlertModule } from '../common/alert/alert.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { AdminModule } from '../admin/admin.module';



@NgModule({
  declarations: [
    BaseCommunityComponent,
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatRippleModule,
    AlertModule,
    MatTabsModule,
    MatTreeModule,
    MatExpansionModule,
    MatListModule,
    AdminModule,
  ],
  exports: [
    CommunityRoutingModule,
  ]
})
export class CommunityModule { }
