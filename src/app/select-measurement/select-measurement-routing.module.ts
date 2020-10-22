import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectMeasurementPage } from './select-measurement.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMeasurementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectMeasurementPageRoutingModule {}
