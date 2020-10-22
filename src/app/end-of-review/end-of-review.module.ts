import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndOfReviewPageRoutingModule } from './end-of-review-routing.module';

import { EndOfReviewPage } from './end-of-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndOfReviewPageRoutingModule
  ],
  declarations: [EndOfReviewPage]
})
export class EndOfReviewPageModule {}
