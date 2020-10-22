import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleReviewPageRoutingModule } from './single-review-routing.module';

import { SingleReviewPage } from './single-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleReviewPageRoutingModule
  ],
  declarations: [SingleReviewPage]
})
export class SingleReviewPageModule {}
