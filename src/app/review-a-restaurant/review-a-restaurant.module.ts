import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReviewARestaurantPageRoutingModule } from './review-a-restaurant-routing.module';
import { ReviewARestaurantPage } from './review-a-restaurant.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewARestaurantPageRoutingModule,
  ],
  declarations: [ReviewARestaurantPage]
})
export class ReviewARestaurantPageModule {}
