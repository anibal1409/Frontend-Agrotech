import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAdminComponent } from './pages/base-admin/base-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AlertModule } from '../common/alert/alert.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MomentModule as MomentModule2 } from 'angular2-moment';
import { MatMenuModule } from '@angular/material/menu';
import { AlertComponent } from '../common/alert/alert.component';
import { CropFormComponent } from './pages/crop/form/form.component';
import { CropListComponent } from './pages/crop/list/list.component';
import { TextureFormComponent } from './pages/texture/form/form.component';
import { WeatherFormComponent } from './pages/weather/form/form.component';
import { UserFormComponent } from './pages/user/form/form.component';
import { WeatherListComponent } from './pages/weather/list/list.component';
import { UserListComponent } from './pages/user/list/list.component';
import { TextureListComponent } from './pages/texture/list/list.component';
import { SectorListComponent } from './pages/sector/list/list.component';
import { SectorWizardComponent } from './pages/sector/wizard/wizard.component';
import { StudyFormComponent } from './pages/study/form/form.component';
import { StudyListComponent } from './pages/study/list/list.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LocationListComponent } from './pages/location/list/list.component';
import { LocationFormComponent } from './pages/location/form/form.component';
import { AccountPasswordComponent } from '../core/pages/account-password/account-password.component';
import { AccountUserComponent } from '../core/pages/account-user/account-user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { DocumentFormComponent } from './pages/document/form/form.component';
import { DocumentListComponent } from './pages/document/list/list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UploadFileModule } from '../common/components/upload-file/upload-file.module';



export const DateFormats = {
  parse: {
      dateInput: ['dddd DD/MM/YYYY'],
  },
  display: {
      dateInput: 'dddd DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    BaseAdminComponent,
    CropFormComponent,
    CropListComponent,
    TextureFormComponent,
    WeatherFormComponent,
    UserFormComponent,
    WeatherListComponent,
    UserListComponent,
    TextureListComponent,
    StudyFormComponent,
    StudyListComponent,
    SectorListComponent,
    SectorWizardComponent,
    LocationListComponent,
    LocationFormComponent,
    DocumentFormComponent,
    DocumentListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AlertModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MomentModule2,
    MatMenuModule,
    MatRippleModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatExpansionModule,
    UploadFileModule


  ],
  exports: [
    AdminRoutingModule,
  ],
  entryComponents: [
    AlertComponent,
    CropFormComponent,
    TextureFormComponent,
    WeatherFormComponent,
    UserFormComponent,
    SectorWizardComponent,
    LocationFormComponent,
    AccountPasswordComponent,
    AccountUserComponent,
    UserFormComponent,
    StudyFormComponent,
    DocumentFormComponent,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]  
})
export class AdminModule { }
