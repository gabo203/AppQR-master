import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTeachingPageRoutingModule } from './view-teaching-routing.module';

import { ViewTeachingPage } from './view-teaching.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTeachingPageRoutingModule
  ],
  declarations: [ViewTeachingPage]
})
export class ViewTeachingPageModule {}
