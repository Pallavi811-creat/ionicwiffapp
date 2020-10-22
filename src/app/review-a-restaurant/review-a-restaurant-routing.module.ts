import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewARestaurantPage } from './review-a-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewARestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewARestaurantPageRoutingModule {}
