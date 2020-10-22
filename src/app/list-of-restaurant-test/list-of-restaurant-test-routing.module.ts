import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfRestaurantTestPage } from './list-of-restaurant-test.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfRestaurantTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfRestaurantTestPageRoutingModule {}
