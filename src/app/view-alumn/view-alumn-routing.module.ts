import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAlumnPage } from './view-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAlumnPageRoutingModule {}
