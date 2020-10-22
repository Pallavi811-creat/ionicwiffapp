import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMeasurementPageRoutingModule } from './select-measurement-routing.module';

import { SelectMeasurementPage } from './select-measurement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectMeasurementPageRoutingModule
  ],
  declarations: [SelectMeasurementPage]
})
export class SelectMeasurementPageModule {}
