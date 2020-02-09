import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertService } from './alert.service';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [
    AlertComponent,
  ],
  exports: [
    AlertComponent,
  ],
  providers: [
    AlertService,
  ]
})
export class AlertModule { }
