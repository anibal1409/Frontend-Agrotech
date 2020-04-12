import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    EmptyComponent
  ],
  exports: [
    EmptyComponent
  ],
  entryComponents: [
    EmptyComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class EmptyModule { }