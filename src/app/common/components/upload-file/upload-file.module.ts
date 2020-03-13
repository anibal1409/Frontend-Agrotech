import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    UploadFileComponent
  ],

})
export class UploadFileModule { }
