import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfRestaurantTestPageRoutingModule } from './list-of-restaurant-test-routing.module';

import { ListOfRestaurantTestPage } from './list-of-restaurant-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfRestaurantTestPageRoutingModule
  ],
  declarations: [ListOfRestaurantTestPage]
})
export class ListOfRestaurantTestPageModule {}
