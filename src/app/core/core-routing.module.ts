import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const coreRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
