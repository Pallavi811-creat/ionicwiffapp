import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ListOfRestaurantsPageRoutingModule } from './list-of-restaurants-routing.module';

import { ListOfRestaurantsPage } from './list-of-restaurants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListOfRestaurantsPageRoutingModule
  ],
  declarations: [ListOfRestaurantsPage]
})
export class ListOfRestaurantsPageModule {}
