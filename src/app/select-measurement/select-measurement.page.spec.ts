import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectMeasurementPage } from './select-measurement.page';

describe('SelectMeasurementPage', () => {
  let component: SelectMeasurementPage;
  let fixture: ComponentFixture<SelectMeasurementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMeasurementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectMeasurementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
