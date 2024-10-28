import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewAlumnPageRoutingModule } from './view-alumn-routing.module';
import { ViewAlumnPage } from './view-alumn.page';
import { PokedexComponent } from '../components/pokedex/pokedex.component'; // Importa PokedexComponent
import { QRCodeModule } from 'angularx-qrcode'; // Importa QRCodeModule
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAlumnPageRoutingModule,
    QRCodeModule
  ],
  declarations: [
    ViewAlumnPage,
    PokedexComponent 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewAlumnPageModule {}