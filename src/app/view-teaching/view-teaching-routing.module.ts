import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTeachingPage } from './view-teaching.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTeachingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTeachingPageRoutingModule {}
