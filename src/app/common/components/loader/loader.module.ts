import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';




@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  entryComponents: [LoaderComponent],
  providers: [LoaderService],
  imports: [
    CommonModule,
    MatProgressBarModule
  ]
})
export class LoaderModule { }
