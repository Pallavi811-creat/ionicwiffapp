import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfRestaurantsPage } from './list-of-restaurants.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfRestaurantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfRestaurantsPageRoutingModule {}
