import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndOfReviewPage } from './end-of-review.page';

const routes: Routes = [
  {
    path: '',
    component: EndOfReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndOfReviewPageRoutingModule {}
