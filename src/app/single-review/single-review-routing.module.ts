import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleReviewPage } from './single-review.page';

const routes: Routes = [
  {
    path: '',
    component: SingleReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleReviewPageRoutingModule {}
